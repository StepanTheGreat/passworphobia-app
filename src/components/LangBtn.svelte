<script lang="ts">
    import { getLang, langLoad, saveLang } from "../lang";
    export let lang: string = getLang();

    let langs = {
        "en": "EN", 
        "ua": "UA", 
        "et": "ET", 
        "fr": "FR", 
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
</script>

<button class="my-auto mx-8 w-fit h-fit text-4xl text-text" on:click={changeLang}>{langs[lang]}</button>
