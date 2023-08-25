import { initializeApp } from "firebase/app";
import { deleteUser, getAuth, GoogleAuthProvider, signInWithCredential, signInWithPopup } from "firebase/auth";
import { deleteDoc, getFirestore, setDoc } from "firebase/firestore";

//@ts-ignore
import fireConfig from "/src/assets/firebase.config.json";
import { doc, getDoc } from "firebase/firestore";
import { storeLoading, storeUID, storeUserSalt } from "./store";
import { invoke } from "@tauri-apps/api";
import { listen } from "@tauri-apps/api/event";
import { open } from "@tauri-apps/api/shell";

const googleProvider = new GoogleAuthProvider();

export const fireApp = initializeApp(fireConfig);
export const fireAuth = getAuth(fireApp);
export const fireStore = getFirestore(fireApp);

export let fireStateUnsubscribe = fireAuth.onAuthStateChanged(user => {
    if (user) {
        loadUserData(user.uid);
    } else {
        storeUserSalt.set("");
        storeUID.set("");
    }
});

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

export function manualSignIn() {
    listen("oauth://url", (data) => {
        //@ts-ignore
        const url = new URL(data.payload);
        const access_token = new URLSearchParams(url.hash.substring(1)).get("access_token");

        if (!access_token) return;
        const credential = GoogleAuthProvider.credential(null, access_token);

        signInWithCredential(fireAuth, credential).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorCode, errorMessage);
        });
    });
    
    invoke("plugin:oauth|start", {
        // config: {
        //     response: callbackTemplate,
        // },
    }).then((port) => {
        console.log(port);
        return new Promise((resolve, reject) => {
            open("https://accounts.google.com/o/oauth2/auth?" +
                "response_type=token&" +
                `client_id=${fireConfig.clientId}&` +
                `redirect_uri=http%3A//localhost:${port}&` +
                "scope=email%20profile%20openid&" +
                "prompt=consent"
            ).then(resolve).catch(reject);
          });
        
    });

    // signInWithPopup(fireAuth, googleProvider).then(credential => {
    //     fireAuth.updateCurrentUser(credential.user);
    //     loadUserData(credential.user.uid);
    // }).catch(() => console.log("Failed to sing in!"));
}

export function signOut() {
    storeLoading.set(true);
    if (fireAuth.currentUser) {
        fireAuth.signOut().then(() => {
            storeUserSalt.set("");
            storeUID.set("");
            setTimeout(() => storeLoading.set(false), 1000);
        });
    }
}

export function deleteAccount() {
    let user = fireAuth.currentUser;
    if (user) {
        storeLoading.set(true);
        const userRef = doc(fireStore, `users/${user.uid}`);
        deleteDoc(userRef).then(() => {
            storeUserSalt.set("");
            
            deleteUser(user).then(() => {
                storeUID.set("");
                console.log("Succesfully deleted the account and document!");
            }).catch(() => {
                console.log("Failed to delete an account!");
            });
        }).catch(() => {
            console.log("Failed to delete a document!");
        }).finally(() => {
            setTimeout(() => storeLoading.set(false), 1000);
        });
    }
}