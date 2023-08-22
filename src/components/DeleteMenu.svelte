<script lang="ts">
    import { deleteAccount } from "../fire";

    const TIME: number = 2;
    const RATE: number = 20;

    let disabled: boolean = true;
    let waiting: boolean = false;
    let leftTo: number = TIME;
    let interval = null;

    function deleteAcc() {
        console.log("Deleting");
        deleteAccount();
    }

    function onBtnDown() {
        if (!disabled) {
            disabled = true;
            leftTo = TIME;
        };
        console.log("Down!");

        waiting = true;
        if (interval) {
            clearInterval(interval);
        }
        interval = setInterval(() => {
            if (leftTo > 0) {
                leftTo -= RATE/1000;
            } else {
                disabled = false;
                waiting = false;
            }

            if (!waiting) {
                leftTo = TIME;
                clearInterval(interval);
                interval = null;
            }
        }, RATE);
    }

    function onBtnUp() {
        if (!disabled) return;
        console.log("Up!");

        waiting = false;
        if (interval) {
            clearInterval(interval);
        }
        interval = setInterval(() => {
            if (leftTo < TIME) {
                leftTo += RATE/100;
            } else {
                leftTo = TIME;
                clearInterval(interval);
                interval = null;
            }
        }, RATE);
    }
</script>

<div class="w-fit h-fit flex flex-row">
    <button 
        {disabled} 
        class="{disabled? "bg-red-800" : "bg-red-600"} rounded-md px-8 py-4 m-2"
        on:click={deleteAcc}
    >
        Delete my account
    </button>
    <button 
        class="w-8 h-8 my-auto rounded-md fill-white m-2" 
        on:mousedown={onBtnDown} 
        on:mouseup={onBtnUp}
        on:mouseleave={onBtnUp} 
    >   
        <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            {#if disabled}
                <path d="M17 10.25h-.25V8a4.75 4.75 0 0 0-9.5 0v2.25H7A2.75 2.75 0 0 0 4.25 13v5A2.75 2.75 0 0 0 7 20.75h10A2.75 2.75 0 0 0 19.75 18v-5A2.75 2.75 0 0 0 17 10.25ZM8.75 8a3.25 3.25 0 0 1 6.5 0v2.25h-6.5Zm9.5 10A1.25 1.25 0 0 1 17 19.25H7A1.25 1.25 0 0 1 5.75 18v-5A1.25 1.25 0 0 1 7 11.75h10A1.25 1.25 0 0 1 18.25 13Z"/>
            {:else}
                <path d="M16 3.25A4.75 4.75 0 0 0 11.25 8v2.25H6A2.75 2.75 0 0 0 3.25 13v5A2.75 2.75 0 0 0 6 20.75h7A2.75 2.75 0 0 0 15.75 18v-5A2.75 2.75 0 0 0 13 10.25h-.25V8a3.25 3.25 0 0 1 6.5 0a.75.75 0 0 0 1.5 0A4.75 4.75 0 0 0 16 3.25ZM14.25 13v5A1.25 1.25 0 0 1 13 19.25H6A1.25 1.25 0 0 1 4.75 18v-5A1.25 1.25 0 0 1 6 11.75h7A1.25 1.25 0 0 1 14.25 13Z"/>
            {/if}
            <circle cx="12" cy="12" r="11" fill="none" stroke="white" stroke-width="2">
                <animate attributeName="stroke-dasharray" dur="0.5" to="{(TIME-leftTo)/TIME*72} 502" repeatCount="1" fill="freeze" />
            </circle>
        </svg>
    </button>
</div>
