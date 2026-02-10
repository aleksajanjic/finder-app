import { useState, useEffect } from "react";
import CardSwipedInfo from "../swiping/CardSwipedInfo";
import ProgressCard from "../swiping/ProgressCard";
import { subscribeSwipes, getSwipes } from "../../services/swipeApi";
import type { SessionParticipant } from "../../types";

type SessionInfoCardProps = {
  sessionId: string;
  deviceId: string;
  participants: SessionParticipant[];
  totalCards: number;
};

function SessionInfoCard({
  sessionId,
  deviceId,
  participants,
  totalCards,
}: SessionInfoCardProps) {
  const [swipeCountByDevice, setSwipeCountByDevice] = useState<Record<string, number>>({});

  useEffect(() => {
    getSwipes(sessionId).then((swipes) => {
      const counts: Record<string, number> = {};
      for (const s of swipes) {
        counts[s.device_id] = (counts[s.device_id] ?? 0) + 1;
      }
      setSwipeCountByDevice(counts);
    });

    const unsub = subscribeSwipes(sessionId, (swipes) => {
      const counts: Record<string, number> = {};
      for (const s of swipes) {
        counts[s.device_id] = (counts[s.device_id] ?? 0) + 1;
      }
      setSwipeCountByDevice(counts);
    });
    return unsub;
  }, [sessionId]);

  const myCount = swipeCountByDevice[deviceId] ?? 0;
  const other = participants.find((p) => p.device_id !== deviceId);
  const friendCount = other ? (swipeCountByDevice[other.device_id] ?? 0) : 0;

  return (
    <div className="session-info-card-wrapper">
      <div>
        <h2>Session Info</h2>
        <CardSwipedInfo label="You" count={myCount} />
        <CardSwipedInfo label="Friend" count={friendCount} />
      </div>
      <ProgressCard current={myCount} total={totalCards} />
    </div>
  );
}

export default SessionInfoCard;
