// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#[cfg_attr(mobile, tauri::mobile_entry_point)]

mod system_info;
use system_info::get_system_info;

#[tauri::command]
fn greet(name: &str) -> String {
    return format!("Hello, {}!", name);
}

pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, get_system_info])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
