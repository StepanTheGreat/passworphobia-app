<script lang="ts">
    import Generator from "./components/Generator.svelte";
</script>

<main class="w-full h-full grid bg-background">
  <div class="flex">
    <h1 class="text-white text-5xl font-bold m-auto">Passworphobia</h1>
  </div>
  <div class="flex flex-col">
    <Generator></Generator>
  </div>
  <div></div>
</main>

<style>
  main {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 2fr 1fr;
    gap: 16px;
  }
</style>