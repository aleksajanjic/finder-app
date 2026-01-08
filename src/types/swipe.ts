export interface Swipe {
  id: string;
  session_id: string;
  device_id: string;
  restaurant_id: number;
  direction: "left" | "right";
  swiped_at: string;
}

export interface Match {
  id: string;
  session_id: string;
  restaurant_id: number;
  matched_at: string;
}
