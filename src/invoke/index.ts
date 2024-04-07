
import { invoke } from "@tauri-apps/api/tauri";

export type DiskInfo = {
	file_system: string,
	mount_point: string,
	total_space: number,
	used_space: number,
	available_space: number,
}

export type CPUInfo = {
	name: String,
	cpu_usage: number,
	vendor_id: String,
	brand: String,
	frequency: number,
}


export interface SystemInfo {
	system_name: String,
	kernel_version: String,
	os_version: String,
	host_name: String,

	cpu_cores: number,
	cpus: [CPUInfo],
	cpu_usage: number,

	disks: [DiskInfo],

	total_memory: number,
	used_memory: number,
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
