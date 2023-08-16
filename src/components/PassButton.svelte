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

<button class="bg-primary w-16 h-16 inline-block rounded-md" on:click={action}>
    {#if type == "copy"}
        <svg class="w-full f-full fill-secondary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M19.53 8L14 2.47a.75.75 0 0 0-.53-.22H11A2.75 2.75 0 0 0 8.25 5v1.25H7A2.75 2.75 0 0 0 4.25 9v10A2.75 2.75 0 0 0 7 21.75h7A2.75 2.75 0 0 0 16.75 19v-1.25H17A2.75 2.75 0 0 0 19.75 15V8.5a.75.75 0 0 0-.22-.5Zm-5.28-3.19l2.94 2.94h-2.94Zm1 14.19A1.25 1.25 0 0 1 14 20.25H7A1.25 1.25 0 0 1 5.75 19V9A1.25 1.25 0 0 1 7 7.75h1.25V15A2.75 2.75 0 0 0 11 17.75h4.25ZM17 16.25h-6A1.25 1.25 0 0 1 9.75 15V5A1.25 1.25 0 0 1 11 3.75h1.75V8.5a.76.76 0 0 0 .75.75h4.75V15A1.25 1.25 0 0 1 17 16.25Z"/>
        </svg>
    {:else if type == "delete"}
        <svg class="w-full f-full fill-secondary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M20 8.7H4a.75.75 0 1 1 0-1.5h16a.75.75 0 0 1 0 1.5Z"/>
            <path d="M16.44 20.75H7.56A2.4 2.4 0 0 1 5 18.49V8a.75.75 0 0 1 1.5 0v10.49c0 .41.47.76 1 .76h8.88c.56 0 1-.35 1-.76V8A.75.75 0 1 1 19 8v10.49a2.4 2.4 0 0 1-2.56 2.26Zm.12-13a.74.74 0 0 1-.75-.75V5.51c0-.41-.48-.76-1-.76H9.22c-.55 0-1 .35-1 .76V7a.75.75 0 1 1-1.5 0V5.51a2.41 2.41 0 0 1 2.5-2.26h5.56a2.41 2.41 0 0 1 2.53 2.26V7a.75.75 0 0 1-.75.76Z"/>
            <path d="M10.22 17a.76.76 0 0 1-.75-.75v-4.53a.75.75 0 0 1 1.5 0v4.52a.75.75 0 0 1-.75.76Zm3.56 0a.75.75 0 0 1-.75-.75v-4.53a.75.75 0 0 1 1.5 0v4.52a.76.76 0 0 1-.75.76Z"/>
        </svg>
    {/if}
</button>