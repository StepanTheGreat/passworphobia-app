<script lang="ts">
    import { generate_password } from "password-generator";
    import PassOutput from "./PassOutput.svelte";
    import PassInput from "./PassInput.svelte";
    import PassButton from "./PassButton.svelte";
    import { storePassInput, storePassOutput, storePassLength, storePassChars } from "../store";
    import { onDestroy } from "svelte";
    import GeneratorSettings from "./GeneratorSettings.svelte";

    let value: string = "";
    let length: number = 0;
    let chars: string = "";

    function generate() {
        storePassOutput.set(
            (value) ? generate_password(value, chars, length) : ""
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

    let unsubscribeChars = storePassChars.subscribe(newValue => {
        chars = newValue;
        generate();
    });

    onDestroy(() => {
        unsubscribeInput();
        unsubscribeLength();
        unsubscribeChars();
    });
</script>

<div class="w-fit h-fit m-auto flex flex-col items-center">
    <div class="m-auto flex flex-col items-center">
        <PassOutput size={42}></PassOutput>
        <PassInput  size={42}></PassInput>

        <div class="w-full flex flex-row">
            <div class="m-2 mr-auto">
                <PassButton type="copy"></PassButton>
                <PassButton type="delete"></PassButton>
            </div>
            <GeneratorSettings></GeneratorSettings>
        </div>
        
    </div>
    
</div>