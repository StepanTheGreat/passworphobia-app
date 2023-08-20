<script lang="ts">
    const TIME: number = 10;

    let waiting: boolean = false;
    let leftTo: number = TIME;

    function deleteAccount() {
        console.log("Account deleted")
    }
</script>

<div class="absolute w-full h-full bg-black bg-opacity-25 flex flex-col">
    <div class="bg-white rounded-md w-1/2 h-1/3 m-auto">
        <p>You soure you want to delete your account?</p>
        <button>Delete</button>
    </div>
</div>