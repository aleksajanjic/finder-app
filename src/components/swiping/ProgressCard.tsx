import ProgressBar from "./ProgressBar";

function ProgressCard() {
  return (
    <div className="progress-card">
      <div className="progress-card-title">Progress</div>
      <ProgressBar progress={10} />
      <div>4 of 10 restaurants</div>
    </div>
  );
}

export default ProgressCard;
