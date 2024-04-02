pub struct SystemInfo {}

impl SystemInfo {
    fn new() -> Self {
        SystemInfo {}
    }
}

pub fn get_system_info() -> SystemInfo {
    SystemInfo::new()
}
