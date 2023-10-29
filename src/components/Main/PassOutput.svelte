<script lang="ts">
    import { langTable } from "../../lang";
    import { storePassOutput } from "../../store";
    import VisibilityButton from "../VisibilityButton.svelte";
    import { onDestroy } from "svelte";

    export let size: number = 14;

    let outputPlaceholderText: string;

    let unsubscribeLang = langTable.subscribe(newTable => {
        outputPlaceholderText = newTable.generator.outputPlaceholder;
    });

    let visible: boolean = false;
    let outputValue: string = "";

    let unsubscribe = storePassOutput.subscribe(newValue => outputValue = newValue);
    onDestroy(() => {
        unsubscribeLang();
        unsubscribe();
    });
</script>

<div class="flex flex-row m-1 mb-6">
    <input 
        {size}
        type={visible ? "text" : "password"} 
        value={outputValue}
        disabled
        placeholder={outputPlaceholderText}
        class="text-center text-text rounded-md mx-1 bg-primary-dark pr-8 pl-1"
    />
    <VisibilityButton {visible} callback={() => visible = !visible}></VisibilityButton>
</div>