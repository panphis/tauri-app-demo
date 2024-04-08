import { CpuCoreUsageRecorders, CpuCoresNames } from "@/interface";
import React, { Fragment, type FC } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type CpuCoreUsageProps = {
	data: CpuCoreUsageRecorders,
	cpuCoresNames: CpuCoresNames
};

export const CpuCoreUsage: FC<CpuCoreUsageProps> = ({ data, cpuCoresNames = [] }) => {
	console.log(cpuCoresNames, data);
	return <Fragment>
		<div className="h-64">

			<ResponsiveContainer width="100%" height="100%">
				<LineChart
					width={500}
					height={300}
					data={data}
					margin={{
						top: 5,
						right: 30,
						left: 20,
						bottom: 5,
					}}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="time" />
					<YAxis />
					<Tooltip />
					<Legend />
					{
						cpuCoresNames.map((name, index) => {
							return <Line key={name} type="monotone" isAnimationActive={false} dataKey={name} activeDot={{ r: 8 }} />
						})
					}
				</LineChart>
			</ResponsiveContainer>
		</div>
	</Fragment>;
};
export default CpuCoreUsage