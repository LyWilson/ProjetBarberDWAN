import { deconnexion, generateFooter, generateNavBarWithAuth } from '../../commun.js';

const salonId = 1;  // This should be dynamically set possibly from URL or session


//Section Profil
async function fetchSalonProfile() {
    try {
        const response = await fetch(`/getSalonDataBySalonId?salonId=${salonId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch salon details');
        }
        const salonData = await response.json();
        updateProfileSection(salonData);
    } catch (error) {
        console.error('Could not fetch salon data', error);
    }
}

function updateProfileSection({ salonId, nomSalon, adresse, numeroTelephone, description }) {
    const imageUrl = `/images/salon${salonId}/${salonId}.png`;
    const profileSection = document.querySelector('.section .is-one-third .box');
    profileSection.innerHTML = `
        <figure class="image is-128x128 is-inline-block">
            <img class="profile-image" src="${imageUrl}" alt="Image du salon ${nomSalon}">
        </figure>
        <div class="field">
            <h3 class="title is-4 has-text-left">${nomSalon}</h3>
            <p>${adresse}</p>
            <p>${numeroTelephone}</p>
            <h3 class="title is-6 has-text-left">Biographie</h3>
            <p>${description}</p>
        </div>
    `;
}

//Section services
async function fetchDescriptionService() {
    try {
        const response = await fetch('/getCoiffureData');
        if (!response.ok) {
            new Error(`HTTP error! status: ${response.status}`);
        }
        const coiffureData = await response.json();
        updateServiceSection(coiffureData)
    } catch (error) {
        console.error('could not fetch the data', error);
    }
}

/*
function updateServiceSection(salonCoiffures) {
    const serviceSection = document.querySelector('.column.is-two-fifth .box.content');
    serviceSection.innerHTML = `<h3 class="title is-4 title-margin-adjust">Description des services</h3>`;

    salonCoiffures.forEach(coiffure => {
        const coiffureHTML = `
            <div>
                <h4 class="title is-5">${coiffure.nomCoiffure}</h4>
                <p>Description: ${coiffure.descriptionCoiffure}</p>
                <p>Durée estimée: ${coiffure.dureeEstimee} minutes</p>
            </div>
        `;
        serviceSection.insertAdjacentHTML('beforeend', coiffureHTML);
    });
}

function distributeCoiffures(coiffures, numberOfSalons = 9) {
    const distributed = Array.from({ length: numberOfSalons }, () => []);
    let salonIndex = 0;

    // Ensure the first coiffureId is in all salons
    for (let i = 0; i < numberOfSalons; i++) {
        distributed[i].push(coiffures[0]);
    }

    // Distribute the remaining coiffures
    for (let i = 1; i < coiffures.length; i++) {
        distributed[salonIndex].push(coiffures[i]);
        salonIndex = (salonIndex + 1) % numberOfSalons;
    }

    return distributed;
}
*/

//Section Disponibilité
async function fetchSalonDisponibilite() {
    try {
        const funcitonDb = require("/fonctionDb")
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const salonDetails = await response.json();
        updateHeureOuverture(salonDetails.horairesOuverture);
    } catch (error) {
        console.error('Could not fetch salon details', error);
    }
}

function updateHeureOuverture(horairesOuverture) {
    const horaireContainer = document.querySelector('.horaire-container');
    horaireContainer.innerHTML = `
    <table class="table is-bordered is-striped" style="border: none;">
        <tbody>
            <tr>
                <th class="title is-5">Horaires d'ouverture:</th>
                <th></th>
            </tr>
            <tr>
                <td>Dimanche:</td>
                <td>Fermé</td>
            </tr>
            <tr>
                <td>Lundi:</td>
                <td>${horairesOuverture}</td>
            </tr>
            <tr>
                <td>Mardi:</td>
                <td>${horairesOuverture}</td>
            </tr>
            <tr>
                <td>Mercredi:</td>
                <td>${horairesOuverture}</td>
            </tr>
            <tr>
                <td>Jeudi:</td>
                <td>${horairesOuverture}</td>
            </tr>
            <tr>
                <td>Vendredi:</td>
                <td>${horairesOuverture}</td>
            </tr>
            <tr>
                <td>Samedi:</td>
                <td>Fermé</td>
            </tr>
        </tbody>
    </table>
`;
}

// Section Portfolio
function uploadFile() {
    const formData = new FormData(document.getElementById('uploadForm'));
    $.ajax({
        url: `/upload/${salonId}`,
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success: function(data) {
            // Check if upload was successful
            if (data.success) {
                window.alert('File uploaded successfully!');
            } else {
                window.alert('Error uploading file.');
            }
        },
        error: function() {
            alert('Error uploading file.');
        }
    });
}


// script.js
function displayPortfolio(salonId) {
    const basePath = `/images/salon${salonId}/Portfolio${salonId}`;
    const portfolioContainer = document.getElementById('gallery');
    const images = ['haircut1.png', 'haircut2.png'];
    portfolioContainer.innerHTML = '';

    images.forEach(imageName => {
        const imgElement = document.createElement('img');
        imgElement.src = `${basePath}/${imageName}`;
        imgElement.alt = `Salon ${salonId} Portfolio Image`;
        imgElement.classList.add('portfolio-image'); // Add a class for styling

        portfolioContainer.appendChild(imgElement);
    });
}


function Auth() {
    if (!sessionStorage.getItem('token')) {
        window.location.href = '/connexion';
    }
}

document.addEventListener("DOMContentLoaded", () => {
    Auth();  // Authenticate before fetching data
    const salonId = '1';  // This should be dynamically set possibly from URL or session
    fetchSalonProfile(salonId);
    generateFooter();
    generateNavBarWithAuth();
    deconnexion();
    //fetchDescriptionService(coiffureId)
    fetchSalonDisponibilite(salonId);
    uploadFile();
    displayPortfolio(salonId)
});
