import ProgressBar from "../atoms/ProgressBar";

type ProgressCardProps = {
	current: number;
	total: number;
};

function ProgressCard({ current, total }: ProgressCardProps) {
	const progress = total > 0 ? (current / total) * 100 : 0;

	return (
		<div className="progress-card">
			<div className="progress-card-title">Progress</div>
			<ProgressBar progress={progress} />
			<div>
				{current} of {total} restaurants
			</div>
		</div>
	);
}

export default ProgressCard;
