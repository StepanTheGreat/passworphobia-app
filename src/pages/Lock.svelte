<script lang="ts">
    import LockPass from "../components/LockPass.svelte";
import VisibilityButton from "../components/VisibilityButton.svelte";

    enum EntryType {
        New,
        Existing
    }
    let entryType: EntryType = EntryType.New;

</script>

<main class="w-full h-full flex flex-col">
    <div class="m-auto">
        {#if entryType == EntryType.Existing}
            <h2 class="text-text font-sen text-center mb-1">Enter the key to proceed</h2>
            <LockPass size={24}></LockPass>
        {:else if entryType == EntryType.New}
            <h2 class="text-text font-sen text-center">Register a new key to proceed</h2>
            
            <LockPass size={24}></LockPass>
            <LockPass size={24}></LockPass>
        {/if}
        <button class="block bg-accent rounded-md text-text mx-auto px-4 py-1">Continue</button>
    </div>
</main>