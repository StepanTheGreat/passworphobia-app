<script lang="ts">
    import { storePassLength, SIZE_FACTOR, DEFAULT } from "../store";

    const sizeHints: string[] = ["Small", "Medium", "Big", "Large", "Gigantic"];

    let size: number = DEFAULT;

    function onInput(e: Event) {
        size = parseInt((e.target as HTMLInputElement).value);
        storePassLength.set(size*SIZE_FACTOR);
    }

</script>

<div class="flex flex-col items-center">
    <!-- <input 
        type="range" 
        min="1" max="{sizeHints.length}" 
        step="1" 
        bind:value={size} 
        on:input={onInput}
        class="bg-blue-500 appearance-none rounded-lg cursor-pointer"
    />
    <p class="text-text font-bold">
        {sizeHints[size-1]} ({size*SIZE_FACTOR})
    </p> -->
    <select>
        {#each sizeHints as hint, index}
            <option 
                value={index+1}
                selected={index+1 == DEFAULT}
            >{hint} ({(index+1)*SIZE_FACTOR})
            </option>
        {/each}
    </select>
</div>