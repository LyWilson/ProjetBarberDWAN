import { getNavbar } from '../../commun.js';

async function showSalons() {
  const lesSalons = document.getElementById('listeSalons');
  try {
    // Fetch salon data from the server
    const response = await fetch('/salon');
    if (!response.ok) {
      throw new Error('Failed to fetch salon data');
    }
    // Parse the JSON response
    const salons = await response.json();

    // Iterate over salon data and generate HTML for each salon
    salons.forEach(s => {
      const carteSalons = generateCarteSalons(s.nomSalon, s.adresse, s.numeroTelephoneSalon, s.horairesOuverture);
      lesSalons.insertAdjacentHTML('beforeend', carteSalons);
    });
  } catch (error) {
    console.error('Error fetching salons:', error);
  }
}

// Function to generate HTML for salon cards
function generateCarteSalons(nomSalon, adresse, numeroTelephoneSalon, horairesOuverture) {
  return `
  <div class="column is-4">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">${nomSalon}</p>
      </header>
      <div class="card-content">
        <div class="content">
          <p><b>Adresse:</b> ${adresse}</p>
          <p><b>Numéro de téléphone:</b> ${numeroTelephoneSalon}</p>
          <p><b>Heure d'ouverture:</b> ${horairesOuverture}</p>
        </div>
      </div>
    </div>
  </div>
  `;
}

function generateNavBar() {
  const navBar = document.getElementById('navigationBar');
  navBar.innerHTML = getNavbar();
}

// Wait for the DOM content to be loaded, then call showSalons
document.addEventListener("DOMContentLoaded", () => {
  showSalons();
  generateNavBar()
});
