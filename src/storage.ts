import { Store } from "tauri-plugin-store-api";
import CryptoJS from "crypto-js";
import { storeUserSalt } from "./store";

export const confStore = new Store(".lang.dat");
export const dataStore = new Store(".salt.dat");

export function generateSalt(times: number) {
    let uid: string = "";
    for (let i = 0; i < times; i++) {
        console.log(i);
        uid += crypto.randomUUID().split("-").join("");
    }
    return uid;
}

export async function hasAccount(): Promise<boolean> {
    return await dataStore.get("salt") != null;
}

export async function createAccount(password: string, withSalt: string = "")  {
    let newSalt: string = withSalt? withSalt: generateSalt(2);
    let encryptedSalt: string = CryptoJS.AES.encrypt(newSalt, password).toString();
    let hmac = CryptoJS.HmacSHA256(encryptedSalt, CryptoJS.SHA256(password)).toString();
    await dataStore.set("salt", hmac+encryptedSalt);
    await dataStore.save();
    return newSalt;
}

export async function loadSalt(password: string): Promise<string> {
    let encryptedToken: string | null =  await dataStore.get("salt");
    if (!encryptedToken) {
        throw new Error("No account data found!");
    }
    let hmac = encryptedToken.substring(0, 64);
    let encryptedSalt = encryptedToken.substring(64);

    let decryptedhmac = CryptoJS.HmacSHA256(encryptedSalt, CryptoJS.SHA256(password)).toString();
    if (decryptedhmac != hmac) {
        throw new Error("Passwords do not match!");
    }
    let decryptedSalt = CryptoJS.AES.decrypt(encryptedSalt, password).toString(CryptoJS.enc.Utf8);
    return decryptedSalt;
}

export async function loadAccount(password: string) {
    try {
        let salt = await loadSalt(password);
        storeUserSalt.set(salt)
    } catch (e) {
        throw e;
    }
}