<script>
    import LangBtn from "../components/Main/LangBtn.svelte";
    import Title from "../components/Main/Title.svelte";
import Settings from "../components/Settings/Settings.svelte";
    import SwitchState from "../components/SwitchState.svelte";
</script>

<main class="w-full h-full grid gap-4 bg-background">
    <div class="_header mt-4">
        <LangBtn></LangBtn>
        <Title></Title>
        <SwitchState to="home"></SwitchState>
    </div>
    <div class="_tool flex flex-col">
        <Settings></Settings>
    </div>
</main>

<style>
    ._header {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
    }
    
    
    main {
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 3fr;
    }
</style>