<script lang="ts">
    export let callback: () => void;
    export let visible: boolean = false;
</script>

<button class="bg-white w-8 h-8 inline-block rounded-md" on:click={callback}>
    {#if visible}
        <img class="w-full f-full" src="./visible.svg" alt="Visible">
    {:else} 
        <img class="w-full f-full" src="./hidden.svg" alt="Hidden">
    {/if}
</button>