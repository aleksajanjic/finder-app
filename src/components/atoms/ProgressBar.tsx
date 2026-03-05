type ProgressBarProps = {
	progress: number;
};

export default function ProgressBar({ progress }: ProgressBarProps) {
	return (
		<div className="progress-bar">
			<div
				className="progress-bar-fill"
				style={{ width: `${progress}%` }}
			></div>
		</div>
	);
}
