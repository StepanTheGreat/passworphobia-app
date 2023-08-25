<script lang="ts">
    import { langTable } from "../lang";
    import { storePassInput } from "../store";
    import VisibilityButton from "./VisibilityButton.svelte";
    import { onDestroy } from "svelte";

    export let size: number = 14;

    let inputPlaceholderText: string;

    let unsubscribeLang = langTable.subscribe(newTable => {
        inputPlaceholderText = newTable.generator.input_placeholder;
    });

    let visible: boolean = false;
    let inputValue: string = "";

    function onInput(e: Event) {
        inputValue = (e.target as HTMLInputElement).value;
        storePassInput.set(inputValue);
    }

    let unsubscribe = storePassInput.subscribe(newValue => inputValue = newValue);
    onDestroy(() => {
        unsubscribe();
        unsubscribeLang();
    });

</script>

<div class="flex flex-row m-1 ">
    <input 
        {size}
        type={visible ? "text" : "password"} 
        value={inputValue}
        placeholder={inputPlaceholderText}
        on:input={(e) => onInput(e)}
        class="text-center rounded-md mx-1 bg-primary text-text pr-8 pl-1"
    />
    <VisibilityButton {visible} callback={() => visible = !visible}></VisibilityButton>
</div>