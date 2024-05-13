import {authCoiffeur, deconnexion, generateFooter, generateNavBarWithAuth} from '../../commun.js';


//Section Profil
async function fetchSalonProfile(salonId) {
    try {
        const response = await fetch(`/getSalonDataBySalonId?salonId=${salonId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch salon details');
        }
        const salonData = await response.json();
        console.log(salonData);
        updateProfileSection(salonData);
    } catch (error) {
        console.error('Could not fetch salon data', error);
    }
}

function updateProfileSection({ salonId, nomSalon, adresse, numeroTelephoneSalon, description }) {
    const imageUrl = `/images/salon${salonId}/${salonId}.png`;
    const profileSection = document.querySelector('.section .is-one-third .box');
    profileSection.innerHTML = `
        <figure class="image is-128x128 is-inline-block">
            <img class="profile-image" src="${imageUrl}" alt="Image du salon ${nomSalon}">
        </figure>
        <div class="field">
            <h3 class="title is-4 has-text-left">${nomSalon}</h3>
            <p>${adresse}</p>
            <p>${numeroTelephoneSalon}</p>
            <h3 class="title is-6 has-text-left">Biographie</h3>
            <p>${description}</p>
        </div>
    `;
}

//Section services
async function fetchDescriptionService() {
    try {
        const response = await fetch(`/getCoiffurePreEtablieData`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const coiffureData = await response.json();
        const token = sessionStorage.getItem('tokenCoiffeur');
        const info = token => decodeURIComponent(atob(token.split('.')[1].replace('-', '+').replace('_', '/')).split('').map(c => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`).join(''));
        const email = JSON.parse(info(token)).email;
        const resultat = await fetch(`/getSalonId?email=${email}`)
        const salonId = await resultat.json();
        const salonArray = distributeCoiffures(coiffureData, salonId);
        if (salonArray) {
            updateServiceSection(salonArray);
        }
        console.log(salonArray);
    } catch (error) {
        console.error('could not fetch the data', error);
    }
}

function distributeCoiffures(coiffures, salonId, numberOfServicesPerSalon = 5) {
    const startIndex = (salonId - 1) * numberOfServicesPerSalon;
    const endIndex = startIndex + numberOfServicesPerSalon;
    const salonCoiffures = coiffures.slice(startIndex, endIndex);

    if (salonCoiffures.length === 0) {
        console.error(`No services found for Salon ${salonId}`);
        return null;
    }

    return salonCoiffures;
}

function updateServiceSection(salonCoiffures) {
    const serviceSection = document.getElementById('serviceSection');
    serviceSection.innerHTML = `<h3 class="title is-4 title-margin-adjust">Description des services</h3>`;

    salonCoiffures.forEach(coiffure => {
        const coiffureHTML = `
            <div>
                <p><b class="title is-5">${coiffure.nomCoiffure} :</b>
                Durée estimée: ${coiffure.dureeEstimee} minutes</p>
            </div>
        `;
        serviceSection.insertAdjacentHTML('beforeend', coiffureHTML);
    });
}

//Section Disponibilité
async function fetchHeuresTravail(salonId) {
    try {
        const response = await fetch(`/getHeuresTravail?salonId=${salonId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch working hours');
        }
        const heuresTravail = await response.json();
        console.log(heuresTravail);
        updateHeuresTravailSection(heuresTravail);
    } catch (error) {
        console.error('Could not fetch working hours', error);
    }
}

function updateHeuresTravailSection(heuresTravail) {
    const horaireContainer = document.querySelector('.horaire-container');
    horaireContainer.innerHTML = `
        <table class="table is-bordered is-striped" style="border: none;">
            <tbody>
                <tr>
                    <th class="title is-5">Horaires de travail:</th>
                    <th></th>
                </tr>
                ${heuresTravail.map(coiffeur => `
                    <tr>
                        <td>${coiffeur.nom} ${coiffeur.prenom} :</td>
                        <td>${coiffeur.horairesTravail}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}


// Section Portfolio
function uploadFile() {
    document.getElementById('btnUpload').addEventListener('click', async function(event) {
        console.log('Upload button clicked');
        console.log(document.getElementById('uploadForm'));
        event.preventDefault();
        const formData = new FormData(document.getElementById('uploadForm'));
        const token = sessionStorage.getItem('tokenCoiffeur');
        const info = token => decodeURIComponent(atob(token.split('.')[1].replace('-', '+').replace('_', '/')).split('').map(c => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`).join(''));
        const email = JSON.parse(info(token)).email;
        const resultat = await fetch(`/getSalonId?email=${email}`)
        const salonId = await resultat.json();
        console.log(salonId);
        const response = await fetch(`/upload/${salonId}`, {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        if (data.success) {
            window.alert('File uploaded successfully!');
        } else {
            window.alert('Error uploading file.');
        }
    });
}

/*
async function displayPortfolio(salonId) {
    const basePath = `/images/salon${salonId}/Portfolio${salonId}`;
    const portfolioContainer = document.getElementById('gallery');
    try {
        const response = await fetch(`/api/images/salon/${salonId}/portfolio`);
        if (!response.ok) {
            throw new Error('Failed to fetch image files');
        }
        const files = await response.json();
        console.log(files);

        // Filter image files
        const imageFiles = files.filter(file => {
            return ['.jpg', '.jpeg', '.png', '.gif'].includes(path.extname(file).toLowerCase());
        });

        portfolioContainer.innerHTML = '';

        // Display images
        imageFiles.forEach(imageName => {
            const imgElement = document.createElement('img');
            imgElement.src = `${basePath}/${imageName}`;
            imgElement.alt = `Salon ${salonId} Portfolio Image`;
            imgElement.classList.add('portfolio-image'); // Add a class for styling

            portfolioContainer.appendChild(imgElement);
        });
    } catch (error) {
        console.error('Error fetching image files:', error.message);
    }
}
*/
function displayPortfolio(salonId) {
    fetch(`/api/images/salon/${salonId}/portfolio`)
        .then(response => response.json())
        .then(imageNames => {
            const portfolioContainer = document.getElementById('gallery');
            portfolioContainer.innerHTML = ''; // Clear existing content

            imageNames.forEach(imageName => {
                const imgElement = document.createElement('img');
                const basePath = `/Image/salon${salonId}/Portfolio${salonId}`;
                imgElement.src = `${basePath}/${imageName}`;
                imgElement.alt = `Salon ${salonId} Portfolio Image`;
                imgElement.classList.add('portfolio-image'); // Add a class for styling

                portfolioContainer.appendChild(imgElement);
            });
        })
        .catch(error => {
            console.error('Error loading images:', error);
            window.alert('Failed to load portfolio images.');
        });
}


/*
function Auth() {
    if (!sessionStorage.getItem('token')) {
        window.location.href = '/connexion';
    }
}
 */

document.addEventListener("DOMContentLoaded", async function(event) {
    authCoiffeur();
    event.preventDefault();
    const token = sessionStorage.getItem('tokenCoiffeur');
    const info = token => decodeURIComponent(atob(token.split('.')[1].replace('-', '+').replace('_', '/')).split('').map(c => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`).join(''));
    const email = JSON.parse(info(token)).email;
    const resultat = await fetch(`/getSalonId?email=${email}`)
    const salonId = await resultat.json();
    fetchSalonProfile(salonId);
    generateFooter();
    generateNavBarWithAuth();
    deconnexion();
    fetchDescriptionService()
    fetchHeuresTravail(salonId);
    uploadFile();
    displayPortfolio(salonId);
});
