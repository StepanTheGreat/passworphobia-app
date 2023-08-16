<script lang="ts">
    import { storePassLength } from "../store";

    let numbers: boolean = true;
    let schars: boolean = false;

    function onChange() {

    }
</script>

<div class="flex flex-col gap-1">
    <div class="flex flex-row gap-1">
        <input type="checkbox" class="w-6 h-6">
        <p class="inline-block text-text">Numbers</p>
    </div>
    <div class="flex flex-row gap-1">
        <input type="checkbox" class="w-6 h-6">
        <p class="inline-block text-text">Special characters</p>
    </div>
</div>