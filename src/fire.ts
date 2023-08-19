import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, setDoc } from "firebase/firestore";

//@ts-ignore
import fireConfig from "/src/assets/firebase.config.json";
import { doc, getDoc } from "firebase/firestore";
import { storeLoading, storeUID, storeUserSalt } from "./store";

const googleProvider = new GoogleAuthProvider();

export const fireApp = initializeApp(fireConfig);
export const fireAuth = getAuth(fireApp);
export const fireStore = getFirestore(fireApp);

function generateSalt() {
    let uid = crypto.randomUUID() + crypto.randomUUID();
    uid = uid.split("-").join("");
    return uid;
}

function loadUserData(id: string) {
    storeLoading.set(true);
    const userRef = doc(fireStore, `users/${id}`);
    getDoc(userRef).then((docSnapshot) => {
        let salt: string = "";
        if (!docSnapshot.exists()) {
            salt = generateSalt();
            setDoc(userRef, {"salt": salt});
        } else {
            salt = docSnapshot.get("salt");
        }

        storeUserSalt.set(salt);
        storeUID.set(id);
        setTimeout(() => storeLoading.set(false), 1000);
    });
}

export function autoSignIn() {
    console.log(fireAuth.currentUser);
    if (fireAuth.currentUser) {
        let user = fireAuth.currentUser;
        loadUserData(user.uid);
    }
}

export function manualSignIn() {
    signInWithPopup(fireAuth, googleProvider).then(credential => {
        fireAuth.updateCurrentUser(credential.user);
        // Succesfully signed-in
        loadUserData(credential.user.uid);
    }).catch(() => console.log("Failed to sing in!"));
}

export function signOut() {
    storeLoading.set(true);
    if (fireAuth.currentUser) {
        fireAuth.signOut().then(() => {
            storeUserSalt.set("salt");
            storeUID.set("id");
            setTimeout(() => storeLoading.set(false), 1000);
        });
    }
}

autoSignIn();