import React, { Fragment, type FC } from "react";
import { CPUCard, SystemCard } from "./";
import { SystemInfo } from "@/invoke";


type SummaryProps = {
	systemInfo: SystemInfo
}

export const Summary: FC<SummaryProps> = ({ systemInfo }) => {
	return <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4 p-4">
		<SystemCard systemInfo={systemInfo} />
		<CPUCard systemInfo={systemInfo} />
	</div>;
};
export default Summary