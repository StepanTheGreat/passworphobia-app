<script lang="ts">
    import { get } from "svelte/store";
    import { createAccount, generateSalt, loadSalt } from "../../storage";
    import LockPass from "../Lock/LockPass.svelte";
    import { storeUserSalt } from "../../store";
    import { fillTable, langTable } from "../../lang";
    import { onDestroy } from "svelte";

    interface SettingHint {
        color: string,
        key: string
    };

    let text: {[key: string]: string|string[]} = {
        "": "",
        dangerZone: "",
        salt: "",
        saltHint: "",
        regenerate: "",
        apply: "",
        save: "",
        password: "",
        newPassword: "",
        confirmPassword: "",
        successNewPassword: "",
        nothingToSave: "",
        settingsSaved: "",
        confirmPasswordDoesntMatch: "",
        notMatchingPasswords: "",
        emptyPassword: "",
        incorrectPassword: ""
    };

    let unsubscribeLang = langTable.subscribe(newTable => text = fillTable(text, newTable));

    let currentSalt: string = get(storeUserSalt);
    let newSalt: string = "";
    let newPass: string = "";

    let passwords: {[key: string]: string} = {
        "old": "",
        "new1": "",
        "new2": ""
    };
    
    let passwordsHint: SettingHint = {
        color: "text-text",
        key: ""
    };
    let confirmationHint: SettingHint = {
        color: "text-text",
        key: ""
    };

    function genNewSalt() {
        currentSalt = generateSalt(2);
    }

    function onSaltInput(e: any) {
        currentSalt = e.detail.value;
    }

    function onPassInput(e: any, index: string) {
        passwords[index] = e.detail.value;
    }

    function setNewPassword() {
        let new1Pass = passwords.new1;
        let new2Pass = passwords.new2;
        if (new1Pass == new2Pass) {
            if (!new1Pass || !new2Pass) {
                passwordsHint.color = "text-danger";
                passwordsHint.key = "emptyPassword";
            } else {
                newPass = new1Pass;
                passwordsHint.color = "text-success";
                passwordsHint.key = "successNewPassword";
            }
        } else {
            passwordsHint.color = "text-danger";
            passwordsHint.key = "notMatchingPasswords";
        }
    }

    function setNewSalt() {
        newSalt = currentSalt;
    }

    function saveSettings() {
        if (!newSalt && !newPass) {
            confirmationHint.color = "text-warning";
            confirmationHint.key = "nothingToSave";
            return;
        };

        let oldPass = passwords.old;
        loadSalt(oldPass).then(() => {
            let withPass = newPass? newPass : oldPass;
            let withSalt = newSalt? newSalt : get(storeUserSalt);
            createAccount(withPass, withSalt);
            storeUserSalt.set(withSalt);
            confirmationHint.color = "text-success";
            confirmationHint.key = "settingsSaved";
        }).catch(() => {
            confirmationHint.color = "text-danger";
            confirmationHint.key = "confirmPasswordDoesntMatch";
        });
    } 

    onDestroy(() => {
        unsubscribeLang();
    });
</script>

<div>
    <div class="mb-8">
        <h1 class="text-danger text-4xl text-center font-semibold">{text.dangerZone}</h1>
    </div>

    <div class="bg-secondary rounded-xl mx-auto w-fit px-16 py-8 mb-8">
        <h1 class="text-text text-4xl text-center">{text.salt}</h1>
        <div class="flex flex-col my-4">
            <LockPass size={32} value={currentSalt} on:passInput={e => onSaltInput(e)}></LockPass>
        </div>
        <p class="text-text italic text-center mb-2">{text.saltHint}</p>
        <div class="w-full flex flex-col">
            <button class="bg-primary text-text px-8 py-2 rounded-md m-auto mb-2" on:click={genNewSalt}>{text.regenerate}</button>
            <button class="bg-primary text-text px-8 py-2 rounded-md m-auto" on:click={setNewSalt}>{text.apply}</button>
        </div>
    </div>

    <div class="bg-secondary rounded-xl mx-auto w-fit px-16 py-8 mb-8">
        <h1 class="text-text text-4xl text-center">{text.password}</h1>
        <div class="my-4">
            <div class="mt-4 flex flex-col">
                <p class="text-text text-md text-center my-1">{text.newPassword}</p>
                <LockPass size={32} on:passInput={e => onPassInput(e, "new1")}></LockPass>
                <LockPass size={32} on:passInput={e => onPassInput(e, "new2")}></LockPass>
            </div>
        </div>
        <p class="{passwordsHint.color} italic text-center mb-2">{text[passwordsHint.key]}</p>
        <div class="w-full flex flex-col">
            <button class="bg-primary text-text px-8 py-2 rounded-md mx-auto" on:click={setNewPassword}>{text.apply}</button>
        </div>
    </div>

    <div class="w-full flex flex-col mb-8">
        <p class="text-text text-md text-center my-1">{text.confirmPassword}</p>
        <LockPass size={32} on:passInput={e => onPassInput(e, "old")}></LockPass>
        <p class="{confirmationHint.color} italic text-center mb-2">{text[confirmationHint.key]}</p>
        <button class="bg-accent text-text px-16 py-4 rounded-xl mx-auto" on:click={saveSettings}>Save</button>
    </div>
</div>