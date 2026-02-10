import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHourglass } from "@fortawesome/free-solid-svg-icons";

function CreateSession() {
  const link = "finder.app/join/ABC12XYZ";
	const code = "ABC12XYZ";

  const copyLink = () => {
    navigator.clipboard.writeText(link);
  };

  return (
    <div>
      <h2>Share with your friend</h2>
      <p className="loader">
        <div className="hourglass-container">
          <FontAwesomeIcon icon={faHourglass} />
        </div>
        Waiting for friend...
      </p>
      <div className="code-wrapper">{code}</div>
      <p>or send this link:</p>
      <div className="link">{link}</div>
      <div className="btn-wrapper">
        <button className="btn primary" onClick={() => copyLink()}>
          Copy Link
        </button>
      </div>
    </div>
  );
}

export default CreateSession;
