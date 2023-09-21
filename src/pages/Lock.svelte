<script lang="ts">
    import LockPass from "../components/Lock/LockPass.svelte";
    import Title from "../components/Main/Title.svelte";
    import { loadAccount, createAccount, hasAccount } from "../storage";
    import { AppState, appState } from "../store";

    enum EntryType {
        Loading,
        New,
        Existing
    }
    let entryType: EntryType = EntryType.Loading;
    hasAccount().then(has => entryType = (has)? EntryType.Existing : EntryType.New);

    let pass1: string;
    let pass2: string;

    function onPassInput(e: any, index: number) {
        if (index == 0) {
            pass1 = e.detail.value;
        } else if (index == 1) {
            pass2 = e.detail.value;
        }
    }

    function openWithNewPass() {
        if (pass1 == pass2) {
            createAccount(pass1).then(() => {
                appState.set(AppState.Main);
            });
            
        }
    }   

    function openWithExistingPass() {
        loadAccount(pass1).then(() => {
            appState.set(AppState.Main);
        });
    }

</script>

<main class="w-full h-full grid gap-4">
    <div class="_header">
        <Title></Title>
    </div>
    <div class="flex flex-col">
        <div class="w-fit h-fit m-auto">
            {#if entryType == EntryType.Existing}
                <h2 class="text-text text-xl font-sen text-center mb-4">Enter the key to proceed</h2>
                <LockPass size={24} on:passInput={e => onPassInput(e, 0)}></LockPass>
            {:else if entryType == EntryType.New}
                <h2 class="text-text text-xl font-sen text-center mb-4">Register a new key to proceed</h2>
                <LockPass size={24} on:passInput={e => onPassInput(e, 0)}></LockPass>
                <LockPass size={24} on:passInput={e => onPassInput(e, 1)}></LockPass>
            {/if}
            {#if entryType != EntryType.Loading}
            <button 
                class="block bg-accent rounded-md text-text mx-auto px-4 py-1"
                on:click={() => (entryType == EntryType.New)? openWithNewPass(): openWithExistingPass() }
            >Continue</button>
            {/if}
        </div>
    </div>
</main>

<style>
    ._header {
        display: grid;
        grid-template-columns: 1fr;
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