import React, { type FC } from "react";
import { Card, Ratio } from "@/components";
import { PropsSystemInfo } from "@/interface";

export const CPUCore: FC<PropsSystemInfo> = ({ systemInfo, loading }) => {
	return (
		<Card title='Cpu 逻辑处理器' loading={loading}>
			<div className='grid gap-4 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-3'>
				{(systemInfo?.cpus || []).map(
					({ name, cpu_usage, vendor_id, brand, frequency }, index) => (
						<>
							<div
								key={vendor_id}
								className='flex flex-col items-center justify-center'
							>
								<div className='text-center text-sm font-medium'>{name}</div>
								<Ratio ratio={cpu_usage / 100} />
							</div>
						</>
					)
				)}
			</div>
		</Card>
	);
};
export default CPUCore;
