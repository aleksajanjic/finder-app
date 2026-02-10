import { supabase } from "../utils/supabase";
import { generateJoinCode } from "../utils/joinCode";
import type { Session, SessionParticipant } from "../types";

export async function createSession(
  creatorDeviceId: string,
  restaurantDeck: number[]
): Promise<{ session: Session; joinCode: string }> {
  const joinCode = generateJoinCode();
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 24);

  const { data, error } = await supabase
    .from("sessions")
    .insert({
      join_code: joinCode,
      creator_device_id: creatorDeviceId,
      status: "waiting",
      expires_at: expiresAt.toISOString(),
      restaurant_deck: restaurantDeck,
    })
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      // unique violation (join_code) - retry with new code
      return createSession(creatorDeviceId, restaurantDeck);
    }
    throw error;
  }

  const session = data as Session;
  await supabase.from("session_participants").insert({
    session_id: session.id,
    device_id: creatorDeviceId,
  });

  return { session, joinCode };
}

export async function getSessionByCode(joinCode: string): Promise<Session | null> {
  const { data, error } = await supabase
    .from("sessions")
    .select("*")
    .eq("join_code", joinCode.toUpperCase())
    .maybeSingle();

  if (error) throw error;
  return data as Session | null;
}

export async function getSession(sessionId: string): Promise<Session | null> {
  const { data, error } = await supabase
    .from("sessions")
    .select("*")
    .eq("id", sessionId)
    .maybeSingle();

  if (error) throw error;
  return data as Session | null;
}

export async function joinSession(
  sessionId: string,
  deviceId: string
): Promise<SessionParticipant | null> {
  const { data, error } = await supabase
    .from("session_participants")
    .insert({ session_id: sessionId, device_id: deviceId })
    .select()
    .single();

  if (error) {
    if (error.code === "23505") return null; // already joined
    throw error;
  }
  return data as SessionParticipant;
}

export async function getParticipants(
  sessionId: string
): Promise<SessionParticipant[]> {
  const { data, error } = await supabase
    .from("session_participants")
    .select("*")
    .eq("session_id", sessionId)
    .order("joined_at", { ascending: true });

  if (error) throw error;
  return (data ?? []) as SessionParticipant[];
}

export function subscribeParticipants(
  sessionId: string,
  onUpdate: (participants: SessionParticipant[]) => void
) {
  const channel = supabase
    .channel(`session_participants:${sessionId}`)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "session_participants",
        filter: `session_id=eq.${sessionId}`,
      },
      async () => {
        const participants = await getParticipants(sessionId);
        onUpdate(participants);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}

export async function updateSessionStatus(
  sessionId: string,
  status: "waiting" | "active" | "completed"
): Promise<void> {
  const { error } = await supabase
    .from("sessions")
    .update({ status })
    .eq("id", sessionId);

  if (error) throw error;
}
