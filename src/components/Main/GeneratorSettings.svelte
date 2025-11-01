<script lang="ts">
    import { onDestroy } from "svelte";
    import { PASS_SIZES, NUMBERS, SYMBOLS, LETTERS, DEFAULT_SYMBOLS, DEFAULT_PASSWORD_SIZE } from "../../store";
    import { fillTable, langTable } from "../../lang";

    interface GeneratorValues {
        passwordChars: string,
        passwordLength: number
    }

    export let value: GeneratorValues = {
        passwordChars: DEFAULT_SYMBOLS,
        passwordLength: DEFAULT_PASSWORD_SIZE
    };

    let hidden: boolean = true;

    let text: {[key: string]: string|string[]} = {
        "":"",
        size: "",
        characters: "",
        sizeHint: [],
        settingsNumbers: "",
        settingsScharacters: ""
    };


    let unsubscribeLang = langTable.subscribe(newTable => text = fillTable(text, newTable));

    let numbersOn: boolean = true;
    let symbolsOn: boolean = false;

    $: value.passwordChars = LETTERS + (numbersOn ? NUMBERS : "") + (symbolsOn ? SYMBOLS : "");

    onDestroy(() => {
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

            <select class="h-8 mb-4 rounded-md px-1 appearance-none text-text bg-primary" bind:value={value.passwordLength}>
                {#each PASS_SIZES as size, index}
                    <option value={size} selected={size == DEFAULT_PASSWORD_SIZE}>{text.sizeHint[index]} ({size})</option>
                {/each}
            </select>

            <p class="text-text mb-2">{text.characters}</p>

            <div class="flex flex-row gap-1 mb-2">
                <input class="w-6 h-6 accent-accent bg-text" bind:checked={numbersOn} type="checkbox">
                <p class="inline-block text-text">{text.settingsNumbers}</p>
            </div>

            <div class="flex flex-row gap-1">
                <input class="w-6 h-6 accent-accent bg-text" bind:checked={symbolsOn} type="checkbox">
                <p class="inline-block text-text">{text.settingsScharacters}</p>
            </div>
        </div>
    {/if}
</div>