<script lang="ts">
    import iconVisible from "/src/assets/icons/visible.svg";
    import iconHidden from "/src/assets/icons/hidden.svg";

    export let callback: () => void;
    export let visible: boolean = false;
</script>

<button class="w-8 h-8 inline-block rounded-md -ml-9" on:click={callback}>
    {#if visible}
        <svg class="w-full f-full fill-text" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12 18.75c-5.83 0-8.57-6.19-8.69-6.45a.78.78 0 0 1 0-.6c.12-.26 2.86-6.45 8.69-6.45s8.57 6.19 8.69 6.45a.78.78 0 0 1 0 .6c-.12.26-2.86 6.45-8.69 6.45ZM4.83 12c.59 1.15 3 5.25 7.17 5.25s6.58-4.1 7.17-5.25c-.59-1.15-3-5.25-7.17-5.25S5.42 10.85 4.83 12Z"/>
            <path d="M12 15.25A3.25 3.25 0 1 1 15.25 12A3.26 3.26 0 0 1 12 15.25Zm0-5A1.75 1.75 0 1 0 13.75 12A1.76 1.76 0 0 0 12 10.25Z"/>
        </svg>
    {:else} 
        <svg class="w-full f-full fill-text" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M20.69 11.7c-.12-.26-2.86-6.45-8.69-6.45a7.67 7.67 0 0 0-1.66.18a.75.75 0 0 0 .32 1.46A6.62 6.62 0 0 1 12 6.75c4.18 0 6.58 4.1 7.17 5.25a13.28 13.28 0 0 1-1.26 2a.75.75 0 0 0 .59 1.21a.75.75 0 0 0 .59-.29a13.42 13.42 0 0 0 1.6-2.59a.78.78 0 0 0 0-.63ZM6.53 5.47a.75.75 0 0 0-1.06 1.06l.92.92a13.16 13.16 0 0 0-3.08 4.26a.76.76 0 0 0 0 .59c.12.26 2.86 6.45 8.69 6.45a7.93 7.93 0 0 0 4.39-1.3l1.08 1.08a.75.75 0 0 0 1.06 0a.75.75 0 0 0 0-1.06Zm3.83 6l2.21 2.22a1.81 1.81 0 0 1-1.81-.4a1.74 1.74 0 0 1-.4-1.87ZM12 17.25c-4.19 0-6.58-4.11-7.17-5.25a12 12 0 0 1 2.62-3.49l1.79 1.79a3.24 3.24 0 0 0 4.46 4.46l1.61 1.61a6.5 6.5 0 0 1-3.31.88Z"/>
        </svg>
    {/if}
</button>