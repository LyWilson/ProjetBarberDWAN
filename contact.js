import {deconnexion, generateFooter, generateNavBarWithAuth} from "../../commun.js";

document.addEventListener("DOMContentLoaded", () => {
    generateFooter();
    generateNavBarWithAuth()
    deconnexion()
});
