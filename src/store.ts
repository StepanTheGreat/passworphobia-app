import { writable } from "svelte/store";

export let storePassInput = writable("");
export let storePassOutput = writable("");
export let storeOutputSize = writable(14);
export let storeSize = writable(14);