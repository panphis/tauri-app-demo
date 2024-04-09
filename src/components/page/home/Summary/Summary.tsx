import React, { type FC } from "react";
import { CPUCard, SystemCard, DiskCard, MemoryCard } from "./";

import { PropsSystemInfo } from "@/interface";

export const Summary: FC<PropsSystemInfo> = (props) => {
	return (
		<div className='grid gap-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4'>
			<SystemCard {...props} />
			<CPUCard {...props} />
			<MemoryCard {...props} />
			<DiskCard {...props} />
		</div>
	);
};
