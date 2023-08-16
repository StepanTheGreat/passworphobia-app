<script lang="ts">
    import iconVisible from "/src/assets/icons/visible.svg";
    import iconHidden from "/src/assets/icons/hidden.svg";

    export let callback: () => void;
    export let visible: boolean = false;
</script>

<button class="bg-white w-8 h-8 inline-block rounded-md" on:click={callback}>
    {#if visible}
        <img class="w-full f-full" src={iconVisible} alt="Visible">
    {:else} 
        <img class="w-full f-full" src={iconHidden} alt="Hidden">
    {/if}
</button>