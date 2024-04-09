import { CpuCoresNames, CpuCoreRecords } from "@/interface";
import React, { Fragment, type FC } from "react";

import {
	LineChart,
	Line,
	XAxis,
	// YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
	// Brush,
} from "recharts";

type CoreProps = {
	cpuCores: CpuCoreRecords;
	cpuCoresNames: CpuCoresNames;
};


export const Cores: FC<CoreProps> = ({ cpuCores, cpuCoresNames }) => {
	return (
		<div className='grid gap-2 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
			{(cpuCoresNames || []).map(
				(key, index) => {
					const data = cpuCores.get(key)!
					return (
						<div
							key={`${key}-${index}`}
							className='h-80'
						>
							<ResponsiveContainer width='100%' height='100%'>
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
									<CartesianGrid strokeDasharray='3 3' />
									<XAxis dataKey='time' />
									{/* <YAxis /> */}
									<Tooltip formatter={(value, name, props) => [`${value}%`, key]} />
									<Legend payload={[{ value: key, type: 'line', id: 'cpu_usage' }]} />
									<Line
										type='monotone'
										isAnimationActive={false}
										dataKey={'cpu_usage'}
										activeDot={{ r: 4 }}
									/>
									{/* <Brush
							dataKey='name'
							height={30}
							stroke='#8884d8'
							startIndex={brush[0]}
							endIndex={brush[1]}
							onChange={(e) => setBursh([e?.startIndex || 0, e?.endIndex || 0])}
						/> */}
								</LineChart>
							</ResponsiveContainer>
						</div>
					)
				}
			)}
		</div >
	);
};

