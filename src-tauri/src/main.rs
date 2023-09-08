// Copyright © 2023 August, Perfect Duo. All rights reserved.

#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::rc::Rc;

#[tauri::command]
fn decrypt(data: &str, key: &str) -> Option<String> {
    println!("Hello");
    Some("Hello".to_string())
    
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![decrypt])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
