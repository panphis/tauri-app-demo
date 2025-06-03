import { SystemInfo } from "@/interface";
import { invoke } from "@tauri-apps/api/core";

export const get_system_info = async (): Promise<SystemInfo> => {
	const systemInfo: SystemInfo = await invoke("get_system_info");
	return systemInfo;
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
