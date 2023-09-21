<script lang="ts">
    import { get } from "svelte/store";
    import { generateSalt, loadSalt } from "../../storage";
    import LockPass from "../Lock/LockPass.svelte";
    import { storeUserSalt } from "../../store";

    let currentSalt: string = get(storeUserSalt);
    let currentPass: string = "";
    let passwords: {[key: string]: string} = {
        "old": "",
        "new1": "",
        "new2": ""
    };
    
    let errorPassword: string = "";

    function genNewSalt() {
        currentSalt = generateSalt(2);
    }

    function newPassword() {
        let oldPass = passwords.old;
        let new1Pass = passwords.new1;
        let new2Pass = passwords.new2;
        loadSalt(oldPass).then(() => {
            // Old pass matches
            if (new1Pass == new2Pass) {
                currentPass = new1Pass;
                
                console.log("Succesfully changed!");
            } else {
                console.log("Passwords don't match!");
            }
        }).catch(err => errorPassword = err);
    }
</script>

<div>
    <div class="mb-8">
        <h1 class="text-red-500 text-4xl text-center font-semibold">DANGER ZONE</h1>
    </div>

    <div class="bg-secondary rounded-xl mx-auto w-fit px-16 py-8 mb-8">
        <h1 class="text-text text-4xl text-center">Salt</h1>
        <div class="flex flex-col my-4">
            <LockPass size={32} value={currentSalt}></LockPass>
        </div>
        <p class="text-text italic text-center mb-2">Generates a new, random, strong salt</p>
        <div class="w-full flex flex-col">
            <button class="bg-primary text-text px-8 py-2 rounded-md m-auto" on:click={genNewSalt}>Regenerate</button>
        </div>
    </div>

    <div class="bg-secondary rounded-xl mx-auto w-fit px-16 py-8 mb-8">
        <h1 class="text-text text-4xl text-center">Password</h1>
        <div class="my-4">
            <div class="mt-6">
                <p class="text-text text-md text-center my-1">Old password</p>
                <LockPass size={32} value=""></LockPass>
            </div>
            <div class="mt-4 flex flex-col">
                <p class="text-text text-md text-center my-1">New password</p>
                <LockPass size={32} value=""></LockPass>
                <LockPass size={32} value=""></LockPass>
               
            </div>
        </div>
        <div class="w-full flex flex-col">
            <button class="bg-primary text-text px-8 py-2 rounded-md mx-auto" on:click={newPassword}>Apply</button>
        </div>
    </div>

    <div class="w-full flex flex-col mb-8">
        <button class="bg-accent text-text px-16 py-4 rounded-xl mx-auto">Save</button>
    </div>
</div>