import { get, writable } from "svelte/store";
//@ts-ignore
import stdLang from "/src/assets/en.json";
import { confStore } from "./storage";

type LangSection = {[key: string]: string|string[]};
type LangTable = {[key: string]: LangSection};

const LANGS: string[] = ["en", "et", "fr", "ua", "ru"];
export let langTable = writable(stdLang);
export let currentLang = "en";

export function langLoad(newLang: string) {
    if (LANGS.includes(newLang) && newLang != "en") {
        fetch(
            `./lang/${newLang}.json`
        ).then(response => response.json().then(langObj => langTable.set(langObj))
        ).catch(error => {
            console.error("Error fetching JSON:", error);
        });
        currentLang = newLang;
    } else if (newLang == "en") {
        currentLang = "en";
        langTable.set(stdLang)
    }
}

export async function saveLang(lang: string) {
    await confStore.set("lang", lang);
    await confStore.save();
}

export async function getLang(): Promise<string> {
    let lang: string | null = await confStore.get("lang");
    return lang? lang : "en";
}

export function fillTable(requestTable: LangSection, newTable: LangTable): LangSection {
    Object.values(newTable).forEach(section => 
        Object.entries(section).forEach(([key, value]) => {
            if (key in requestTable) {
                requestTable[key] = value;
            }
        }
    ));
    return requestTable;
}

getLang().then(lang => {
    langLoad(lang);
    currentLang = lang;
});
