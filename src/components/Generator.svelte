<script lang="ts">
    import { generate_password } from "password-generator";
    import PassOutput from "./PassOutput.svelte";
    import PassInput from "./PassInput.svelte";
    import PassButton from "./PassButton.svelte";
    import { storePassInput, storePassOutput, storePassLength, storePassChars, storeUserSalt } from "../store";
    import { onDestroy } from "svelte";
    import GeneratorSettings from "./GeneratorSettings.svelte";

    let value: string = "";
    let length: number = 0;
    let chars: string = "";
    let salt: string = "";
    let uid: string = "";

    function generate() {
        storePassOutput.set(
            (value) ? generate_password(uid+value+salt, chars, length) : ""
        );
    }

    let unsubscribeInput = storePassInput.subscribe(newInput => {
        value = newInput;
        generate();
    });

    let unsubscribeLength = storePassLength.subscribe(newLength => {
        length = newLength;
        generate();
    });

    let unsubscribeChars = storePassChars.subscribe(newChars => {
        chars = newChars;
        generate();
    });

    let unsubscribeSalt = storeUserSalt.subscribe(newSalt => {
        salt = newSalt;
        generate();
    });

    onDestroy(() => {
        unsubscribeInput();
        unsubscribeLength();
        unsubscribeChars();
        unsubscribeSalt();
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