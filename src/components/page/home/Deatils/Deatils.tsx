import React, { type FC } from "react";

import { PropsSystemInfo } from "@/interface";
import { CPUCore } from ".";

export const Details: FC<PropsSystemInfo> = (props) => {
	return (
		<div className='grid gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-3'>
			<CPUCore {...props} />
		</div>
	);
};
