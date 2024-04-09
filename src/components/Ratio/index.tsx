import React, { type FC, useMemo } from "react";

type RatioProps = {
	className?: string;
	ratio: number | undefined;
};

export const getRatioTheme = (ratio: number) => {
	if (ratio < 0.5) {
		return "text-green-500";
	} else if (ratio < 0.75) {
		return "text-yellow-500";
	} else {
		return "text-red-500";
	}
};

export const getRatioBGTheme = (ratio: number) => {
	if (ratio < 0.5) {
		return "bg-green-500";
	} else if (ratio < 0.75) {
		return "bg-yellow-500";
	} else {
		return "bg-red-500";
	}
};

export const Ratio: FC<RatioProps> = ({ ratio = 0, className }) => {
	const theme = useMemo(() => {
		return getRatioTheme(ratio);
	}, [ratio]);
	return (
		<span className={`${theme} font-mono ${className}`}>
			{(ratio * 100).toFixed(2)}%
		</span>
	);
};
export default Ratio;
