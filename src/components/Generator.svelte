<script lang="ts">
    import { generate_password } from "password-generator";
    import PassOutput from "./PassOutput.svelte";
    import PassInput from "./PassInput.svelte";
    import { storePassInput, storePassOutput } from "../store";
    import PassButton from "./PassButton.svelte";
    import { onDestroy } from "svelte";

    const chars = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0123456789";
    const length = 40;

    let unsubscribe = storePassInput.subscribe(newValue => {
        storePassOutput.set(
            (newValue) ? generate_password(newValue, chars, length) : ""
        );
    });

    onDestroy(() => unsubscribe());
</script>

<div class="w-3/5 h-3/5 mx-auto flex flex-col items-center">
    <div class="m-auto flex flex-col items-center">
        <PassOutput size={length}></PassOutput>
        <PassInput size={length}></PassInput>

        <div class="m-1">
            <PassButton type="copy"></PassButton>
            <PassButton type="delete"></PassButton>
        </div>
    </div>
    
</div>