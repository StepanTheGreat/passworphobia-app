<script lang="ts">
    import { storePassLength, SIZE_FACTOR, DEFAULT } from "../store";

    const sizeHints: string[] = ["Tiny", "Small", "Medium", "Big", "Large"];

    let value: number = DEFAULT;

    function onChange() {
        storePassLength.set(value*SIZE_FACTOR);
    }
</script>

<div class="flex flex-col items-center">
    <select bind:value={value} on:change={onChange}>
        {#each sizeHints as hint, index}
            <option 
                value={index+1}
                selected={index+1 == DEFAULT}
            >{hint} ({(index+1)*SIZE_FACTOR})
            </option>
        {/each}
    </select>
</div>