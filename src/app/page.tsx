"use client"

import { ReactNode, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";

export default function Home() {

	const [msg, setMsg] = useState<String>('');

	const test = async () => {
		setMsg(await invoke("greet", { name: 'sssss' }));
	}


	return (
		<main className="flex min-h-screen flex-col items-center text-balance justify-evenly gap-1">
			<p className={`m-8 px-2 text-sm opacity-50`}>
				This is an app build with next.js and tauri.
			</p>
			<p className={`m-2 px-2 max-w-[30ch] text-sm opacity-50`}>Message:{msg}</p>
			<button className="mt-2 rounded border-stone-300 bg-white px-4 py-1" onClick={test}>test</button>
		</main>
	);
}
