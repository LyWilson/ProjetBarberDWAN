// Importation des modules
import { deconnexion, generateFooter, generateNavBarWithAuth } from '../../commun.js';

// 1) Fonction pour charger les détails du salonId à partir de l'URL 
async function loadSalonDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const salonId = urlParams.get('salonId');
  if (!salonId) {
    console.error('No salon ID provided.');
    document.getElementById('salonDetails').innerHTML = '<p>No salon details available.</p>';
    return;
  }
  
  try {
    const response = await fetch(`/getSalonDetails?salonId=${salonId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const salonDetails = await response.json();
    displaySalonDetails(salonDetails.nomSalon, salonDetails.adresse, salonDetails.numeroTelephoneSalon, salonDetails.horairesOuverture);
  } catch (error) {
    console.error('Error fetching salon details:', error);
    document.getElementById('salonDetails').innerHTML = `<p>Error loading salon details: ${error.message}</p>`;
  }
}

// 2) Fonction pour afficher les détails du salon
async function displaySalonDetails(nomSalon, adresse, numeroTelephoneSalon, horairesOuverture) {
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
  const salonDetailsContainer = document.getElementById('salonDetails');
  salonDetailsContainer.innerHTML = detailsHTML;

  document.getElementById('favoriteIcon').addEventListener('click', toggleFavorite);
};

// 3) Fonction toggleFavorite and adds it to favourite.html
function toggleFavorite() {
  const favoriteIcon = document.getElementById('favoriteIcon');
  favoriteIcon.classList.toggle('fas');
  favoriteIcon.classList.toggle('far');
  favoriteIcon.classList.toggle('has-text-warning');
}



// 4) Fonction pour afficher le popup de réservation
function togglePopup(active) {
  const popup = document.getElementById('reservationPopup');
  popup.classList.toggle('is-active', active);
}
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('reservationButton').addEventListener('click', () => togglePopup(true));
  document.querySelectorAll('.modal-close, .modal-background, #closePopup')
    .forEach(element => element.addEventListener('click', () => togglePopup(false)));
});



// Initialisation des fonctions au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
  generateNavBarWithAuth();
  generateFooter();
  deconnexion();
  
  loadSalonDetails(); 
});