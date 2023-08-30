import { storeLoading, storeUID, storeUserSalt } from "./store";

function generateSalt() {
    let uid = crypto.randomUUID() + crypto.randomUUID();
    uid = uid.split("-").join("");
    return uid;
}