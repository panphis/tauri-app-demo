import React, { type FC } from "react";
import { MemoriesProps } from "@/interface";
import { Memory } from "@/components/Chart";
import { Card } from "@/components/Card";
import Ratio, { getRatioTheme, } from "@/components/Ratio";
import { Separator } from "@/components/ui";
import { formatMemorySize } from "@/utils";

export const Memories: FC<MemoriesProps> = ({ loading, memories, systemInfo }) => {
	return (
		<Card title={<div className="flex h-5 items-center space-x-1">
			<span>内存信息</span>
			<Separator orientation="vertical" />
			<span className="text-sm text-gray-500">总大小{formatMemorySize(systemInfo?.total_memory).string}</span>
			<Separator orientation="vertical" />
			<span className={`text-sm ${getRatioTheme(systemInfo?.memory_percentage ?? 0)}`}>已使用{formatMemorySize(systemInfo?.used_memory).string}</span>
			<Separator orientation="vertical" />
			<span className={`${getRatioTheme(systemInfo?.memory_percentage ?? 0)} text-sm`}>

				<Ratio
					ratio={
						(systemInfo?.memory_percentage ?? 0)
					}
				/>
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