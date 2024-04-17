// Importation des modules
import { deconnexion, generateFooter, generateNavBarWithAuth } from '../../commun.js';

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
          <p><strong>Salon de coiffure:</strong> ${nomSalon}
            <i id="favoriteIcon" class="far fa-star has-text-warning star"></i>
          </p>
          <p><strong>Adresse:</strong> ${adresse}</p>
          <p><strong>Numéro de téléphone:</strong> ${numeroTelephoneSalon}</p>
          <p><strong>Heures d'ouverture:</strong> ${horairesOuverture}</p>
        </div>
      </div>
    </div>
  `;

  salonDetailsContainer.innerHTML = detailsHTML;
  const favoriteIcon = document.getElementById('favoriteIcon');
  if (favoriteIcon) {
    favoriteIcon.addEventListener('click', toggleFavorite);
  } else {
    console.error('Failed to find the favorite icon for event binding.');
  }
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


// 2) Fonction toggleFavorite and adds it to favourite.html
function toggleFavorite() {
  const favoriteIcon = document.getElementById('favoriteIcon');
  favoriteIcon.classList.toggle('fas');
  favoriteIcon.classList.toggle('far');
  favoriteIcon.classList.toggle('has-text-warning');
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
    const imageUrl = `/images/salon${salonId}/haircut${i}.png`;
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
});