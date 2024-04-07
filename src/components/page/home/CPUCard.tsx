import React, { type FC } from "react";
import { Card, Ratio } from "@/components";
import { PropsSystemInfo } from ".";


export const CPUCard: FC<PropsSystemInfo> = ({ systemInfo, loading }) => {
	return <Card title="Cpu 使用情况" loading={loading}>
		<div className="text-2xl font-bold">
			{systemInfo?.cpu_cores || '--'}
			<span className="text-xs text-muted-foreground">
				(核)
			</span></div>
		<p className="text-xs mt-2 text-muted-foreground">
			使用率<Ratio ratio={systemInfo?.cpu_usage}></Ratio>
		</p>
	</Card>;
};
export default CPUCard