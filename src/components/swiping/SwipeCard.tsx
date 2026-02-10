import type { Restaurant } from "../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faHeart, faRefresh } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import ProgressBar from "./ProgressBar";
import { addSwipe, getSwipes, getMatches } from "../../services/swipeApi";
import type { Match } from "../../types";

type SwipeCardProps = {
  sessionId: string;
  deviceId: string;
  restaurants: Restaurant[];
  width: number;
};

function SwipeCard({ sessionId, deviceId, restaurants, width }: SwipeCardProps) {
  const [index, setIndex] = useState(0);
  const [likedRestaurants, setLikedRestaurants] = useState<Restaurant[]>([]);
  const [action, setAction] = useState<"like" | "dislike" | null>(null);
  const [matches, setMatches] = useState<Restaurant[] | null>(null);
  const noMoreCards = restaurants.length > 0 && index >= restaurants.length;

  // Resume from persisted swipes
  useEffect(() => {
    getSwipes(sessionId, deviceId).then((swipes) => {
      if (swipes.length > 0 && swipes.length <= restaurants.length) {
        setIndex(swipes.length);
        const liked = restaurants.filter((r) =>
          swipes.some(
            (s) => s.restaurant_id === r.id && s.direction === "right",
          ),
        );
        setLikedRestaurants(liked);
      }
    });
  }, [sessionId, deviceId, restaurants]);

  async function swipe(type: "like" | "dislike") {
    const current = restaurants[index];
    setAction(type);
    if (!current) return;

    const direction = type === "like" ? "right" : "left";
    try {
      await addSwipe(sessionId, deviceId, current.id, direction);
    } catch {
      setAction(null);
      return;
    }

    setTimeout(() => {
      if (type === "like") {
        setLikedRestaurants((prev) => [...prev, current]);
      }
      setIndex((i) => i + 1);
      setAction(null);
    }, 350);
  }

  useEffect(() => {
    if (!noMoreCards || matches !== null) return;
    getMatches(sessionId).then((matchRows) => {
      const ids = matchRows.map((m: Match) => m.restaurant_id);
      const matched = restaurants.filter((r) => ids.includes(r.id));
      setMatches(matched);
    });
  }, [noMoreCards, sessionId, restaurants, matches]);

  if (restaurants.length === 0) {
    return (
      <div className="swipe-card">
        <p>No restaurants in this session.</p>
      </div>
    );
  }

  return (
    <>
      {width < 1000 && (
        <ProgressBar
          progress={
            restaurants.length > 0 ? (index / restaurants.length) * 100 : 0
          }
        />
      )}

      <div className="swipe-card">
        {noMoreCards && (
          <>
            <h3>No more cards</h3>
            {matches !== null && matches.length > 0 && (
              <div className="matches-section">
                <h4>Your matches</h4>
                <ul className="matches-list">
                  {matches.map((r) => (
                    <li key={r.id}>
                      <strong>{r.name}</strong> – {r.cuisine}, {r.price_range}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {matches !== null && matches.length === 0 && (
              <p className="matches-empty">No mutual likes yet.</p>
            )}
            <div className="buttons-wrapper">
              <button
                type="button"
                className="dislike"
                onClick={() => window.location.assign("/")}
              >
                <FontAwesomeIcon icon={faRefresh} /> Start over
              </button>
            </div>
          </>
        )}
        {!noMoreCards &&
          restaurants.slice(index, index + 3).map((restaurant, i) => (
            <div
              key={restaurant.id}
              className={`restaurant-card ${i === 0 && action ? action : ""}`}
              style={{
                zIndex: 10 - i,
                transform:
                  i === 0
                    ? undefined
                    : `translateY(${i * 8}px) scale(${1 - i * 0.04})`,
              }}
            >
              <img
                src={restaurant.image_url}
                alt="restaurant"
                className="image"
              />
              <div className="text-wrapper">
                <h4>{restaurant.name}</h4>
                <p>
                  {restaurant.cuisine} – {restaurant.price_range} –{" "}
                  {restaurant.rating}
                </p>
                <p>{restaurant.description}</p>
              </div>
            </div>
          ))}
      </div>
      <div className="buttons-wrapper">
        {!noMoreCards && (
          <>
            <button
              type="button"
              className="dislike"
              onClick={() => swipe("dislike")}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <button type="button" className="like" onClick={() => swipe("like")}>
              <FontAwesomeIcon icon={faHeart} />
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default SwipeCard;
