import { CpuCoreUsageRecorders, CpuCoresNames } from "@/interface";
import React, { type FC, useMemo } from "react";
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
		return color;
	}, [cpuCoresNames]);

	// const [brush, setBursh] = useState([0, 0]);

	return (<div className='h-80'>
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
				<YAxis domain={[0, 100]} unit={'%'} />
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
	);
};
export default CpuCoreUsage;
