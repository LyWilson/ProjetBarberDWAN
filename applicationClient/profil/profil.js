import {authClient, deconnexion, generateFooter, generateNavBarWithAuth} from "../../commun.js";

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
    document.getElementById('phoneInput').placeholder = data.numeroTelephone;
}

async function modifyClientInfo(event) {
    event.preventDefault()
    console.log('modifyClientInfo');
    const email = JSON.parse(info(token)).email;
    const lastName = document.getElementById('lastNameInput').value;
    const firstName = document.getElementById('firstNameInput').value;
    const phone = document.getElementById('phoneInput').value;
    const data = {
        email: email,
        nom: lastName,
        prenom: firstName,
        numeroTelephone: phone
    }
    const response = await fetch(`/modifyClientInfo`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error('Failed to fetch salon data');
    }
    alert('Modification effectuée');
    location.reload();
}
document.getElementById('BtnSubmit').addEventListener('click', modifyClientInfo);

async function deleteAccount(event) {
    event.preventDefault()
    const email = JSON.parse(info(token)).email;
    const response = await fetch(`/getProfilData?email=${email}`);
    if (!response.ok) {
        throw new Error('Failed to fetch salon data');
    }
    const data = await response.json();
    const clientId = data.clientId;
    const responseDelete = await fetch(`/deleteClientAccount?clientId=${clientId}`, {
        method: 'DELETE',
    });
    if (!responseDelete.ok) {
        throw new Error('Failed to fetch salon data');
    }

    if (confirm("etes-vous sûr de vouloir supprimer votre compte?")) {
        alert("Votre compte a été supprimé avec succès");
    }
}

document.getElementById("BtnDeleteAccount").addEventListener("click", deleteAccount);

document.addEventListener("DOMContentLoaded", () => {
    authClient();
    generateFooter();
    generateNavBarWithAuth()
    deconnexion()
    infoClient();
});
