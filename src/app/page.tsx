"use client"
import { useState, useEffect } from "react";
import { Summary } from "@/components/page/home";
import { Skeleton } from "@/components/ui"
import { get_system_info, SystemInfo } from "@/invoke";




export default function Home() {
	const [loading, setLoading] = useState<boolean>(false)
	const [systemInfo, setSystemInfo] = useState<SystemInfo | undefined>();

	useEffect(() => {
		!async function () {
			setLoading(true)
			const result = await get_system_info()
			setSystemInfo(result)
			setLoading(false)
		}();
	}, [])

	return (
		<main className="min-h-screen">

			<Summary systemInfo={systemInfo} loading={loading} />

		</main>
	);
}
