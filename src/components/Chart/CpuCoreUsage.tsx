import { CpuCoreUsageRecorders, CpuCoresNames } from "@/interface";
import React, { Fragment, type FC, useMemo, useState } from "react";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
	// Brush,
} from "recharts";
import { generateUniformColors } from "@/utils";

type CpuCoreUsageProps = {
	data: CpuCoreUsageRecorders;
	cpuCoresNames: CpuCoresNames;
};

export const CpuCoreUsage: FC<CpuCoreUsageProps> = ({
	data,
	cpuCoresNames = [],
}) => {
	const colors = useMemo(() => {
		const color = generateUniformColors(cpuCoresNames.length);
		console.log(color);
		return color;
	}, [cpuCoresNames]);

	// const [brush, setBursh] = useState([0, 0]);

	return (
		<Fragment>
			<div className='h-80'>
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
						<YAxis />
						<Tooltip formatter={(value, name, props) => [`${value}%`, name]} />
						<Legend />
						{cpuCoresNames.map((name, index) => {
							return (
								<Line
									key={name}
									type='monotone'
									isAnimationActive={false}
									dataKey={name}
									stroke={colors[index]}
									activeDot={{ r: 4 }}
								/>
							);
						})}
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
		</Fragment>
	);
};
export default CpuCoreUsage;
