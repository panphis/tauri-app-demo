
import { invoke } from "@tauri-apps/api/tauri";


export interface SystemInfo {
	system_name: String,
	kernel_version: String,
	os_version: String,
	host_name: String,
	total_memory: number,
	used_memory: number,
	cpus: number,
}

export const get_system_info = async (): Promise<SystemInfo> => {
	return await invoke("get_system_info");
};


interface GreetArgs {
	name: string;
}
interface GreetResult {
	name: string;
}
export const greet = async (params: GreetArgs): Promise<GreetResult> => {
	return await invoke("greet", { ...params });
};
