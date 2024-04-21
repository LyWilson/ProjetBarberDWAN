// Importation des modules
import { deconnexion, generateFooter, generateNavBarWithAuth } from '../../commun.js';

const token = sessionStorage.getItem('token');
const info = token => decodeURIComponent(atob(token.split('.')[1].replace('-', '+').replace('_', '/')).split('').map(c => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`).join(''));


function getSalonIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('salonId');
}

// Function to add salon to favorites
async function addToFavorites() {
  try {
    const email = JSON.parse(info(token)).email;
    const salonId = getSalonIdFromURL(); // Get salon ID from URL
    const response = await fetch(`/addSalonToFavorites?email=${encodeURIComponent(email)}&salonId=${encodeURIComponent(salonId)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error('Failed to add salon to favorites');
    }
    // Hide add to favorites button, show remove from favorites button
    document.getElementById('addToFavoritesButton').classList.add('is-hidden');
    document.getElementById('removeFromFavoritesButton').classList.remove('is-hidden');
  } catch (error) {
    console.error('Error adding salon to favorites:', error);
  }
}

// Function to remove salon from favorites
async function removeFromFavorites() {
  const salonId = getSalonIdFromURL(); // Implement this function to extract salonId from URL
  const token = sessionStorage.getItem('token');
  try {
    const response = await fetch('/removeSalonFromFavorites', {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ salonId: salonId })
    });
    if (!response.ok) {
      throw new Error('Failed to remove salon from favorites');
    }
    // Hide remove from favorites button, show add to favorites button
    document.getElementById('removeFromFavoritesButton').classList.add('is-hidden');
    document.getElementById('addToFavoritesButton').classList.remove('is-hidden');
  } catch (error) {
    console.error('Error removing salon from favorites:', error);
  }
}


// 1.1) Fonction pour afficher les détails du salon
function displaySalonDetails(nomSalon, adresse, numeroTelephoneSalon, horairesOuverture) {
  const salonDetailsContainer = document.getElementById('salonDetails');
  if (!salonDetailsContainer) {
    console.error('Salon details container not found in the document.');
    return;
  }

  const detailsHTML = `
    <div class="card">
      <div class="card-content">
        <div class="content">
        <p><strong id="nomSalon">Salon de coiffure:</strong> ${nomSalon}</p>
        <p><strong id="adresse">Adresse:</strong> ${adresse}</p>
        <p><strong id="numeroTelephoneSalon">Numéro de téléphone:</strong> ${numeroTelephoneSalon}</p>
        <p><strong id="horairesOuverture">Heures d'ouverture:</strong> ${horairesOuverture}</p>
      </div>
    </div>
  `;
  salonDetailsContainer.innerHTML = detailsHTML;
}

// 1) Fonction pour charger les détails du salonId à partir de l'URL
async function loadSalonDetails() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const salonId = urlParams.get('salonId');
    if (!salonId) {
      throw new Error('Missing salon ID.');
    }

    const response = await fetch(`/getSalonDataBySalonId?salonId=${salonId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const salonDetails = await response.json();
    await displaySalonDetails(salonDetails.nomSalon, salonDetails.adresse, salonDetails.numeroTelephoneSalon, salonDetails.horairesOuverture);
  } catch (error) {
    console.error('Error fetching salon details:', error);
    document.getElementById('salonDetails').innerHTML = `<p>Error loading salon details: ${error.message}</p>`;
  }
}



// 3) Fonction href vers prendreRendezVous.html
const buttonReservation = document.getElementById('reservationButton');
buttonReservation.addEventListener('click', () => {
  window.location.href = '/prendreRendezVous/';
  });


// 4) Fonction pour charger les photos du salon
function loadSalonPhotos() {
  const urlParams = new URLSearchParams(window.location.search);
  const salonId = urlParams.get('salonId');
  if (!salonId) {
    console.error('No salon ID provided for loading photos.');
    return;
  }
  displaySalonPhotos(salonId);
}

// 4.1) Fonction pour afficher les photos du salon
function displaySalonPhotos(salonId) {
  const container = document.getElementById('salonPhotosContainer');
  container.innerHTML = '';
  let i = 1;

  function loadNextPhoto() {
    const imageUrl = `/images/salon${salonId}/Portfolio${salonId}/haircut${i}.png`;
    const photoElement = document.createElement('div');
    photoElement.className = 'column is-4';
    photoElement.innerHTML = `
          <div class="card">
              <div class="card-image">
                  <figure class="image is-4by3">
                      <img src="${imageUrl}" alt="Salon Photo ${i}">
                  </figure>
              </div>
          </div>
          `;

    const img = photoElement.querySelector('img');
    img.onload = () => {
      container.appendChild(photoElement);
      i++;
      loadNextPhoto();
    };
    img.onerror = () => {
      console.error(`Failed to load image at ${imageUrl}`);
    };
  }
  // Commencer le chargement des photos
  loadNextPhoto();
}


// Initialisation des fonctions au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
  generateNavBarWithAuth();
  generateFooter();
  deconnexion();

  loadSalonDetails();
  loadSalonPhotos();

  document.getElementById('addToFavoritesButton').addEventListener('click', addToFavorites);
  document.getElementById('removeFromFavoritesButton').addEventListener('click', removeFromFavorites);
});
