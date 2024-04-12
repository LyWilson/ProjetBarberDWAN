import { deconnexion, generateFooter, generateNavBarWithAuth } from "../../commun.js";

const token = sessionStorage.getItem('token');
const info = token => decodeURIComponent(atob(token.split('.')[1].replace('-', '+').replace('_', '/')).split('').map(c => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`).join(''));

async function infoClient() {
    const email = JSON.parse(info(token)).email;
    const response = await fetch(`/getProfilData?email=${email}`);
    if (!response.ok) {
        throw new Error('Failed to fetch salon data');
    }
    const data = await response.json();
    document.getElementById('lastNameInput').placeholder = data.nom;
    document.getElementById('firstNameInput').placeholder = data.prenom;
    document.getElementById('emailInput').placeholder = data.email;
    document.getElementById('phoneInput').placeholder = data.numeroTelephone;
}

document.addEventListener("DOMContentLoaded", () => {
    generateFooter();
    generateNavBarWithAuth()
    deconnexion()
    infoClient();
});
