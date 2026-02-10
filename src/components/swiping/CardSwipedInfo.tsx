import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

type CardSwipedInfoProps = {
  friend: boolean;
};

function CardSwipedInfo({ friend }: CardSwipedInfoProps) {
  return (
    <div className="session-info">
      {friend ? (
        <>
          <div className="image">
            {" "}
            <FontAwesomeIcon icon={faUser} />
          </div>
          <div className="info-wrapper">
            <div className="session-info-name">Friend</div>
            <div className="session-info-text">3 cards swiped</div>
          </div>
        </>
      ) : (
        <>
          <div className="image">You</div>
          <div className="info-wrapper">
            <div className="session-info-name">You</div>
            <div className="session-info-text">4 cards swiped</div>
          </div>
        </>
      )}
    </div>
  );
}

export default CardSwipedInfo;
