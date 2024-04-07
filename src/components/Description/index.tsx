import React, { Fragment, type FC } from "react";

type DescriptionProps = {
	label: React.ReactNode,
	description: React.ReactNode,
	width?: number
};

export const Description: FC<DescriptionProps> = ({ label, description, width = 80 }) => {
	return <div className="flex flex-row gap-2 flex-nowrap">
		<p className={`text-base grow-0 shrink-0 w-\[${width}px\]`}>
			{label}:
		</p>
		<p className="font-semibold">
			{description}
		</p>
	</div>;
};

export default Description