import React, { Fragment, type FC } from "react";
import { Card, Ratio } from "@/components";
import { PropsCPUDetailInfo } from "@/interface";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui"

import { Cores, CpuCoreUsage } from "@/components/Chart";


const types = {
	cpu: 'cpu',
	core: 'core'
}


export const CPUCore: FC<PropsCPUDetailInfo> = ({ cpuUsage, cpuCores, initializing, cpuCoresNames }) => {
	return (
		<Tabs defaultValue={types.cpu} className="sm:col-span-1 md:col-span-1 xl:col-span-1 2xl:col-span-4">
			<Card title={<Fragment>Cpu 逻辑处理器</Fragment>} icon={
				<TabsList>
					<TabsTrigger value={types.cpu}>总览</TabsTrigger>
					<TabsTrigger value={types.core}>内核详情</TabsTrigger>
				</TabsList>} loading={initializing}>

				<TabsContent value={types.cpu}>
					<CpuCoreUsage data={cpuUsage} cpuCoresNames={cpuCoresNames} /></TabsContent>
				<TabsContent value={types.core}>
					<Cores {...{ cpuUsage, cpuCores, cpuCoresNames }} />
				</TabsContent>
			</Card>
		</Tabs>
	);
};
export default CPUCore;
