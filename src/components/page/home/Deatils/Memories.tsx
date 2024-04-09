import React, { type FC } from "react";
import { Memory } from "@/components/Chart";
import { MemoriesProps } from "@/interface";
import { Card } from "@/components/Card";
import { getRatioTheme, } from "@/components/Ratio";
import { formatMemorySize } from "@/utils";

export const Memories: FC<MemoriesProps> = ({ loading, memories, systemInfo }) => {
	return (
		<Card title={<div className="flex flex-row gap-2 items-end">
			内存信息
			<span className="text-sm text-gray-500">总大小{formatMemorySize(systemInfo?.total_memory)}</span>
			<span className={`text-sm ${getRatioTheme(systemInfo?.memory_percentage ?? 0)}`}>已使用{formatMemorySize(systemInfo?.used_memory)}</span>
			<span className={`${getRatioTheme(systemInfo?.memory_percentage ?? 0)} text-sm`}>
				{`${systemInfo?.memory_percentage ?? 0}%`}
			</span>
		</div>
		}
			className="sm:col-span-1 md:col-span-1 xl:col-span-1 2xl:col-span-2"
			loading={loading}
		>
			<Memory data={memories} total={systemInfo?.total_memory || 0} />
		</Card >);
};
export default Memories