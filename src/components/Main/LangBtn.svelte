<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import { currentLang, langLoad, saveLang } from "../../lang";
    let lang: string = "en";

    let unsubscribeLang = currentLang.subscribe(newLang => {lang = newLang});

    let langs = {
        "en": "EN", 
        "et": "ET", 
        "fr": "FR", 
        "ua": "UA", 
        "ru": "RU"
    };

    function changeLang() {
        let langArr = Object.keys(langs);
        let ind = langArr.indexOf(lang);
        ind = (ind+1) % langArr.length;
        lang = langArr[ind];

        langLoad(lang);
        saveLang(lang);
    }

    onDestroy(() => {
        unsubscribeLang();
    });
</script>

<button class="my-auto mx-8 w-fit h-fit text-3xl md:text-4xl text-text" on:click={changeLang}>{langs[lang]}</button>
