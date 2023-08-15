<script lang="ts">
    import { storePassInput } from "../store";
    import VisibilityButton from "./VisibilityButton.svelte";
    import { onDestroy } from "svelte";

    export let size: number = 14;
    let visible: boolean = false;
    let inputValue: string = "";

    function onInput(e: Event) {
        inputValue = (e.target as HTMLInputElement).value;
        storePassInput.set(inputValue);
    }

    let unsubscribe = storePassInput.subscribe(newValue => inputValue = newValue);
    onDestroy(() => unsubscribe());

</script>

<div class="flex flex-row m-1 ">
    <input 
        {size}
        type={visible ? "text" : "password"} 
        value={inputValue}
        on:input={(e) => onInput(e)}
        class="text-center rounded-md mx-1"
    />
    <VisibilityButton {visible} callback={() => visible = !visible}></VisibilityButton>
</div>