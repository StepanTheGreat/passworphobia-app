<script>
    import SwitchState from "../components/SwitchState.svelte";

</script>

<main class="w-full h-full grid gap-4 bg-background">
    <div class="_header flex flex-row">
        <SwitchState to="home"></SwitchState>
    </div>
    <div class="_tool flex flex-col">
        <h1>Hello</h1>
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