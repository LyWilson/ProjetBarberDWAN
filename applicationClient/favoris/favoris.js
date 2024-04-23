import { deconnexion, generateFooter, generateNavBarWithAuth } from '../../commun.js';

const token = sessionStorage.getItem('token');

// Function to decode the token
const info = token => JSON.parse(decodeURIComponent(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))));

// Function to fetch and display favorite salons for the logged-in user
async function loadSalonFavoris() {
  const lesSalonsFavoris = document.getElementById('favoriteSalonsContainer');
  try {
    const userData = info(token);
    if (!userData) {
      console.error('Invalid token');
      return;
    }
    const email = userData.email;
    const response = await fetch(`/getSalonFavoris?email=${encodeURIComponent(email)}`);
    console.log(response)
    if (!response.ok) {
      throw new Error('Failed to fetch favorite salon data');
    }
    const salons = await response.json();

    salons.forEach(s => {
      const carteSalons = generateCarteSalons(s.salonId, s.nomSalon, s.adresse, s.horairesOuverture);
      lesSalonsFavoris.insertAdjacentHTML('beforeend', carteSalons);
    });
  } catch (error) {
    console.error('Error fetching salons:', error);
  }
}

// Function to generate HTML for salon cards
function generateCarteSalons(salonId, nomSalon, adresse, horairesOuverture) {
  const imageUrl = `/images/salon${salonId}/${salonId}.png`;
  return `
  <div class="column is-3">
    <div class="card">
      <a href="salonDetails?salonId=${salonId}">
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
  deconnexion();

  loadSalonFavoris();
});
