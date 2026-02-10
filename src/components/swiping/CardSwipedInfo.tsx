import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

type CardSwipedInfoProps = {
  label: string;
  count: number;
};

function CardSwipedInfo({ label, count }: CardSwipedInfoProps) {
  return (
    <div className="session-info">
      <div className="image">
        {label === "Friend" ? (
          <FontAwesomeIcon icon={faUser} />
        ) : (
          "You"
        )}
      </div>
      <div className="info-wrapper">
        <div className="session-info-name">{label}</div>
        <div className="session-info-text">
          {count} {count === 1 ? "card" : "cards"} swiped
        </div>
      </div>
    </div>
  );
}

export default CardSwipedInfo;
