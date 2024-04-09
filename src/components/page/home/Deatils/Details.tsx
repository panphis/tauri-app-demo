import React, { type FC } from "react";

import { PropsCPUDetailInfo, PropsSystemInfo } from "@/interface";
import { CPUCore, Disk } from ".";



export const Details: FC<PropsCPUDetailInfo & PropsSystemInfo> = (props) => {

	return (
		<div className='grid gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-4'>
			<CPUCore {...props} />
			<Disk systemInfo={props.systemInfo} loading={props.loading} />
		</div>
	);
};
