import { get, writable } from "svelte/store";
//@ts-ignore
import stdLang from "/src/assets/en.json";
import { confStore } from "./storage";

type LangSection = {[key: string]: string|string[]};
type LangTable = {[key: string]: LangSection};

const LANGS: string[] = ["en", "et", "fr", "ua", "ru"];

/** The current global language dictionary */
export let langTable = writable(stdLang);
/** The current global language identifier */
export let currentLang = writable("en");

/** Will try to fetch a (lang).json file for the supplied language code, and if successful - will update the `langTable` and `currentLang` variables. */ 
export function langLoad(newLang: string) {
    if (LANGS.includes(newLang) && newLang != "en") {
        fetch(
            `./lang/${newLang}.json`
        ).then(response => response.json().then(langObj => langTable.set(langObj))
        ).catch(error => {
            console.error("Error fetching JSON:", error);
        });
        currentLang.set(newLang);
    } else if (newLang == "en") {
        currentLang.set("en");
        langTable.set(stdLang)
    }
}

/** Simply changes the `lang` key in the key store and saves the changes */ 
export async function saveLang(lang: string) {
    await confStore.set("lang", lang);
    await confStore.save();
}

/** Fetches the key store for the saved language, and if nothing is found (no language saved) - returns english (`en`) as the default language */ 
export async function getLang(): Promise<string> {
    let lang: string | null = await confStore.get("lang");
    return lang? lang : "en";
}

/** Iterates over a dictionary object and translates its properties using the provided `newTable` language table. Returns a new translated object */ 
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

// This will try to automatically get the language at the start
getLang().then(lang => langLoad(lang));
