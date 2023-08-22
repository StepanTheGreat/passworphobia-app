<script lang="ts">
    import { deleteAccount } from "../fire";

    const TIME: number = 100;
    const RATE: number = 0.6;
    const RATE_DELAY: number = 100;

    let disabled: boolean = true;
    let waiting: boolean = false;
    let leftTo: number = TIME;
    let interval = null;

    function deleteAcc() {
        deleteAccount();
    }

    function onBtnDown() {
        if (!disabled) {
            disabled = true;
            leftTo = TIME;
        };

        waiting = true;
        if (interval) {
            clearInterval(interval);
        }
        interval = setInterval(() => {
            if (leftTo > 0) {
                leftTo -= RATE;
            } else {
                disabled = false;
                waiting = false;
            }

            if (!waiting) {
                leftTo = TIME;
                clearInterval(interval);
                interval = null;
            }
        }, RATE_DELAY);
    }

    function onBtnUp() {
        if (!disabled) return;

        waiting = false;
        if (interval) {
            clearInterval(interval);
        }
        interval = setInterval(() => {
            if (leftTo < TIME) {
                leftTo += RATE*10;
            } else {
                leftTo = TIME;
                clearInterval(interval);
                interval = null;
            }
        }, RATE_DELAY);
    }
</script>

<div class="w-fit h-fit flex flex-row">
    <button 
        {disabled}
        class="{disabled? "bg-black text-text cursor-not-allowed" : "bg-secondary text-accent"} rounded-md px-8 py-4 m-2 mr-0 ml-12"
        on:click={deleteAcc}
    >
        Delete my account
    </button>
    <button 
        class="w-8 h-8 my-auto rounded-md fill-text m-2 {waiting? "cursor-progress":""}" 
        on:mousedown={onBtnDown} 
        on:mouseup={onBtnUp}
        on:mouseleave={onBtnUp} 
    >   
        <div class="w-8 h-8 flex flex-col">
            <svg class="w-full h-full m-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                {#if disabled}
                    <path d="M17 10.25h-.25V8a4.75 4.75 0 0 0-9.5 0v2.25H7A2.75 2.75 0 0 0 4.25 13v5A2.75 2.75 0 0 0 7 20.75h10A2.75 2.75 0 0 0 19.75 18v-5A2.75 2.75 0 0 0 17 10.25ZM8.75 8a3.25 3.25 0 0 1 6.5 0v2.25h-6.5Zm9.5 10A1.25 1.25 0 0 1 17 19.25H7A1.25 1.25 0 0 1 5.75 18v-5A1.25 1.25 0 0 1 7 11.75h10A1.25 1.25 0 0 1 18.25 13Z"/>
                {:else}
                    <path d="M16 3.25A4.75 4.75 0 0 0 11.25 8v2.25H6A2.75 2.75 0 0 0 3.25 13v5A2.75 2.75 0 0 0 6 20.75h7A2.75 2.75 0 0 0 15.75 18v-5A2.75 2.75 0 0 0 13 10.25h-.25V8a3.25 3.25 0 0 1 6.5 0a.75.75 0 0 0 1.5 0A4.75 4.75 0 0 0 16 3.25ZM14.25 13v5A1.25 1.25 0 0 1 13 19.25H6A1.25 1.25 0 0 1 4.75 18v-5A1.25 1.25 0 0 1 6 11.75h7A1.25 1.25 0 0 1 14.25 13Z"/>
                {/if}
            </svg>
            <div class="_line h-1 bg-accent" style="width: {100-leftTo}%"></div>
        </div>
    </button>
</div>

<style>
    ._line {
        width: 0%;
        transition: width 0.1s ease-in-out;
    }
</style>
