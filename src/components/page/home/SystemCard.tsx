import React, { Fragment, type FC } from "react";
import { Card } from "@/components";
import { SystemInfo } from "@/invoke";

type SystemCardProps = {
	systemInfo: SystemInfo
};

export const SystemCard: FC<SystemCardProps> = ({ systemInfo }) => {
	console.log(systemInfo);

	return <Card title="系统信息">
		<div className="text-2xl font-bold">
			{systemInfo.system_name}
			<span className="text-xs text-muted-foreground">
				{systemInfo.os_version}
			</span></div>
		<p className="text-xs text-muted-foreground">
			{systemInfo.host_name}
		</p>
	</Card>;
};
export default SystemCard