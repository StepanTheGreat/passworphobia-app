<script lang="ts">
  import { generate_password } from "password-generator";

  let phrase = "";
  let pass = generate_password(phrase, "qwrtyuiop[", 40);
  function onInput() {
    pass = generate_password(phrase, "qwrtyuiop[", 40);
  }

</script>

<main>
  <h1 class="text-blue-500">{pass}</h1>
  <input bind:value={phrase} on:input={onInput}/>
</main>