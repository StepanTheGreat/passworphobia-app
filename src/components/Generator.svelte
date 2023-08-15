<script lang="ts">
    import { generate_password } from "password-generator";

    const chars = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0123456789";

    let phrase = "";
    let pass = "";
    function onInput() {
        pass = (phrase) ? generate_password(phrase, chars, 40) : "";
    }
</script>

<div class="bg-purple-700 mx-auto">
    <input type="password" bind:value={phrase} on:input={onInput}/>
    <p>{pass}</p>
    <div>
        <button></button>
        <button></button>
    </div>
</div>