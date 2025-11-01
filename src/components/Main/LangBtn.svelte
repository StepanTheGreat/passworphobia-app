<script lang="ts">
    import { onDestroy } from "svelte";
    import { currentLang, langLoad, saveLang, LANGUAGES } from "../../lang";

    let lang: string = "en";

    let unsubscribeLang = currentLang.subscribe(newLang => {lang = newLang});

    function changeLang() {
        let ind = LANGUAGES.indexOf(lang);
        ind = (ind+1) % LANGUAGES.length;
        lang = LANGUAGES[ind];

        langLoad(lang);
        saveLang(lang);
    }

    onDestroy(() => {
        unsubscribeLang();
    });
</script>

<button class="my-auto mx-8 w-fit h-fit text-3xl md:text-4xl text-text" on:click={changeLang}>{lang.toUpperCase()}</button>
