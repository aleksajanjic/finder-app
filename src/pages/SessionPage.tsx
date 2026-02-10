import CreateSession from "../components/session/CreateSession";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SwipeCard from "../components/swiping/SwipeCard";
import SessionInfoCard from "../components/session/SessionInfoCard";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { getDeviceId } from "../utils/deviceId";
import {
  createSession as apiCreateSession,
  getSession,
  getParticipants,
  subscribeParticipants,
  updateSessionStatus,
} from "../services/sessionApi";
import type { Session, SessionParticipant } from "../types";
import type { Restaurant } from "../types";
import data from "../data/restaurants.json";

const allRestaurants = data as Restaurant[];

function SessionPage() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const { width } = useWindowDimensions();
  const deviceId = getDeviceId();

  const [session, setSession] = useState<Session | null>(null);
  const [participants, setParticipants] = useState<SessionParticipant[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  // No sessionId: create a new session and redirect
  useEffect(() => {
    if (sessionId) return;
    setCreating(true);
    const deck = allRestaurants.map((r) => r.id);
    apiCreateSession(deviceId, deck)
      .then(({ session: newSession }) => {
        navigate(`/session/${newSession.id}`, { replace: true });
      })
      .catch(() => setCreating(false))
      .finally(() => setCreating(false));
  }, [sessionId, deviceId, navigate]);

  // Load session and participants when sessionId is set
  useEffect(() => {
    if (!sessionId) return;
    let unsubscribe: (() => void) | undefined;

    async function load() {
      const s = await getSession(sessionId);
      if (!s) {
        navigate("/", { replace: true });
        return;
      }
      setSession(s);
      const p = await getParticipants(sessionId);
      setParticipants(p);

      unsubscribe = subscribeParticipants(sessionId, (updated) => {
        setParticipants(updated);
        if (updated.length >= 2) {
          updateSessionStatus(sessionId, "active").catch(() => {});
        }
      });
    }

    load();
    return () => {
      unsubscribe?.();
    };
  }, [sessionId, navigate]);

  useEffect(() => {
    if (sessionId && session) setLoading(false);
  }, [sessionId, session]);

  const isCreator = session?.creator_device_id === deviceId;
  const waitingForFriend = isCreator && participants.length === 1;
  const showSwiping = participants.length >= 2 || !isCreator;

  if (creating || (!sessionId && !session)) {
    return (
      <div className="session-page-wrapper">
        <p>Creating session…</p>
      </div>
    );
  }

  if (loading || !session) {
    return (
      <div className="session-page-wrapper">
        <p>Loading…</p>
      </div>
    );
  }

  const deckIds = session.restaurant_deck?.length
    ? session.restaurant_deck
    : allRestaurants.map((r) => r.id);
  const restaurants = allRestaurants.filter((r) => deckIds.includes(r.id));

  if (showSwiping) {
    return (
      <div className="session-page-wrapper">
        {width > 1000 && (
          <SessionInfoCard
            sessionId={sessionId!}
            deviceId={deviceId}
            participants={participants}
            totalCards={restaurants.length}
          />
        )}
        <div className="cards-wrapper">
          <SwipeCard
            sessionId={sessionId!}
            deviceId={deviceId}
            restaurants={restaurants}
            width={width}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="session-page-wrapper">
      <CreateSession
        sessionId={sessionId!}
        joinCode={session.join_code}
        participantCount={participants.length}
      />
    </div>
  );
}

export default SessionPage;
