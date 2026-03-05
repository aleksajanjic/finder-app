import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHourglass } from "@fortawesome/free-solid-svg-icons";

type CreateSessionProps = {
	sessionId: string;
	joinCode: string;
	participantCount: number;
};

function CreateSession({
	sessionId,
	joinCode,
	participantCount,
}: CreateSessionProps) {
	const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
	const link = `${baseUrl}/join/${joinCode}`;

	const copyLink = () => {
		navigator.clipboard.writeText(link);
	};

	return (
		<div>
			<h2>Share with your friend</h2>
			<div className="loader">
				<div className="hourglass-container">
					<FontAwesomeIcon icon={faHourglass} />
				</div>
				Waiting for friend...
				{participantCount >= 2 && " Someone joined!"}
			</div>
			<div className="code-wrapper">{joinCode}</div>
			<p>or send this link:</p>
			<div className="link">{link}</div>
			<div className="btn-wrapper">
				<button className="btn primary" onClick={copyLink} type="button">
					Copy Link
				</button>
			</div>
		</div>
	);
}

export default CreateSession;
