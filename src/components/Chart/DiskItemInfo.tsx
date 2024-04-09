import React, { Fragment, type FC, useMemo } from "react";
import { DiskInfo } from "@/interface";
import { PieChart, Pie, Legend, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { formatMemorySize } from "@/utils";
import { getRatioTheme } from "@/components";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;

type RenderCustomizedLabelProps = {
	cx: number;
	cy: number;
	midAngle: number;
	innerRadius: number;
	outerRadius: number;
	percent: number;
	index: number;
	value: number;
}

const RenderCustomizedLabel: FC<RenderCustomizedLabelProps> = (params) => {

	const { cx, cy, midAngle, innerRadius, outerRadius, percent, value } = params;

	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
	const x = cx + radius * Math.cos(-midAngle * RADIAN);
	const y = cy + radius * Math.sin(-midAngle * RADIAN);

	return (<Fragment>
		<text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
			{`${(percent * 100).toFixed(0)}%`}
		</text>
	</Fragment>
	);
};

const TooltipContent: FC<any> = ({ active, payload }) => {
	if (active && payload && payload.length) {
		console.log(payload);
		const info = payload[0]
		return (
			<span>{info.name}: {formatMemorySize(info.value)}</span>
		);
	}

	return null;
}



type DiskInfoProps = {
	disk: DiskInfo
};

export const DiskItemInfo: FC<DiskInfoProps> = ({ disk }) => {
	const data = useMemo(() => {
		return [
			{ name: '已使用', value: disk.used_space },
			{ name: '未使用', value: disk.available_space },
		]
	}, [disk])
	return <div>
		<div className='h-48'>
			<ResponsiveContainer width="100%" height="100%">
				<PieChart width={400} height={400}>
					<Pie
						data={data}
						cx="50%"
						cy="50%"
						isAnimationActive={false}
						labelLine={false}
						label={RenderCustomizedLabel}
						outerRadius={80}
						dataKey="value"
					>
						{data.map((entry, index) => (
							<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
						))}
					</Pie>
					<Legend />
					<Tooltip content={TooltipContent} />
				</PieChart>
			</ResponsiveContainer>
		</div>
		<div className="flex justify-center items-center">
			<span>{disk.mount_point}</span>

			<span className={getRatioTheme(disk.used_space / disk.total_space)}>{formatMemorySize(disk.used_space)}</span>
			|
			<span> {formatMemorySize(disk.total_space)}</span>
		</div>
	</div>;
}; 