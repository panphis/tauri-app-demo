import React, { type FC } from "react";
import {
	Card as UICard,
	CardContent,
	CardHeader,
	CardTitle,
	Skeleton
} from "@/components/ui"

type CardProps = {
	title?: React.ReactNode,
	icon?: React.ReactNode,
	children: React.ReactNode,
	loading?: boolean,
	className?: string
};

export const Card: FC<CardProps> = ({ title, icon, children, loading = false, className }) => {
	return loading ? <div className={`flex flex-col justify-around items-stretch min-h-[120px] ${className}`}>
		<Skeleton className="h-6" />
		<Skeleton className="h-4" />
		<Skeleton className="h-4" />
		<Skeleton className="h-4" />
	</div> : <UICard className={`${className}`}>
		<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
			<CardTitle className="text-md font-semibold">
				{title}
			</CardTitle>
			{icon}
		</CardHeader>
		<CardContent>
			{children}
		</CardContent>	</UICard>


};
export default Card