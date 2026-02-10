import CardSwipedInfo from "../swiping/CardSwipedInfo";
import ProgressCard from "../swiping/ProgressCard";

function SessionInfoCard() {
  return (
    <div className="session-info-card-wrapper">
      <div>
        <h2>Session Info</h2>
        <CardSwipedInfo friend={false} />
        <CardSwipedInfo friend={true} />
      </div>
      <ProgressCard />
    </div>
  );
}

export default SessionInfoCard;
