import React, { type FC } from "react";
import { Card } from "@/components";
import { PropsSystemInfo } from "@/interface";
import { DiskItemInfo } from "@/components/Chart";

export const Disk: FC<PropsSystemInfo> = ({ systemInfo, loading }) => {
	return (
		<Card title="硬盘信息" className="sm:col-span-1 md:col-span-1 xl:col-span-1 2xl:col-span-2" loading={loading}>
			<div className="grid gap-2 sm:col-span-1 md:grid-cols-4 xl:grid-cols-2">

				{
					(systemInfo?.disks || []).map((disk) => <DiskItemInfo key={disk.mount_point} disk={disk} />)
				}
			</div>
		</Card>
	);
};
export default Disk;