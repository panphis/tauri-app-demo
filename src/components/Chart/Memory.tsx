import React, { Fragment, type FC, useMemo } from "react";
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
import { Memory as MemoryType, MemoryRecorder } from "@/interface";
import { formatMemorySize } from "@/utils";

type MemoryProps = {
	data: MemoryRecorder[]
	total: MemoryType
};

export const Memory: FC<MemoryProps> = ({ data, total }) => {

	return <Fragment>
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
					<YAxis domain={[0, total]} tick={false} />
					<Tooltip formatter={(value, name, props) => {
						const v = value as number
						return [`${formatMemorySize(v * 1 || 0).string}`, `内存使用`]
					}} />
					{/* <Legend /> */}
					<Line
						type='monotone'
						isAnimationActive={false}
						dataKey={'value'}
						stroke={'rgb(6, 182, 212)'}
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
	</Fragment>;
};
export default Memory