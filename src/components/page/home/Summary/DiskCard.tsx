import React, { type FC, useMemo } from "react";
import { Card, Ratio, getRatioBGTheme, Description } from "@/components";
import {
	Badge,
	Progress,
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui";
import { PropsSystemInfo, DiskInfo } from "@/interface";

import { formatMemorySize } from "@/utils";

import styles from "./DiskCard.module.css";

type DiskInfoProps = {
	diskInfo: DiskInfo;
};

const DiskItem: FC<DiskInfoProps> = ({ diskInfo }) => {
	const ratio = useMemo(() => {
		return diskInfo.used_space / diskInfo.total_space;
	}, [diskInfo.total_space, diskInfo.used_space]);

	return (
		<Tooltip delayDuration={200}>
			<TooltipTrigger asChild={true}>
				<div className={`${styles.diskInfo_info} grid gap-1 items-center`}>
					<span className={styles.diskInfo_mount_point}>
						{diskInfo.mount_point}
					</span>
					<Progress
						className={styles.diskInfo_progress}
						indicatorClassName={getRatioBGTheme(ratio)}
						value={ratio * 80}
					/>
					<span className={`${styles.diskInfo_size_info} text-nowrap text-sm`}>
						{" "}
						{formatMemorySize(diskInfo.used_space).string} /{" "}
						{formatMemorySize(diskInfo.total_space).string}
					</span>
				</div>
			</TooltipTrigger>
			<TooltipContent>
				<Description
					labelWidth={80}
					label='盘符'
					description={diskInfo.mount_point}
				/>
				<Description
					labelWidth={80}
					label='文件格式'
					description={diskInfo.file_system}
				/>
				<Description
					labelWidth={80}
					label='可用空间'
					description={formatMemorySize(diskInfo.available_space).string}
				/>
				<Description
					labelWidth={80}
					label='已用空间'
					description={formatMemorySize(diskInfo.used_space).string}
				/>
				<Description
					labelWidth={80}
					label='总空间'
					description={formatMemorySize(diskInfo.total_space).string}
				/>
				<Description
					labelWidth={80}
					label='使用率'
					description={<Ratio ratio={ratio} />}
				/>
			</TooltipContent>
		</Tooltip>
	);
};

export const DiskCard: FC<PropsSystemInfo> = ({ systemInfo, loading }) => {
	return (
		<Card title='硬盘' loading={loading}>
			{(systemInfo?.disks || []).map((disk, index) => {
				return <DiskItem key={disk.mount_point} diskInfo={disk} />;
			})}
		</Card>
	);
};
export default DiskCard;
