<script lang="ts">
    let hidden: boolean = true;

</script>

<div class="flex">
    <button class="bg-primary w-16 h-16 inline-block rounded-md m-auto mt-2 mr-2" on:click={() => hidden = !hidden}>
        <svg class="w-full h-full fill-secondary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M15 14.75a5.74 5.74 0 0 1-4.07-1.68A5.77 5.77 0 1 1 15 14.75Zm0-10A4.25 4.25 0 0 0 12 12a4.25 4.25 0 1 0 3-7.25Z"/>
            <path d="M4.5 20.25A.74.74 0 0 1 4 20a.75.75 0 0 1 0-1l6.46-6.47a.75.75 0 1 1 1.06 1.07L5 20a.74.74 0 0 1-.5.25Z"/>
            <path d="M8 20.75a.74.74 0 0 1-.53-.22l-2-2a.75.75 0 0 1 1.06-1.06l2 2a.75.75 0 0 1 0 1.06a.74.74 0 0 1-.53.22Zm2-2a.74.74 0 0 1-.53-.22l-2-2a.75.75 0 1 1 1.06-1.06l2 2a.75.75 0 0 1 0 1.06a.74.74 0 0 1-.53.22Z"/>
        </svg>
    </button>
    {#if !hidden}
        <div class="absolute left-0 w-full h-full flex pointer-events-none">
            <div class="m-auto w-96 h-96 bg-primary rounded-xl">

            </div>
        </div>
    {/if}
</div>