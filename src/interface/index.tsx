export type DiskInfo = {
	file_system: string;
	mount_point: string;
	total_space: number;
	used_space: number;
	available_space: number;
};

export type CPUInfo = {
	name: String;
	cpu_usage: number;
	vendor_id: string;
	brand: String;
	frequency: number;
};

export interface SystemInfo {
	system_name: String;
	kernel_version: String;
	os_version: String;
	host_name: String;

	cpu_cores: number;
	cpus: [CPUInfo];
	cpu_usage: number;

	disks: [DiskInfo];

	used_memory: number;
	free_memory: number;
	total_memory: number;
}

export type PropsSystemInfo = {
	systemInfo: SystemInfo | undefined;
	loading: boolean;
};
