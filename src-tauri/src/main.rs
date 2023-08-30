// Copyright © 2023 August, Perfect Duo. All rights reserved.

#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::api::file;
use std::fs;

struct AppData {
    salt: String,
}

fn load_file(app: &tauri::AppHandle, key: &str) -> Option<AppData> {
    let app_dir = tauri::api::path::app_local_data_dir(app.config().as_ref());
    
    match app_dir {
        Some(path) => {
            println!("{:?}", path);
        },
        None => None
    }
}

fn main() {
    tauri::Builder::default()
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
