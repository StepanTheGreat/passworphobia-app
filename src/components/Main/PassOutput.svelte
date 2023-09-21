<script lang="ts">
    import { storePassOutput } from "../../store";
    import VisibilityButton from "../VisibilityButton.svelte";
    import { onDestroy } from "svelte";

    export let size: number = 14;
    let visible: boolean = false;
    let outputValue: string = "";

    let unsubscribe = storePassOutput.subscribe(newValue => outputValue = newValue);
    onDestroy(() => unsubscribe());
</script>

<div class="flex flex-row m-1 mb-6">
    <input 
        {size}
        type={visible ? "text" : "password"} 
        value={outputValue}
        disabled
        class="text-center text-text rounded-md mx-1 bg-primary-dark pr-8 pl-1"
    />
    <VisibilityButton {visible} callback={() => visible = !visible}></VisibilityButton>
</div>