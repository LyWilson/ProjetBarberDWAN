import { deconnexion, generateFooter, generateNavBarWithAuth } from '../../commun.js';

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
      const carteSalons = generateCarteSalons(s.salonId, s.nomSalon, s.adresse, s.horairesOuverture);
      lesSalons.insertAdjacentHTML('beforeend', carteSalons);
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



function Auth() {
  if (!sessionStorage.getItem('token')) {
    window.location.href = '/connexion';
  }
}

// Fonction pour filtrer les salons 
function filtrerSalons() {
  const searchInput = document.querySelector('.navbar-item input[type="text"]');
  const searchValue = searchInput.value.toLowerCase().trim();

  const salons = document.querySelectorAll('.column.is-3');

  salons.forEach(salon => {
    const salonName = salon.querySelector('.card-header-title').textContent.toLowerCase();
    const salonAddress = salon.querySelector('.content p:first-child').textContent.toLowerCase();

    if (salonName.includes(searchValue) || salonAddress.includes(searchValue)) {
      salon.style.display = "block"; 
    } else {
      salon.style.display = "none"; 
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  Auth();
  generateNavBarWithAuth();
  generateFooter();
  showSalons();
  deconnexion();
  document.addEventListener('input', filtrerSalons)
});