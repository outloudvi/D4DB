const window = require("global/window");

/**
 * D4DJ Site Translations class
 */
class DjL10n {
    constructor() {
        if (process.browser) {
            console.log(localStorage)
            this.lang = localStorage.getItem("ui_lang");

            if (this.lang === undefined || this.lang === null) {
                this.lang = "en";
            }

            this.data = require('../../public/l10n/' + this.lang + '.json');
        } else {
            this.data = {}
        }
        this.default = require('../../public/l10n/en.json');
    }

    // Setting the language to use
    setLanguage(language) {
        this.lang = language
        localStorage.setItem("ui_lang", language);
    }

    // Getting the language in use
    getLanguage() {
        return this.lang;
    }

    // Getting the specific string (if not translated yet, it will safely return just the variable)
    getString(id) {
        const key = id.split(".")
        let object = this.data
        for (const i of key) {
            object = object[i];
            if (!object) break;
        }
        if (object === undefined) {
            console.warn(`[l10n] ${key} is not found in translation`);
            return id;
        }
        if (typeof object !== "string") {
            console.warn(`[l10n] ${key} does not point to a string`);
            return id;
        }
        return object;
    }
}

export default DjL10n;