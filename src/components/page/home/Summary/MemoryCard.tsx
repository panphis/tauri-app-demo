import React, { FC } from "react";
import { PropsSystemInfo } from "@/interface";
import { formatMemorySize } from "@/utils";
import { Card, Ratio, Description } from "@/components";

export const MemoryCard: FC<PropsSystemInfo> = ({ systemInfo, loading }) => {
	return (
		<Card title='内存' loading={loading}>
			<Description
				labelWidth={120}
				label='可用内存'
				description={formatMemorySize(systemInfo?.free_memory)}
			/>
			<Description
				labelWidth={120}
				label='已用内存'
				description={formatMemorySize(systemInfo?.used_memory)}
			/>
			<Description
				labelWidth={120}
				label='总内存'
				description={formatMemorySize(systemInfo?.total_memory)}
			/>
			<Description
				labelWidth={120}
				label='内存使用率'
				description={
					<Ratio
						ratio={
							(systemInfo?.used_memory ?? 0) / (systemInfo?.total_memory ?? 1)
						}
					/>
				}
			/>
		</Card>
	);
};
export default MemoryCard;
