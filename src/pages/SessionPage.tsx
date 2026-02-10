import CreateSession from "../components/session/CreateSession";
import { useState } from "react";
import SwipeCard from "../components/swiping/SwipeCard";
// import { MOCK_RESTAURANTS } from "../utils/constants";
import SessionInfoCard from "../components/session/SessionInfoCard";
import useWindowDimensions from "../hooks/useWindowDimensions";
import data from "../../src/data/restaurants.json"

function SessionPage() {
  // const restaurants = MOCK_RESTAURANTS;
  const restaurants = data;
  const [sessionStarted, setSessionStarted] = useState(true);
  const { width } = useWindowDimensions();

  function toggle() {
    setSessionStarted((prev) => !prev);
  }

  return (
    <>
      <button onClick={toggle}>toggle</button>

      {sessionStarted ? (
        <>
          {width > 1000 && <SessionInfoCard />}
          <div className="cards-wrapper">
            <SwipeCard restaurants={restaurants} width={width} />
          </div>
        </>
      ) : (
        <div className="session-page-wrapper">
          <CreateSession />
        </div>
      )}
    </>
  );
}

export default SessionPage;
