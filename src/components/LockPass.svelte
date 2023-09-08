<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import VisibilityButton from "./VisibilityButton.svelte";

    const dispatch = createEventDispatcher();

    export let size: number = 14;
    export let visible: boolean = false;

    function onInput(e: Event) {
        let data = (e.target as HTMLInputElement).value;
		dispatch("passInput", {
			value: data
		});
	}

</script>

<div class="flex flex-row mb-3 mx-auto w-fit">
    <input
        {size}
        type={visible? "text" : "password"}
        class="block text-center rounded-md mx-1 bg-primary text-text pr-8 pl-1"
        on:input={onInput}
    />
    <VisibilityButton {visible} callback={() => visible = !visible}></VisibilityButton>
</div>