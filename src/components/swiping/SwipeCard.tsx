import type { Restaurant } from "../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faHeart, faRefresh } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import ProgressBar from "./ProgressBar";

type SwipeCardProps = {
  restaurants: Restaurant[];
  width: number;
};

function SwipeCard({ restaurants, width }: SwipeCardProps) {
  const [index, setIndex] = useState(0);
  const [likedRestaurants, setLikedRestaurants] = useState<Restaurant[]>([]);
  const [action, setAction] = useState<"like" | "dislike" | null>(null);
  const noMoreCards = restaurants.length === index;

  console.log("deshi", restaurants);

  function swipe(type: "like" | "dislike") {
    const current = restaurants[index];
    setAction(type);
    if (!current) return;

    setTimeout(() => {
      if (type === "like") {
        setLikedRestaurants((prev) => [...prev, restaurants[index]]);
      }
      setIndex((i) => i + 1);
      setAction(null);
    }, 350);
  }

  function refreshPage() {
    location.reload();
  }

  return (
    <>
      {width < 1000 && (
        <ProgressBar progress={(index / restaurants.length) * 100} />
      )}

      <div className="swipe-card">
        {noMoreCards && (
          <>
            <h3>No more cards</h3>

            <div className="buttons-wrapper">
              <button className="dislike" onClick={() => refreshPage()}>
                <FontAwesomeIcon icon={faRefresh} />
              </button>
            </div>
          </>
        )}
        {restaurants.slice(index, index + 3).map((restaurant, i) => (
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
              src="restaurant.image_url"
              alt="restaurant-image"
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
            <button className="dislike" onClick={() => swipe("dislike")}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <button className="like" onClick={() => swipe("like")}>
              <FontAwesomeIcon icon={faHeart} />
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default SwipeCard;
