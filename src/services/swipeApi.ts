import { supabase } from "../utils/supabase";
import type { Swipe, Match } from "../types";

export async function addSwipe(
	sessionId: string,
	deviceId: string,
	restaurantId: number,
	direction: "left" | "right",
): Promise<Swipe | null> {
	const { data, error } = await supabase
		.from("swipes")
		.upsert(
			{
				session_id: sessionId,
				device_id: deviceId,
				restaurant_id: restaurantId,
				direction,
			},
			{
				onConflict: "session_id,device_id,restaurant_id",
			},
		)
		.select()
		.single();

	if (error) throw error;
	await ensureMatches(sessionId);
	return data as Swipe;
}

export async function getSwipes(
	sessionId: string,
	deviceId?: string,
): Promise<Swipe[]> {
	let q = supabase
		.from("swipes")
		.select("*")
		.eq("session_id", sessionId)
		.order("swiped_at", { ascending: true });

	if (deviceId) {
		q = q.eq("device_id", deviceId);
	}

	const { data, error } = await q;
	if (error) throw error;
	return (data ?? []) as Swipe[];
}

export function subscribeSwipes(
	sessionId: string,
	onUpdate: (swipes: Swipe[]) => void,
) {
	const channel = supabase
		.channel(`swipes:${sessionId}`)
		.on(
			"postgres_changes",
			{
				event: "*",
				schema: "public",
				table: "swipes",
				filter: `session_id=eq.${sessionId}`,
			},
			async () => {
				const swipes = await getSwipes(sessionId);
				onUpdate(swipes);
			},
		)
		.subscribe();

	return () => {
		supabase.removeChannel(channel);
	};
}

/** Compute mutual right-swipes and upsert into matches table */
async function ensureMatches(sessionId: string): Promise<void> {
	const { data: swipes } = await supabase
		.from("swipes")
		.select("restaurant_id, device_id")
		.eq("session_id", sessionId)
		.eq("direction", "right");

	if (!swipes || swipes.length < 2) return;

	const byRestaurant = new Map<number, Set<string>>();
	for (const s of swipes as { restaurant_id: number; device_id: string }[]) {
		if (!byRestaurant.has(s.restaurant_id)) {
			byRestaurant.set(s.restaurant_id, new Set());
		}
		byRestaurant.get(s.restaurant_id)!.add(s.device_id);
	}

	const { data: participants } = await supabase
		.from("session_participants")
		.select("device_id")
		.eq("session_id", sessionId);
	const deviceIds = new Set(
		(participants ?? []).map((p: { device_id: string }) => p.device_id),
	);
	const needBoth = deviceIds.size >= 2;

	const toInsert: { session_id: string; restaurant_id: number }[] = [];
	for (const [restaurantId, devices] of byRestaurant) {
		if (needBoth && devices.size >= 2) {
			toInsert.push({
				session_id: sessionId,
				restaurant_id: restaurantId,
			});
		}
	}

	if (toInsert.length === 0) return;

	await supabase.from("matches").upsert(toInsert, {
		onConflict: "session_id,restaurant_id",
	});
}

export async function getMatches(sessionId: string): Promise<Match[]> {
	const { data, error } = await supabase
		.from("matches")
		.select("*")
		.eq("session_id", sessionId)
		.order("matched_at", { ascending: true });

	if (error) throw error;
	return (data ?? []) as Match[];
}
