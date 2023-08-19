<script lang="ts">
    import { onDestroy } from "svelte";
    import { fireAuth, manualSignIn, signOut } from "../fire";
    import { storeLoading, storeUID } from "../store";

    let hidden: boolean = true;

    let loading: boolean = false;
    let loggedIn: boolean = false;
    let name: string = "";

    function signInBtn() {
        manualSignIn();
    }

    function signOutBtn() {
        signOut();
    }

    let unsusbcribeUID = storeUID.subscribe(() => {
        loggedIn = fireAuth.currentUser != null;
        if (loggedIn) {
            name = fireAuth.currentUser.displayName;
        } else {
            name = "";
        }
    });

    let unsusbcribeLoading = storeLoading.subscribe(loadStatus => loading = loadStatus);

    onDestroy(() => {
        unsusbcribeUID();
        unsusbcribeLoading();
    });
</script>

<div class="flex">
    <button class="bg-primary w-16 h-16 inline-block rounded-md m-auto mt-2 mr-2" on:click={() => hidden = !hidden}>
        {#if loading}
            <svg class="w-full h-full stroke-secondary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
                <g>
                    <circle cx="15" cy="15" r="9.5" stroke-linecap="round" stroke-width="2.5" fill="none">
                        <animate attributeName="stroke-dasharray" calcMode="spline" dur="1.5s" keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1" keyTimes="0;0.475;0.95;1" repeatCount="indefinite" values="0 150;42 150;42 150;42 150"/><animate attributeName="stroke-dashoffset" calcMode="spline" dur="1.5s" keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1" keyTimes="0;0.475;0.95;1" repeatCount="indefinite" values="0;-16;-59;-59"/>
                    </circle>
                    <animateTransform attributeName="transform" dur="2s" repeatCount="indefinite" type="rotate" values="0 15 15;360 15 15"/>
                </g>
            </svg>
        {:else if loggedIn}
            <svg class="w-full h-full fill-secondary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 12.25a3.75 3.75 0 1 1 3.75-3.75A3.75 3.75 0 0 1 12 12.25Zm0-6a2.25 2.25 0 1 0 2.25 2.25A2.25 2.25 0 0 0 12 6.25Zm7 13a.76.76 0 0 1-.75-.75c0-1.95-1.06-3.25-6.25-3.25s-6.25 1.3-6.25 3.25a.75.75 0 0 1-1.5 0c0-4.75 5.43-4.75 7.75-4.75s7.75 0 7.75 4.75a.76.76 0 0 1-.75.75Z"/>
            </svg>
        {:else if !loggedIn}
            <svg class="w-full h-full fill-secondary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M15 14.75a5.74 5.74 0 0 1-4.07-1.68A5.77 5.77 0 1 1 15 14.75Zm0-10A4.25 4.25 0 0 0 12 12a4.25 4.25 0 1 0 3-7.25Z"/>
                <path d="M4.5 20.25A.74.74 0 0 1 4 20a.75.75 0 0 1 0-1l6.46-6.47a.75.75 0 1 1 1.06 1.07L5 20a.74.74 0 0 1-.5.25Z"/>
                <path d="M8 20.75a.74.74 0 0 1-.53-.22l-2-2a.75.75 0 0 1 1.06-1.06l2 2a.75.75 0 0 1 0 1.06a.74.74 0 0 1-.53.22Zm2-2a.74.74 0 0 1-.53-.22l-2-2a.75.75 0 1 1 1.06-1.06l2 2a.75.75 0 0 1 0 1.06a.74.74 0 0 1-.53.22Z"/>
            </svg>
        {/if}
    </button>
    {#if !hidden}
        <div class="absolute left-0 w-full h-full flex pointer-events-none">
            <div class="m-auto w-1/2 h-1/2 bg-primary rounded-xl flex flex-col pointer-events-auto">
                <div class="m-auto text-center flex flex-col">
                    {#if loggedIn}
                        <h1 class="my-4 mx-auto text-text font-bold ">You're logged in as {name}</h1>
                        <button 
                            class="m-auto mb-4 h-fit w-fit px-8 py-2 bg-secondary rounded-md text-text"
                            on:click={signOutBtn}
                        >Sign out</button>
                    {:else}
                        <h1 class="mx-auto text-text">You're not logged in.</h1>
                        <button 
                            class="m-auto mt-8 h-fit w-fit px-8 py-2 bg-secondary rounded-md text-text" 
                            on:click={signInBtn}
                        >Sign in with Google</button>
                    {/if}
                </div>
            </div>
        </div>
    {/if}
</div>