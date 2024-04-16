import {generateFooter, generateNavBarWithAuth} from "./commun.js";

const urlParams = new URLSearchParams(window.location.search);
const clientToken = urlParams.get('token')
const user = urlParams.get('user')

if (clientToken) {
    if(user === 'client'){
        sessionStorage.setItem('token', clientToken);
        window.location.href = '/AccueilClient';
    } else {
        sessionStorage.setItem('tokenCoiffeur', clientToken);
        window.location.href = '/dashboard';
    }
}



document.addEventListener("DOMContentLoaded", () => {
    generateFooter();
    generateNavBarWithAuth()

});
