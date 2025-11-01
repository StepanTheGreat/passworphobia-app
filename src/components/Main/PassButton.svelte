<script lang="ts">
    export let onclick: () => void;
</script>

<button class="w-14 h-14 inline-block rounded-md" on:click={onclick} type="button">
    <svg class="w-full f-full fill-text" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <slot></slot>
    </svg>
</button>