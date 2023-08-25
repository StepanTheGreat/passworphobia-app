import { writable } from "svelte/store";
//@ts-ignore
import stdLang from "/src/assets/en.json";

const LANGS: string[] = ["en", "et", "fr", "ru", "ua"];

export let langTable = writable(stdLang);

export function langLoad(newLang: string) {
    if (LANGS.includes(newLang) && newLang != "en") {
        fetch(
            `./lang/${newLang}.json`
        ).then(response => response.json().then(langObj => langTable.set(langObj))
        ).catch(error => {
            console.error("Error fetching JSON:", error);
        });
    } else if (newLang == "en") {
        langTable.set(stdLang);
    }
}