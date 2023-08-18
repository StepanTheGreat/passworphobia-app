import { writable } from "svelte/store";

export const LETTERS: string = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
export const NUMBERS: string = "0123456789";
export const SYMBOLS: string = "!\"#$%&'()*+,-./:;<=>?@[]\\^_`{}|~";

export const SIZE_FACTOR: number = 14;
export const DEFAULT: number = 3;

export let storePassInput = writable("");
export let storePassOutput = writable("");
export let storePassLength = writable(DEFAULT*SIZE_FACTOR);
export let storePassChars = writable(LETTERS+NUMBERS);