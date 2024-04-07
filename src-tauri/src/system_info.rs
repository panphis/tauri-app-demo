use serde::{Deserialize, Serialize};

use sysinfo::{Disk, Disks, System};

#[derive(Debug, Serialize, Deserialize)]
struct CPUInfo {
    name: String,
    cpu_usage: f32,
    vendor_id: String,
    brand: String,
    frequency: u64,
}

#[derive(Debug, Serialize, Deserialize)]
struct DiskInfo {
    file_system: String,
    mount_point: String,
    used_space: u64,
    available_space: u64,
    total_space: u64,
}

fn generate_disk_info(disk: &Disk) -> DiskInfo {
    let file_system = disk.file_system().to_string_lossy().to_string();
    let mount_point = disk.mount_point().to_string_lossy().to_string();
    let total_space = disk.total_space();
    let available_space = disk.available_space();
    let used_space = total_space - available_space;
    return DiskInfo {
        file_system,
        mount_point,
        total_space,
        available_space,
        used_space,
    };
}

#[derive(Debug, Serialize, Deserialize)]
struct NetWorkInfo {
    interface_name: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct SystemInfo {
    system_name: String,
    kernel_version: String,
    os_version: String,
    host_name: String,
    cpu_cores: usize,
    cpu_usage: f32,
    cpus: Vec<CPUInfo>,
    disks: Vec<DiskInfo>,
    free_memory: u64,
    used_memory: u64,
    total_memory: u64,
}

impl SystemInfo {
    fn new() -> Self {
        let mut sys: System = System::new_all();
        sys.refresh_all();

        /* base system info */
        let system_name = match System::name() {
            Some(name) => name,
            None => "Unknow System name".to_owned(),
        };
        let kernel_version = match System::kernel_version() {
            Some(name) => name,
            None => "Unknow Kernel version".to_owned(),
        };
        let os_version = match System::os_version() {
            Some(name) => name,
            None => "Unknow OS version".to_owned(),
        };
        let host_name: String = match System::host_name() {
            Some(name) => name,
            None => "Unknow host name".to_owned(),
        };

        /*cpu info*/
        let cpu_cores = sys.cpus().len();
        let cpu_usage = sys.global_cpu_info().cpu_usage();
        let cpus = sys
            .cpus()
            .iter()
            .map(|cpu| CPUInfo {
                name: cpu.name().to_string(),
                cpu_usage: cpu.cpu_usage(),
                vendor_id: cpu.vendor_id().to_string(),
                brand: cpu.brand().to_string(),
                frequency: cpu.frequency(),
            })
            .collect();

        /* disk info */
        let disk_set = Disks::new_with_refreshed_list();

        let disks = disk_set
            .list()
            .iter()i
            .map(|disk| generate_disk_Info(disk))
            .collect();

        /* memory info */
        let total_memory = sys.total_memory();
        let used_memory = sys.used_memory();
        let free_memory = sys.free_memory();

        let current_system_info = SystemInfo {
            system_name,
            kernel_version,
            os_version,
            host_name,
            cpu_cores,
            cpu_usage,
            cpus,
            disks,
            free_memory,
            used_memory,
            total_memory,
        };
        return current_system_info;
    }
}

#[tauri::command]
pub fn get_system_info() -> SystemInfo {
    SystemInfo::new()
}
