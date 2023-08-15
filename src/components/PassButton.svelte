<script lang="ts">
    import { onDestroy } from "svelte";
    import { storePassInput, storePassOutput } from "../store";

    export let type: string;
    let passOutput: string = "";
    let action: () => void;

    let unsubscribe = storePassOutput.subscribe(newValue => passOutput = newValue);

    if (type == "copy") {
        action = () => {
            navigator.clipboard.writeText(passOutput);
        };
    } else if (type == "delete") {
        action = () => {
            storePassOutput.set("");
            storePassInput.set("");
            navigator.clipboard.writeText("");
        };
    } else {
        action = () => {};
    }

    onDestroy(() => unsubscribe());
</script>

<button class="bg-white w-16 h-16 inline-block rounded-md" on:click={action}>
    {#if type == "copy"}
        <img class="w-full f-full" src="./copy.svg" alt="Copy">
    {:else if type == "delete"}
        <img class="w-full f-full" src="./delete.svg" alt="Delete">
    {/if}
</button>