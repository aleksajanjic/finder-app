export interface Session {
	id: string;
	join_code: string;
	creator_device_id: string;
	status: "waiting" | "active" | "completed";
	created_at: string;
	expires_at: string;
	restaurant_deck: number[];
}

export interface SessionParticipant {
	id: string;
	session_id: string;
	device_id: string;
	joined_at: string;
}
