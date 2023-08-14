<script lang="ts">
  import { generate_password } from "password-generator";

  const chars = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0123456789";

  let phrase = "";
  let pass = "";
  function onInput() {
    pass = (phrase) ? generate_password(phrase, chars, 40) : "";
  }
</script>

<main class="w-full flex">
  <div class="w-fit mx-auto text-center">
    <h1 class="text-blue-500">{pass}</h1>
    <input 
      type="text" 
      bind:value={phrase} on:input={onInput}
      class="border border-black w-fit"
    />
  </div>
  
</main>