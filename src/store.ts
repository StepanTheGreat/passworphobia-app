import { writable } from "svelte/store";

export enum AppState {
    Lock,
    Main,
    Settings
}

export const LETTERS: string = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
export const NUMBERS: string = "0123456789";
export const SYMBOLS: string = "!\"#$%&'()*+,-./:;<=>?@[]\\^_`{}|~";

export const PASS_SIZES: number[] = [
    14, // tiny
    28, // small
    42, // medium
    56, // big
    70, // large
    128, // 1024b
    256, // 2048b
    512 // 4096b
]

export const DEFAULT_PASSWORD_SIZE: number = PASS_SIZES[2];
export const DEFAULT_SYMBOLS: string = LETTERS + NUMBERS;

export const SALT_SIZE: number = 48;

export let appState = writable(AppState.Lock);

export let storeUserSalt = writable("");