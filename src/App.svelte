<!-- Copyright © 2023 August, Perfect Duo. All rights reserved. -->

<script lang="ts">
    import { onDestroy } from "svelte";
    import Generator from "./components/Generator.svelte";
    import Profile from "./components/Profile.svelte";
    import Title from "./components/Title.svelte";
    import { fireStateUnsubscribe } from "./fire";
    import LangBtn from "./components/LangBtn.svelte";

    onDestroy(() => fireStateUnsubscribe());
</script>

<main class="w-full h-full grid gap-4 bg-background">
  <div class="_header flex flex-row">
    <LangBtn></LangBtn>
    <Title></Title>
    <Profile></Profile>
  </div>
  <div class="_tool flex flex-col">
    <Generator></Generator>
  </div>
</main>

<style>
  ._header {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }

  main {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 3fr 1fr;
  }

  @media screen and (max-height: 384px) {
    main {
      grid-template-rows: 1fr 4fr;
    }
  }
</style>