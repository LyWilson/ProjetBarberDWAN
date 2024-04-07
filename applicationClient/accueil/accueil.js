import { generateNavBar } from '../../commun.js';

// Fonction pour afficher les salons
async function showSalons() {
  const lesSalons = document.getElementById('listeSalons');
  try {
    const response = await fetch('/getSalonData');
    if (!response.ok) {
      throw new Error('Failed to fetch salon data');
    }
    const salons = await response.json();

    salons.forEach(s => {
      const carteSalons = generateCarteSalons(s.salonId, s.nomSalon, s.adresse, s.numeroTelephoneSalon, s.horairesOuverture);
      lesSalons.insertAdjacentHTML('beforeend', carteSalons);
    });
  } catch (error) {
    console.error('Error fetching salons:', error);
  }
}

// Function to generate HTML for salon cards
function generateCarteSalons(salonId, nomSalon, adresse, numeroTelephoneSalon, horairesOuverture) {
  return `
  <div class="column is-4">
    <div class="card">
    <a href="salonDetails?salonId=${salonId}">
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



// Initialisation de la page d'accueil du client
document.addEventListener("DOMContentLoaded", () => {
  generateNavBar();
  showSalons();
});
