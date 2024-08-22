<script lang="ts">
    import { onDestroy } from "svelte";
    import { storePassLength, DEFAULT_SIZE_INDEX, PASS_SIZES, storePassChars, NUMBERS, SYMBOLS, LETTERS } from "../../store";
    import { fillTable, langTable } from "../../lang";

    let hidden: boolean = true;

    let text: {[key: string]: string|string[]} = {
        "":"",
        size: "",
        characters: "",
        sizeHint: [],
        settingsNumbers: "",
        settingsScharacters: ""
    };
    
    let sizeIndex: number = DEFAULT_SIZE_INDEX;

    let unsubscribeLang = langTable.subscribe(newTable => text = fillTable(text, newTable));

    function onChange() {
        storePassLength.set(PASS_SIZES[sizeIndex]);
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

    onDestroy(() => {
        unsubscribe();
        unsubscribeLang();
    });    
</script>

<div>
    <button class="w-16 h-16 inline-block rounded-md mt-2" on:click={() => hidden = !hidden}>
        <svg class="fill-text w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M19 8.25h-7a.75.75 0 0 1 0-1.5h7a.75.75 0 0 1 0 1.5Zm-9 0H5a.75.75 0 0 1 0-1.5h5a.75.75 0 0 1 0 1.5Z"/>
            <path d="M10 9.75A.76.76 0 0 1 9.25 9V6a.75.75 0 0 1 1.5 0v3a.76.76 0 0 1-.75.75Zm9 7.5h-7a.75.75 0 0 1 0-1.5h7a.75.75 0 0 1 0 1.5Zm-9 0H5a.75.75 0 0 1 0-1.5h5a.75.75 0 0 1 0 1.5Z"/>
            <path d="M10 18.75a.76.76 0 0 1-.75-.75v-3a.75.75 0 0 1 1.5 0v3a.76.76 0 0 1-.75.75Zm9-6h-3a.75.75 0 0 1 0-1.5h3a.75.75 0 0 1 0 1.5Zm-5 0H5a.75.75 0 0 1 0-1.5h9a.75.75 0 0 1 0 1.5Z"/>
            <path d="M14 14.25a.76.76 0 0 1-.75-.75v-3a.75.75 0 0 1 1.5 0v3a.76.76 0 0 1-.75.75Z"/>
        </svg>
    </button>

    {#if !hidden}
        <div class="absolute bg-secondary rounded-lg w-64 -translate-x-24 flex flex-col p-2">
            <p class="text-text mb-1">{text.size}</p>
            <select class="h-8 mb-4 rounded-md px-1 appearance-none text-text bg-primary" bind:value={sizeIndex} on:change={onChange}>
                {#each PASS_SIZES as size, index}
                    <option
                        value={index}
                        selected={index == DEFAULT_SIZE_INDEX}
                    >{text.sizeHint[index]} ({size})</option>
                {/each}
            </select>
            <p class="text-text mb-2">{text.characters}</p>
            <div class="flex flex-row gap-1 mb-2">
                <input class="w-6 h-6 accent-accent bg-text" bind:checked={numbersOn} type="checkbox" on:input={() => turnSet("numbers")}>
                <p class="inline-block text-text">{text.settingsNumbers}</p>
            </div>
            <div class="flex flex-row gap-1">
                <input class="w-6 h-6 accent-accent bg-text" bind:checked={symbolsOn} type="checkbox" on:input={() => turnSet("symbols")}>
                <p class="inline-block text-text">{text.settingsScharacters}</p>
            </div>
        </div>
    {/if}
</div>