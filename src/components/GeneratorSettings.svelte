<script lang="ts">
    import { onDestroy } from "svelte";
    import { storePassLength, SIZE_FACTOR, DEFAULT, storePassChars, NUMBERS, SYMBOLS, LETTERS } from "../store";
    let hidden: boolean = true;

    const SIZE_HINTS: string[] = ["Tiny", "Small", "Medium", "Big", "Large"];
    let sizeValue: number = DEFAULT;

    function onChange() {
        storePassLength.set(sizeValue*SIZE_FACTOR);
    }

    let chars: string = "";
    let numbersOn: boolean = true;
    let symbolsOn: boolean = false;

    function turnSet(which: string) {
        if (which == "numbers") {
            numbersOn = !numbersOn;
        } else if (which == "symbols") {
            symbolsOn = !symbolsOn;
        }

        storePassChars.set(
            LETTERS + (numbersOn? NUMBERS : "") + (symbolsOn? SYMBOLS : "")
        );
    }

    let unsubscribe = storePassChars.subscribe(newChars => {
        chars = newChars;
        numbersOn = chars.includes(NUMBERS);
        symbolsOn = chars.includes(SYMBOLS);
    });

    onDestroy(() => unsubscribe());    
</script>

<div>
    <button class="bg-primary w-16 h-16 inline-block rounded-md mt-2" on:click={() => hidden = !hidden}>
        <svg class="fill-secondary w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M19 8.25h-7a.75.75 0 0 1 0-1.5h7a.75.75 0 0 1 0 1.5Zm-9 0H5a.75.75 0 0 1 0-1.5h5a.75.75 0 0 1 0 1.5Z"/>
            <path d="M10 9.75A.76.76 0 0 1 9.25 9V6a.75.75 0 0 1 1.5 0v3a.76.76 0 0 1-.75.75Zm9 7.5h-7a.75.75 0 0 1 0-1.5h7a.75.75 0 0 1 0 1.5Zm-9 0H5a.75.75 0 0 1 0-1.5h5a.75.75 0 0 1 0 1.5Z"/>
            <path d="M10 18.75a.76.76 0 0 1-.75-.75v-3a.75.75 0 0 1 1.5 0v3a.76.76 0 0 1-.75.75Zm9-6h-3a.75.75 0 0 1 0-1.5h3a.75.75 0 0 1 0 1.5Zm-5 0H5a.75.75 0 0 1 0-1.5h9a.75.75 0 0 1 0 1.5Z"/>
            <path d="M14 14.25a.76.76 0 0 1-.75-.75v-3a.75.75 0 0 1 1.5 0v3a.76.76 0 0 1-.75.75Z"/>
        </svg>
    </button>

    {#if !hidden}
        <div class="absolute bg-secondary rounded-lg w-64 -translate-x-24 flex flex-col p-2">
            <select class="h-8 mb-4 rounded-md text-text bg-primary" bind:value={sizeValue} on:change={onChange}>
                {#each SIZE_HINTS as hint, index}
                    <option class=""
                        value={index+1}
                        selected={index+1 == DEFAULT}
                    >{hint} ({(index+1)*SIZE_FACTOR})
                    </option>
                {/each}
            </select>

            <div class="flex flex-row gap-1 mb-1">
                <input class="w-6 h-6" bind:checked={numbersOn} type="checkbox" on:input={() => turnSet("numbers")}>
                <p class="inline-block text-text">Numbers</p>
            </div>
            <div class="flex flex-row gap-1">
                <input class="w-6 h-6" bind:checked={symbolsOn} type="checkbox" on:input={() => turnSet("symbols")}>
                <p class="inline-block text-text">Special characters</p>
            </div>
        </div>
    {/if}
</div>