<script lang="ts">
    import { onDestroy } from "svelte";
    import LockPass from "../components/Lock/LockPass.svelte";
    import Title from "../components/Main/Title.svelte";
    import { fillTable, langTable } from "../lang";
    import { loadAccount, createAccount, hasAccount, loadSalt } from "../storage";
    import { AppState, appState, storeUserSalt } from "../store";
    import LangBtn from "../components/Main/LangBtn.svelte";

    enum EntryType {
        Loading,
        New,
        Existing
    };

    let entryType: EntryType = EntryType.New;
    hasAccount().then(has => entryType = (has)? EntryType.Existing : EntryType.New);

    let text: {[key: string]: string|string[]} = {
        "": "",
        enterOldPassword: "",
        enterNewPassword: "",
        notMatchingPasswords: "",
        emptyPassword: "",
        incorrectPassword: "",
        continue: "",
    };

    let unsubscribeLang = langTable.subscribe(newTable => text = fillTable(text, newTable));

    let pass1: string = "";
    let pass2: string = "";
    let passwordError: string = "";

    function onPassInput(e: any, index: number) {
        if (index == 0) {
            pass1 = e.detail.value;
        } else if (index == 1) {
            pass2 = e.detail.value;
        }
    }

    function openWithNewPass() {
        if (pass1 == pass2 && pass1 != "") {
            createAccount(pass1).then(salt => {
                appState.set(AppState.Main);
                storeUserSalt.set(salt);
            });
        } else if (pass1 != pass2) {
            passwordError = "notMatchingPasswords";
        } else {
            passwordError = "emptyPassword";
        }
    }   

    function openWithExistingPass() {
        loadAccount(pass1).then(() => {
            appState.set(AppState.Main);
        }).catch(() => {
            passwordError = "incorrectPassword";
        });
    }

    /** Will verify and submit passwords depending on the entry type*/
    function submitPasswords() {
        if (entryType == EntryType.New) {
            openWithNewPass()
        } else {
            openWithExistingPass()
        }  
    }

    onDestroy(() => {
        unsubscribeLang();
    })

</script>

<main class="w-full h-full grid gap-4">
    <div class="_header">
        <LangBtn></LangBtn>
        <Title></Title>
    </div>
    <form class="flex flex-col"
        on:keydown={e => {
            if (e.key == "Enter") {
                e.preventDefault()
                submitPasswords()
            }
        }}
    >
        <div class="w-fit h-fit m-auto">
            {#if entryType == EntryType.Existing}
                <h2 class="text-text text-xl font-sen text-center mb-4">{text.enterOldPassword}</h2>
                <LockPass size={24} on:passInput={e => onPassInput(e, 0)}></LockPass>
            {:else if entryType == EntryType.New}
                <h2 class="text-text text-xl font-sen text-center mb-4">{text.enterNewPassword}</h2>
                <LockPass size={24} on:passInput={e => onPassInput(e, 0)}></LockPass>
                <LockPass size={24} on:passInput={e => onPassInput(e, 1)}></LockPass>
            {/if}
            {#if entryType != EntryType.Loading}
            <h2 class="text-danger italic text-center mb-2">{text[passwordError]}</h2>
            <button 
                class="block bg-accent rounded-md text-text mx-auto px-4 py-1"
                on:click={submitPasswords}
            >{text.continue}</button>
            {/if}
        </div>
    </form>
</main>

<style>
    ._header {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
    }
  
    main {
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 3fr 1fr;
    }
  
    @media screen and (max-height: 384px) {
        main {
            grid-template-rows: 1fr 4fr;
        }
    }
</style>