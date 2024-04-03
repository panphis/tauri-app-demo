import React, { Fragment, type FC } from "react";
import { Card } from "@/components";
import { SystemInfo } from "@/invoke";

type CPUCardProps = {
	systemInfo: SystemInfo
};

export const CPUCard: FC<CPUCardProps> = ({ }) => {
	return <Card title="Cpu 使用情况">
		<Fragment>cpu使用情况</Fragment>
	</Card>;
};
export default CPUCard