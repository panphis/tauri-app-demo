"use client"
import { useState, useEffect } from "react";
import { Summary } from "@/components/page/home";
import { Skeleton } from "@/components/ui"
import { get_system_info, SystemInfo } from "@/invoke";




export default function Home() {
	const [systemInfo, setSystemInfo] = useState<SystemInfo | undefined>();

	useEffect(() => {
		!async function () {
			const result = await get_system_info()
			setSystemInfo(result)
		}();
	}, [])

	return (
		<main className="min-h-screen">
			{
				systemInfo ?
					<Summary systemInfo={systemInfo} /> :

					<div className="flex flex-col space-y-3">
						<Skeleton className="h-[125px] w-[250px] rounded-xl" />
						<div className="space-y-2">
							<Skeleton className="h-4 w-[250px]" />
							<Skeleton className="h-4 w-[200px]" />
						</div>
					</div>
			}
		</main>
	);
}
