import { deconnexion, generateFooter, generateNavBarWithAuth } from '../../commun.js';

// Function to toggle the reservation popup
function togglePopup(active) {
  const popup = document.getElementById('reservationPopup');
  popup.classList.toggle('is-active', active);
}
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('reservationButton').addEventListener('click', () => togglePopup(true));
  document.querySelectorAll('.modal-close, .modal-background, #closePopup')
    .forEach(element => element.addEventListener('click', () => togglePopup(false)));
});

// Function to display salon details on the page
function displaySalonDetails(salonDetails) {
  const detailsHTML = `
    <div class="card">
      <div class="card-content">
        <div class="content">
          <h1 class="title has-text-centered">${salonDetails.nomSalon}</h1>
          <p><strong>Salon de coiffure:</strong> ${salonDetails.nomSalon}
            <i id="favoriteIcon" class="far fa-star has-text-warning star"></i>
          </p>
          <p><strong>Adresse:</strong> ${salonDetails.adresse}</p>
          <p><strong>Numéro de téléphone:</strong> ${salonDetails.numeroTelephoneSalon}</p>
          <p><strong>Heures d'ouverture:</strong> ${salonDetails.horairesOuverture}</p>
        </div>
      </div>
    </div>
  `;
  const salonDetailsContainer = document.getElementById('salonDetails');
  salonDetailsContainer.innerHTML = detailsHTML;

  // Add click event listener to the star icon after it is added to the DOM
  document.getElementById('favoriteIcon').addEventListener('click', toggleFavorite);
}

// Fetch salon details using the salonId
async function fetchSalonDetails(salonId) {
  try {
    const response = await fetch(`/getSalonDataBySalonId?salonId=${salonId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch salon details:', error);
  }
}

// Initialize the page by fetching and displaying salon details
async function initPage() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const salonId = urlParams.get('salonId');
    if (!salonId) throw new Error("Salon ID is required");

    const salonDetails = await fetchSalonDetails(salonId);
    displaySalonDetails(salonDetails);
  } catch (error) {
    console.error('Error initializing page:', error);
  }
}

// Function to toggle the favorite status of the salon
function toggleFavorite() {
  const icon = document.getElementById('favoriteIcon');
  if (icon.classList.contains('far')) {
    icon.classList.remove('far');
    icon.classList.add('fas', 'has-text-warning'); // Change to solid star and yellow color
    addToFavorites(); // Add salon to favorites
  } else {
    icon.classList.remove('fas', 'has-text-warning');
    icon.classList.add('far');
    removeFromFavorites(); // Remove salon from favorites
  }
}

// Example functions to handle adding/removing favorites
function addToFavorites() {
  console.log('Salon added to favorites');
}

function removeFromFavorites() {
  console.log('Salon removed from favorites');
}

// Initialization of the salonDetails page
document.addEventListener('DOMContentLoaded', () => {
  generateNavBarWithAuth();
  generateFooter();
  deconnexion();
  initPage();
});
