import { deconnexion, generateFooter, generateNavBarWithAuth } from '../../commun.js';

// Function to toggle the reservation popup
function togglePopup(active) {
  const popup = document.getElementById('reservationPopup');
  popup.classList.toggle('is-active', active);
}
document.getElementById('reservationButton').addEventListener('click', () => togglePopup(true));
document.querySelectorAll('.modal-close, .modal-background, #closePopup')
  .forEach(element => element.addEventListener('click', () => togglePopup(false)));


// Function to fetch and display salon details based on the salonId in the URL
async function fetchAndDisplaySalonDetails() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const salonId = urlParams.get('salonId');
    const response = await fetch(`/getSalonDataBySalonId?salonId=${salonId}`);
    if (!response.ok) throw new Error('Failed to fetch salon details');
    const salonDetails = await response.json();
    document.getElementById('salonName').textContent = salonDetails.nomSalon;
    document.getElementById('salonAddress').textContent = salonDetails.adresse;
    document.getElementById('salonPhoneNumber').textContent = salonDetails.numeroTelephoneSalon;
    document.getElementById('salonOpeningHours').textContent = salonDetails.horairesOuverture;
  } catch (error) {
    console.error('Error fetching or displaying salon details:', error);
  }
}


// Function to fetch and display salon photos based on the salonId in the URL
async function displaySalonPhotos(salonId, photoFiles) {
  const salonPhotosContainer = document.getElementById('salonPhotosContainer');
  const salonFolder = `salon${salonId}`;
  let galleryHTML = `<div class="columns is-multiline">`;

  photoFiles.forEach(photo => {
      const imageUrl = `/images/${salonFolder}/${photo}`;
      galleryHTML += `
          <div class="column is-4">
              <figure class="image is-4by3">
                  <img src="${imageUrl}" alt="Salon Photo">
              </figure>
          </div>
      `;
  });

  galleryHTML += `</div>`;
  salonPhotosContainer.innerHTML = galleryHTML;
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

// Function to add salon to favorites (you can replace this with your actual logic)
function addToFavorites() {
  console.log('Salon added to favorites');
}

// Function to remove salon from favorites (you can replace this with your actual logic)
function removeFromFavorites() {
  console.log('Salon removed from favorites');
}


// Function for authentication
function Auth() {
  if (!sessionStorage.getItem('token')) {
    window.location.href = '/connexion';
  }
}


// Initialization of the salonDetails page
document.addEventListener('DOMContentLoaded', () => {
  Auth();
  generateNavBarWithAuth();
  generateFooter();
  deconnexion();

  fetchAndDisplaySalonDetails();
  displaySalonPhotos();

  // Add click event listener to the star icon
  document.getElementById('favoriteIcon').addEventListener('click', toggleFavorite);
});
