<script lang="ts">
    import LangBtn from "../components/Main/LangBtn.svelte";
    import Title from "../components/Main/Title.svelte";
    import SwitchState from "../components/SwitchState.svelte";

    import { get } from "svelte/store";
    import { createAccount, generateSalt, loadSalt } from "../storage";
    import { storeUserSalt } from "../store";
    import { fillTable, langTable } from "../lang";
    import { onDestroy } from "svelte";
    import PasswordInput from "../components/PasswordInput.svelte";

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
        newPasswordHint: "",
        successNewPassword: "",
        nothingToSave: "",
        settingsSaved: "",
        confirmPasswordHint: "",
        confirmPasswordDoesntMatch: "",
        notMatchingPasswords: "",
        emptyPassword: "",
        incorrectPassword: ""
    };

    let unsubscribeLang = langTable.subscribe(newTable => text = fillTable(text, newTable));
    
    let confirmationPassword: string = "";
    let currentSalt: string = get(storeUserSalt);
    let newSalt: string = "";
    let newPass: string = "";
    
    let newPassword1: string = "";
    let newPassword2: string = "";
    
    let passwordsHint: SettingHint = {
        color: "text-text",
        key: ""
    };
    let confirmationHint: SettingHint = {
        color: "text-text",
        key: ""
    };

    function genNewSalt() {
        currentSalt = generateSalt();
    }

    function setNewPassword() {
        if (newPassword1 == newPassword2) {
            if (!newPassword1 || !newPassword2) {
                passwordsHint.color = "text-danger";
                passwordsHint.key = "emptyPassword";
            } else {
                newPass = newPassword1;
                passwordsHint.color = "text-success";
                passwordsHint.key = "successNewPassword";
            }
        } else {
            passwordsHint.color = "text-danger";
            passwordsHint.key = "notMatchingPasswords";
        }PasswordInput
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

        loadSalt(confirmationPassword).then(() => {
            let withPass = newPass? newPass : confirmationPassword;
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

<main class="w-full h-full grid gap-4 bg-background">
    <div class="_header mt-4">
        <LangBtn></LangBtn>
        <Title></Title>
        <SwitchState to="home"></SwitchState>
    </div>
    <div class="_tool flex flex-col">
        <!---->
        <div class="mb-8">
            <h1 class="text-danger text-4xl text-center font-semibold">{text.dangerZone}</h1>
        </div>

        <div class="bg-secondary rounded-xl mx-auto w-fit px-16 py-8 mb-8">
            <h1 class="text-text text-4xl text-center">{text.salt}</h1>
            <div class="flex flex-col my-4">
                <PasswordInput size={32} bind:value={currentSalt}/>
            </div>
            <p class="text-text italic text-center mb-2">{text.saltHint}</p>
            <div class="w-full flex flex-col">
                <button class="bg-primary text-text px-8 py-2 rounded-md m-auto mb-2" on:click={genNewSalt}>{text.regenerate}</button>
                <button class="bg-primary text-text px-8 py-2 rounded-md m-auto" on:click={setNewSalt}>{text.apply}</button>
            </div>
        </div>

        <form class="bg-secondary rounded-xl mx-auto w-fit px-16 py-8 mb-8" on:submit|preventDefault={setNewPassword}>
            <h1 class="text-text text-4xl text-center">{text.password}</h1>
            <div class="my-4">
                <div class="mt-4 flex flex-col">
                    <p class="text-text italic text-md text-center my-1 mb-3">{text.newPasswordHint}</p>
                    <PasswordInput size={32} bind:value={newPassword1}/>
                    <PasswordInput size={32} bind:value={newPassword2}/>
                </div>
            </div>
            <p class="{passwordsHint.color} italic text-center mb-2">{text[passwordsHint.key]}</p>
            <div class="w-full flex flex-col">
                <button class="bg-primary text-text px-8 py-2 rounded-md mx-auto" type="submit">{text.apply}</button>
            </div>
        </form>

        <form class="w-full flex flex-col mb-8" on:submit|preventDefault={saveSettings}>
            <p class="text-text italic text-center mb-2">{text.confirmPasswordHint}</p>
            <PasswordInput size={32} bind:value={confirmationPassword}/>
            <p class="{confirmationHint.color} italic text-center mb-2">{text[confirmationHint.key]}</p>
            <button class="bg-accent text-text px-16 py-4 rounded-xl mx-auto" type="submit">{text.save}</button>
        </form>
        <!---->
    </div>
</main>

<style>
    ._header {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
    }
    
    
    main {
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 3fr;
    }
</style>