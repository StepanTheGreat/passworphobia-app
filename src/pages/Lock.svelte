<script lang="ts">
    import LockPass from "../components/LockPass.svelte";
    import Title from "../components/Title.svelte";

    enum EntryType {
        New,
        Existing
    }
    let entryType: EntryType = EntryType.New;

    let pass1: string;
    let pass2: string;

    function onPassInput(e, index) {
        if (index == 0) {
            pass1 = e.detail.value;
        } else if (index == 1) {
            pass2 = e.detail.value;
        }
    }

    function newPass() {
        console.log(pass1);
        console.log(pass2);
    }   

    // function existingPass() {
    //     console.log(lockPass1);
    // }

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
            <button 
                class="block bg-accent rounded-md text-text mx-auto px-4 py-1"
                on:click={newPass}
            >Continue</button>
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