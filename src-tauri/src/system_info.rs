use serde::{Deserialize, Serialize};
use std::env::consts::OS;
use sysinfo::{Components, Disks, Networks, System};

#[derive(Debug, Serialize, Deserialize)]
pub struct SystemInfo {
    system_name: String,
    kernel_version: String,
    os_version: String,
    host_name: String,
    total_memory: u64,
    used_memory: u64,
    cpus: usize,
    cpu_usage: f32,
}

impl SystemInfo {
    fn new() -> Self {
        let mut sys: System = System::new_all();
        sys.refresh_all();

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
        let total_memory = sys.total_memory();
        let used_memory = sys.used_memory();
        let host_name: String = match System::host_name() {
            Some(name) => name,
            None => "Unknow host name".to_owned(),
        };
        let cpus = sys.cpus().len();
        let cpu_usage = sys.global_cpu_info().cpu_usage();
        let current_system_info = SystemInfo {
            system_name,
            kernel_version,
            os_version,
            host_name,
            total_memory,
            used_memory,
            cpus,
            cpu_usage,
        };
        println!("{:?}", current_system_info);
        return current_system_info;
    }
}

#[tauri::command]
pub fn get_system_info() -> SystemInfo {
    SystemInfo::new()
}
