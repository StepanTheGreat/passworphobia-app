<script lang="ts">
    import VisibilityButton from "./VisibilityButton.svelte";

    export let size: number = 14;
    export let visible: boolean = false;
</script>

<div class="flex flex-row m-1">
    <input
        {size}
        type={visible? "text" : "password"}
        class="block text-center rounded-md mx-1 bg-primary text-text pr-8 pl-1"
    />
    <VisibilityButton {visible} callback={() => visible = !visible}></VisibilityButton>
</div>