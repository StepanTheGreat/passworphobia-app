import { writable } from "svelte/store";
//@ts-ignore
import stdLang from "/src/assets/en.json";

const LANGS: string[] = ["en", "et", "fr", "ru", "ua"];
const hasStorage: boolean = typeof(Storage) !== "undefined";

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

export function saveLang(lang: string) {
    if (hasStorage) {
        localStorage.setItem("lang", lang);
    }
}

export function getLang(): string {
    if (hasStorage) {
        let lang = localStorage.getItem("lang");
        return lang? lang : "en";
    } else {
        return "en";
    }
}

export let langTable = writable(stdLang);
langLoad(getLang());