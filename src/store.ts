import { writable } from "svelte/store";

export const CHARS: string = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0123456789";
export const SIZE_FACTOR: number = 14;
export const DEFAULT: number = 3;

export let storePassInput = writable("");
export let storePassOutput = writable("");
export let storePassLength = writable(14);