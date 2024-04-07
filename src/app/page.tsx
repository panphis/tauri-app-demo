"use client";
import { useState, useEffect } from "react";
import { Summary, Details } from "@/components/page/home";
import { get_system_info } from "@/invoke";
import { SystemInfo } from "@/interface";

export default function Home() {
	const [loading, setLoading] = useState<boolean>(false);
	const [systemInfo, setSystemInfo] = useState<SystemInfo | undefined>();

	useEffect(() => {
		!(async function () {
			setLoading(true);
			const result = await get_system_info();
			setSystemInfo(result);
			setLoading(false);
		})();
	}, []);

	return (
		<main className='flex flex-col gap-4 p-4'>
			<Summary systemInfo={systemInfo} loading={loading} />
			<Details systemInfo={systemInfo} loading={loading} />
		</main>
	);
}
