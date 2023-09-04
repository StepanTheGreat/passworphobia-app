import { writable } from "svelte/store";
//@ts-ignore
import stdLang from "/src/assets/en.json";
import { loadItem, setItem } from "./storage";

const LANGS: string[] = ["en", "et", "fr", "ru", "ua"];

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
    setItem("lang", lang);
}

export function getLang(): string {
    let lang = loadItem("lang");
    return lang? lang : "en";
}

export let langTable = writable(stdLang);
langLoad(getLang());