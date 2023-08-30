<script lang="ts">
    import { onDestroy } from "svelte";
    import { storeLoading, storeUID } from "../store";
    import DeleteMenu from "./DeleteMenu.svelte";
    import { langTable } from "../lang";

    let loggedInAsText: string;
    let notLoggedInText: string;
    let lockHintText: string;
    let signInGoogleText: string;
    let signOutText: string;

    let unsubscribeLang = langTable.subscribe(newTable => {
        loggedInAsText = newTable.profile.logged_in;
        notLoggedInText = newTable.profile.logged_out;
        lockHintText = newTable.profile.lock_hint;
        signInGoogleText = newTable.profile.sign_in_google_btn;
        signOutText = newTable.profile.sign_out_btn;
    });

    let hidden: boolean = true;

    let loading: boolean = false;
    let loggedIn: boolean = false;
    let name: string = "";

    let unsusbcribeLoading = storeLoading.subscribe(loadStatus => loading = loadStatus);

    onDestroy(() => {
        unsusbcribeLoading();
        unsubscribeLang();
    });
</script>

<button class="w-16 h-16 md:w-20 md:h-20 inline-block rounded-md m-auto my-auto mr-4" on:click={() => hidden = !hidden}>
    {#if loading}
        <svg class="w-full h-full stroke-text" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
            <g>
                <circle cx="15" cy="15" r="9.5" stroke-linecap="round" stroke-width="2.5" fill="none">
                    <animate attributeName="stroke-dasharray" calcMode="spline" dur="1.5s" keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1" keyTimes="0;0.475;0.95;1" repeatCount="indefinite" values="0 150;42 150;42 150;42 150"/><animate attributeName="stroke-dashoffset" calcMode="spline" dur="1.5s" keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1" keyTimes="0;0.475;0.95;1" repeatCount="indefinite" values="0;-16;-59;-59"/>
                </circle>
                <animateTransform attributeName="transform" dur="2s" repeatCount="indefinite" type="rotate" values="0 15 15;360 15 15"/>
            </g>
        </svg>
    {:else if loggedIn}
        <svg class="w-full h-full fill-text" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12 12.25a3.75 3.75 0 1 1 3.75-3.75A3.75 3.75 0 0 1 12 12.25Zm0-6a2.25 2.25 0 1 0 2.25 2.25A2.25 2.25 0 0 0 12 6.25Zm7 13a.76.76 0 0 1-.75-.75c0-1.95-1.06-3.25-6.25-3.25s-6.25 1.3-6.25 3.25a.75.75 0 0 1-1.5 0c0-4.75 5.43-4.75 7.75-4.75s7.75 0 7.75 4.75a.76.76 0 0 1-.75.75Z"/>
        </svg>
    {:else if !loggedIn}
        <svg class="w-full h-full fill-text" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M18 20.75h-3a.75.75 0 0 1 0-1.5h3a1.16 1.16 0 0 0 1.25-1V5.78a1.16 1.16 0 0 0-1.25-1h-3a.75.75 0 0 1 0-1.5h3a2.64 2.64 0 0 1 2.75 2.53v12.41A2.64 2.64 0 0 1 18 20.75Z"/>
            <path d="M11 16.75a.74.74 0 0 1-.53-.22a.75.75 0 0 1 0-1.06L13.94 12l-3.47-3.47a.75.75 0 0 1 1.06-1.06l4 4a.75.75 0 0 1 0 1.06l-4 4a.74.74 0 0 1-.53.22Z"/>
            <path d="M15 12.75H4a.75.75 0 0 1 0-1.5h11a.75.75 0 0 1 0 1.5Z"/>
        </svg>
    {/if}
</button>

{#if !hidden}
    <div class="absolute left-0 w-full h-full flex pointer-events-none z-10">
        <div class="m-auto w-fit h-fit px-24 py-16 bg-primary rounded-xl flex flex-col pointer-events-auto">
            <div class="m-auto text-center flex flex-col">
                {#if loggedIn}
                    <h1 class="mb-8 mx-auto text-text font-bold ">{loggedInAsText} {name}</h1>
                    <DeleteMenu></DeleteMenu>
                    <p class="text-text italic">{lockHintText}</p>
                {:else}
                    <h1 class="mx-auto text-text">{notLoggedInText}</h1>
                {/if}
            </div>
        </div>
    </div>
{/if}
