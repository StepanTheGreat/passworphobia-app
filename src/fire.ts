import { initializeApp } from "firebase/app";
import { deleteUser, getAuth, GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { deleteDoc, getFirestore, setDoc } from "firebase/firestore";

//@ts-ignore
import fireConfig from "/src/assets/firebase.config.json";
import { doc, getDoc } from "firebase/firestore";
import { storeLoading, storeUID, storeUserSalt } from "./store";
import { invoke } from "@tauri-apps/api";
import { listen } from "@tauri-apps/api/event";
import { open } from "@tauri-apps/api/shell";
import { langTable } from "./lang";
import { get } from "svelte/store";

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

    const success_text = get(langTable).sign_in_text;
    
    invoke("plugin:oauth|start", {
        config: {
            response: `
                <!doctype html>
                <html>
                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <style>
                        html,body {height: 100%; margin: 0;}
                        body {background-color: #13142c;}
                        div {margin: auto;}
                        body, div {display: flex; flex-direction: column;}
                        svg { fill: #faf4ef;width: 20vh;height: 20vh;margin-left: auto;margin-right: auto;}
                        h2 {text-align: center;color: #faf4ef;margin-bottom: auto;font-family: "Helvetica", sans-serif;}
                    </style>
                </head>

                <body>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M10.5 15.25A.74.74 0 0 1 10 15l-3-3a.75.75 0 0 1 1-1l2.47 2.47L19 5a.75.75 0 0 1 1 1l-9 9a.74.74 0 0 1-.5.25Z"/>
                            <path d="M12 21a9 9 0 0 1-7.87-4.66a8.67 8.67 0 0 1-1.07-3.41a9 9 0 0 1 4.6-8.81a8.67 8.67 0 0 1 3.41-1.07a8.86 8.86 0 0 1 3.55.34a.75.75 0 1 1-.43 1.43a7.62 7.62 0 0 0-3-.28a7.43 7.43 0 0 0-2.84.89a7.5 7.5 0 0 0-2.2 1.84a7.42 7.42 0 0 0-1.64 5.51a7.43 7.43 0 0 0 .89 2.84a7.5 7.5 0 0 0 1.84 2.2a7.42 7.42 0 0 0 5.51 1.64a7.43 7.43 0 0 0 2.84-.89a7.5 7.5 0 0 0 2.2-1.84a7.42 7.42 0 0 0 1.64-5.51a.75.75 0 1 1 1.57-.15a9 9 0 0 1-4.61 8.81A8.67 8.67 0 0 1 12.93 21H12Z"/>
                        </svg>
                        <h2>${success_text}</h2>
                    </div>
                </body>
                </html>
            `,
        },
    }).then((port) => {
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