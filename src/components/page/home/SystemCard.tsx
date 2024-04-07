import React, { Fragment, type FC } from "react";
import { Card } from "@/components";
import { PropsSystemInfo } from "./";

export const SystemCard: FC<PropsSystemInfo> = ({ systemInfo, loading }) => {
	return <Card title="系统信息" loading={loading}>
		<div className="text-2xl font-bold">
			{systemInfo?.system_name || '--'}
			<span className="text-xs text-muted-foreground">
				{systemInfo?.os_version || '--'}
			</span></div>
		<p className="text-xs mt-2 text-muted-foreground">
			{systemInfo?.host_name || '--'}
		</p>
	</Card>;
};
export default SystemCard