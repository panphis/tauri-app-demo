import React, { Fragment, type FC } from "react";
import { Card, Ratio } from "@/components";
import { PropsCPUDetailInfo } from "@/interface";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui"

import { CpuCoreUsage } from "@/components/Chart";

const Cores: FC<PropsCPUDetailInfo> = ({ cpuCores }) => {
	return (
		<div className='grid gap-4 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-3'>
			{/* {(systemInfo?.cpus || []).map(
				({ name, cpu_usage, vendor_id, brand, frequency }, index) => (
					<div
						key={`${vendor_id}-${name}-${brand
							}`}
						className='flex flex-col items-center justify-center'
					>
						<div className='text-center text-sm font-medium'>{name}</div>
						<Ratio ratio={cpu_usage / 100} />
					</div>
				)
			)} */}
		</div>
	);
};


const types = {
	cpu: 'cpu',
	core: 'core'
}


export const CPUCore: FC<PropsCPUDetailInfo> = ({ cpuUsage, cpuCores, initializing, cpuCoresNames }) => {
	return (
		<Tabs defaultValue={types.cpu}>
			<Card title={<Fragment>Cpu 逻辑处理器</Fragment>} icon={
				<TabsList>
					<TabsTrigger value={types.cpu}>总览</TabsTrigger>
					<TabsTrigger value={types.core}>内核详情</TabsTrigger>
				</TabsList>} loading={initializing}>

				<TabsContent value={types.cpu}>
					<CpuCoreUsage data={cpuUsage} cpuCoresNames={cpuCoresNames} /></TabsContent>
				<TabsContent value={types.core}>
					<Cores {...{ cpuUsage, cpuCores, initializing, cpuCoresNames }} />
				</TabsContent>
			</Card>
		</Tabs>
	);
};
export default CPUCore;
