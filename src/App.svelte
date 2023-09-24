<!-- Copyright © 2023 Perfect Duo. All rights reserved. -->

<script lang="ts">
	import { onDestroy } from "svelte";
	import Main from "./pages/Main.svelte";
	import { AppState, appState } from "./store";
	import Lock from "./pages/Lock.svelte";
	import Settings from "./pages/Settings.svelte";

	let state: AppState;
	let unsubscribe = appState.subscribe(newState => state = newState);

	onDestroy(() => unsubscribe());
</script>

{#if state == AppState.Lock}
	<Lock></Lock>
{:else if state == AppState.Main}
	<Main></Main>	
{:else if state == AppState.Settings}
	<Settings></Settings>
{/if}

