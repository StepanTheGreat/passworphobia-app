<script lang="ts">
    import { generate_password } from "password-generator";
    import PassOutput from "./PassOutput.svelte";
    import PassInput from "./PassInput.svelte";
    import PassButton from "./PassButton.svelte";
    import { storePassInput, storePassOutput, CHARS, storePassLength } from "../store";
    import { onDestroy } from "svelte";
    import SizeController from "./SizeController.svelte";

    let value: string = "";
    let length: number = 0;

    function generate() {
        storePassOutput.set(
            (value) ? generate_password(value, CHARS, length) : ""
        );
    }

    let unsubscribeInput = storePassInput.subscribe(newValue => {
        value = newValue;
        generate();
    });

    let unsubscribeLength = storePassLength.subscribe(newValue => {
        length = newValue;
        generate();
    });

    onDestroy(() => {
        unsubscribeInput();
        unsubscribeLength();
    });
</script>

<div class="w-fit h-fit m-auto flex flex-col items-center">
    <div class="m-auto flex flex-col items-center">
        <PassOutput size={42}></PassOutput>
        <PassInput  size={42}></PassInput>

        <div class="m-1">
            <PassButton type="copy"></PassButton>
            <PassButton type="delete"></PassButton>
        </div>
        <SizeController></SizeController>
    </div>
    
</div>