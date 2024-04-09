"use client";

import { Summary, Details } from "@/components/page/home";
import { useSystemInfo } from "@/hooks";

export default function Home() {

	const { initializing, loading, systemInfo, cpuUsage, cpuCores, cpuCoresNames, memories } = useSystemInfo();

	return (
		<main className='flex flex-col gap-4 p-4'>
			<Summary systemInfo={systemInfo} loading={initializing} />
			<Details
				systemInfo={systemInfo}
				loading={initializing}
				cpuUsage={cpuUsage}
				cpuCores={cpuCores}
				cpuCoresNames={cpuCoresNames}
				memories={memories}
			/>
		</main>
	);
}
