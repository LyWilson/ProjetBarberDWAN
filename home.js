const urlParams = new URLSearchParams(window.location.search);
const clientToken = urlParams.get('token');
if (clientToken) {
    sessionStorage.setItem('token', clientToken);
}

import {generateFooter, generateNavBarWithAuth} from "./commun.js";

document.addEventListener("DOMContentLoaded", () => {
    generateFooter();
    generateNavBarWithAuth()
});
