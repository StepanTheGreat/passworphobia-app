<script lang="ts">
    import PassButton from "./PassButton.svelte";
    import { DEFAULT_PASSWORD_SIZE, storeUserSalt, DEFAULT_SYMBOLS, DEFAULT_NO_SALT } from "../../store";
    import { onDestroy } from "svelte";
    import GeneratorSettings from "./GeneratorSettings.svelte";
    import PasswordInput from "../PasswordInput.svelte";
    import { genPassword } from "../../password";
    
    import { writeText } from "@tauri-apps/plugin-clipboard-manager"
    import { fillTable, langTable } from "../../lang";

    interface GeneratorValues {
        passwordChars: string,
        passwordLength: number,
        noSalt: boolean
    }
    
    let genSettings: GeneratorValues = {
        passwordLength: DEFAULT_PASSWORD_SIZE,
        passwordChars: DEFAULT_SYMBOLS,
        noSalt: DEFAULT_NO_SALT
    };

    let passwordSalt: string = "";

    let outputPassword: string = "";
    let inputPassword: string = "";

    $: {
        if (inputPassword == "") {
            outputPassword = "";
        } else {
            outputPassword = genPassword(
                inputPassword, // Our input pass-phrase
                (genSettings.noSalt ? "" : passwordSalt), // Salt (if not disabled) 
                genSettings.passwordChars, // Characters to generate with
                genSettings.passwordLength // The expected length
            );
        }
    }

    let text: {[key: string]: string} = {
        "":"",
        outputPlaceholder: "",
        inputPlaceholder: ""
    };

    let unsubscribeLang = langTable.subscribe(newTable => {
        text = fillTable(text, newTable) as {[key: string]: string};
    });

    let unsubscribeSalt = storeUserSalt.subscribe(newSalt => {
        passwordSalt = newSalt;
    });

    function clearPassword() {
        inputPassword = "";
        writeText(" ");
    }

    function copyPassword() {
        writeText(outputPassword);
    }

    onDestroy(() => {
        unsubscribeLang();
        unsubscribeSalt();
    });
</script>

<div class="w-fit h-fit m-auto flex flex-col items-center">
    <div class="m-auto flex flex-col items-center">
        <PasswordInput placeholder={text.outputPlaceholder} bind:value={outputPassword} size={42} disabled/>
        <PasswordInput placeholder={text.inputPlaceholder} bind:value={inputPassword}  size={42}/>

        <div class="w-full flex flex-row">
            <div class="m-2 mr-auto">
                <PassButton onclick={copyPassword}>
                    <path d="M19.53 8L14 2.47a.75.75 0 0 0-.53-.22H11A2.75 2.75 0 0 0 8.25 5v1.25H7A2.75 2.75 0 0 0 4.25 9v10A2.75 2.75 0 0 0 7 21.75h7A2.75 2.75 0 0 0 16.75 19v-1.25H17A2.75 2.75 0 0 0 19.75 15V8.5a.75.75 0 0 0-.22-.5Zm-5.28-3.19l2.94 2.94h-2.94Zm1 14.19A1.25 1.25 0 0 1 14 20.25H7A1.25 1.25 0 0 1 5.75 19V9A1.25 1.25 0 0 1 7 7.75h1.25V15A2.75 2.75 0 0 0 11 17.75h4.25ZM17 16.25h-6A1.25 1.25 0 0 1 9.75 15V5A1.25 1.25 0 0 1 11 3.75h1.75V8.5a.76.76 0 0 0 .75.75h4.75V15A1.25 1.25 0 0 1 17 16.25Z"/>
                </PassButton>

                <PassButton onclick={clearPassword}>
                    <path d="M20 8.7H4a.75.75 0 1 1 0-1.5h16a.75.75 0 0 1 0 1.5Z"/>
                    <path d="M16.44 20.75H7.56A2.4 2.4 0 0 1 5 18.49V8a.75.75 0 0 1 1.5 0v10.49c0 .41.47.76 1 .76h8.88c.56 0 1-.35 1-.76V8A.75.75 0 1 1 19 8v10.49a2.4 2.4 0 0 1-2.56 2.26Zm.12-13a.74.74 0 0 1-.75-.75V5.51c0-.41-.48-.76-1-.76H9.22c-.55 0-1 .35-1 .76V7a.75.75 0 1 1-1.5 0V5.51a2.41 2.41 0 0 1 2.5-2.26h5.56a2.41 2.41 0 0 1 2.53 2.26V7a.75.75 0 0 1-.75.76Z"/>
                    <path d="M10.22 17a.76.76 0 0 1-.75-.75v-4.53a.75.75 0 0 1 1.5 0v4.52a.75.75 0 0 1-.75.76Zm3.56 0a.75.75 0 0 1-.75-.75v-4.53a.75.75 0 0 1 1.5 0v4.52a.76.76 0 0 1-.75.76Z"/>
                </PassButton>
            </div>
            <GeneratorSettings bind:value={genSettings}></GeneratorSettings>
        </div>
    </div>
    
</div>