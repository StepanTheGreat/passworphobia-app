<script>
    import LockPass from "./LockPass.svelte";

</script>
<div>
    <div class="mb-4">
        <h1 class="text-red-500 text-2xl text-center">DANGER ZONE</h1>
    </div>

    <p class="text-text text-lg text-center mb-1">Salt</p>
    <LockPass size={32} value="21931293"></LockPass>

    <div class="mt-6">
        <p class="text-text text-md text-center my-1">Old password</p>
        <LockPass size={32} value="21931293"></LockPass>
    </div>
    <div class="mt-4">
        <p class="text-text text-md text-center my-1">New password</p>
        <LockPass size={32} value="21931293"></LockPass>
        <LockPass size={32} value="21931293"></LockPass>
    </div>
</div>