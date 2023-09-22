<script lang="ts">
    import { get } from "svelte/store";
    import { createAccount, generateSalt, loadSalt } from "../../storage";
    import LockPass from "../Lock/LockPass.svelte";
    import { storeUserSalt } from "../../store";

    interface SettingHint {
        color: string,
        text: string
    };

    let currentSalt: string = get(storeUserSalt);
    let newSalt: string = currentSalt;
    let newPass: string = "";
    let passwords: {[key: string]: string} = {
        "old": "",
        "new1": "",
        "new2": ""
    };
    
    let passwordsHint: SettingHint = {
        color: "text",
        text: ""
    };
    let confirmationHint: SettingHint = {
        color: "text",
        text: ""
    };

    function genNewSalt() {
        newSalt = generateSalt(2);
    }

    function onSaltInput(e: any) {
        newSalt = e.detail.value;
    }

    function onPassInput(e: any, index: string) {
        passwords[index] = e.detail.value;
    }

    function newPassword() {
        let new1Pass = passwords.new1;
        let new2Pass = passwords.new2;
        if (new1Pass == new2Pass) {
            if (!new1Pass || !new2Pass) {
                passwordsHint.color = "red-500";
                passwordsHint.text = "New password cannot be empty!";
            } else {
                passwordsHint.text = "Succesfully set the new password!";
                passwordsHint.color = "green-500";
                newPass = new1Pass;
            }
        } else {
            passwordsHint.text = "Passwords do not match!";
            passwordsHint.color = "red-500";
        }
    }

    function saveSettings() {
        if (newSalt == currentSalt && !newPass) {
            confirmationHint.color = "red-500";
            confirmationHint.text = "Nothing to save.";
            return;
        };

        let oldPass = passwords.old;
        loadSalt(oldPass).then(() => {
            let withPass = newPass? newPass : oldPass;
            createAccount(withPass, newSalt);
            storeUserSalt.set(newSalt);
            confirmationHint.color = "green-500";
            confirmationHint.text = "Your new settings were saved!";
        }).catch(() => {
            confirmationHint.color = "red-500";
            confirmationHint.text = "The confirmation password doesn't match!";
        });
    }   
</script>

<div>
    <div class="mb-8">
        <h1 class="text-red-500 text-4xl text-center font-semibold">DANGER ZONE</h1>
    </div>

    <div class="bg-secondary rounded-xl mx-auto w-fit px-16 py-8 mb-8">
        <h1 class="text-text text-4xl text-center">Salt</h1>
        <div class="flex flex-col my-4">
            <LockPass size={32} value={newSalt} on:passInput={e => onSaltInput(e)}></LockPass>
        </div>
        <p class="text-text italic text-center mb-2">Generates a new, random, strong salt</p>
        <div class="w-full flex flex-col">
            <button class="bg-primary text-text px-8 py-2 rounded-md m-auto" on:click={genNewSalt}>Regenerate</button>
        </div>
    </div>

    <div class="bg-secondary rounded-xl mx-auto w-fit px-16 py-8 mb-8">
        <h1 class="text-text text-4xl text-center">Password</h1>
        <div class="my-4">
            <div class="mt-4 flex flex-col">
                <p class="text-text text-md text-center my-1">New password</p>
                <LockPass size={32} on:passInput={e => onPassInput(e, "new1")}></LockPass>
                <LockPass size={32} on:passInput={e => onPassInput(e, "new2")}></LockPass>
            </div>
        </div>
        <p class="text-{passwordsHint.color} italic text-center mb-2">{passwordsHint.text}</p>
        <div class="w-full flex flex-col">
            <button class="bg-primary text-text px-8 py-2 rounded-md mx-auto" on:click={newPassword}>Apply</button>
        </div>
    </div>

    <div class="w-full flex flex-col mb-8">
        <p class="text-text text-md text-center my-1">Confirmation password</p>
        <LockPass size={32} on:passInput={e => onPassInput(e, "old")}></LockPass>
        <p class="text-{confirmationHint.color} italic text-center mb-2">{confirmationHint.text}</p>
        <button class="bg-accent text-text px-16 py-4 rounded-xl mx-auto" on:click={saveSettings}>Save</button>
    </div>
</div>