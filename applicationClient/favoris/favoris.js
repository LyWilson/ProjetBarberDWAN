import { deconnexion, generateFooter, generateNavBarWithAuth } from '../../commun.js';

// Function to fetch and display favorite salons for the logged-in user
async function loadFavoriteSalons() {
  const lesSalons = document.getElementById('favoriteSalonsContainer');
  try {
    const token = sessionStorage.getItem('authToken'); // Retrieve the token from sessionStorage
    const response = await fetch('/getFavoriteSalons', {
      headers: {
        'Authorization': `Bearer ${token}`, // Include the token in the headers
        'Content-Type': 'application/json'
      }
    }); 
    if (!response.ok) {
      throw new Error('Failed to fetch favorite salon data');
    }
    const favoriteSalons = await response.json();

    if (favoriteSalons.length === 0) {
      lesSalons.innerHTML = '<p class="has-text-centered">Vous n\'avez pas encore ajouté de salons aux favoris.</p>';
      return;
    }

    favoriteSalons.forEach(salon => {
      const carteSalons = generateSalonCard(salon.salonId, salon.nomSalon, salon.adresse, salon.horairesOuverture);
      lesSalons.insertAdjacentHTML('beforeend', carteSalons);
    });    
  } catch (error) {
    console.error('Error fetching favorite salons:', error);
    lesSalons.innerHTML = '<p class="has-text-centered">Impossible de charger vos salons favoris.</p>';
  }
}


// Function to generate HTML for salon cards
function generateSalonCard(salonId, nomSalon, adresse, horairesOuverture) {
  const imageUrl = `/images/salon${salonId}/${salonId}.png`; // Ensure the image path structure is correct
  return `
  <div class="column is-3">
      <div class="card">
          <a href="salonDetails.html?salonId=${salonId}">
              <div class="card-image">
                  <figure class="image is-4by3">
                      <img src="${imageUrl}" alt="Photo du salon: ${nomSalon}">
                  </figure>
              </div>
              <header class="card-header">
                  <p class="card-header-title">${nomSalon}</p>
              </header>
              <div class="card-content">
                  <div class="content">
                      <p><b>Adresse:</b> ${adresse}</p>
                      <p><b>Heure d'ouverture:</b> ${horairesOuverture}</p>
                  </div>
              </div>
          </a>
      </div>
  </div>
  `;
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  generateNavBarWithAuth();
  generateFooter();

  loadFavoriteSalons();
});
