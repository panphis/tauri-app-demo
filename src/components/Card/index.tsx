import React, { Fragment, type FC } from "react";
import {
	Card as UICard,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"

type CardProps = {
	title?: string,
	icon?: React.ReactNode,
	children: React.ReactNode,
};

export const Card: FC<CardProps> = ({ title, icon, children }) => {
	return <UICard>
		<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
			<CardTitle className="text-md font-semibold">
				{title}
			</CardTitle>
			{icon}
		</CardHeader>
		<CardContent>
			{children}
		</CardContent>
	</UICard>;
};
export default Card