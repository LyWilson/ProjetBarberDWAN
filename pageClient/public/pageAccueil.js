// Importation des modules
const { getNavBar } = require('../../commun.js');
const getSalonDeCoiffure = require('../server/pageClient.js');

// Fonction pour montrer le nav bar par id="navBar"
function showNavBar() {
  const navBar = getElementById('navBar');
  navBar.innerHTML = getNavBar();
}




// Fonction pour générer les cartes des salons de coiffure
function generateSalonCoiffureCards(nomSalon, adresse, numeroTelephoneSalon, horairesOuverture) {
  return `
  <div class="column is-3-desktop is-4-tablet is-12-mobile">
    <div class="card-image">
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <p class="title is-4 no-padding">${nomSalon}</p>
            <p class="subtitle is-6"><b>Adresse: </b>${adresse}</p>
            <p class="subtitle is-6"><b>Numéro de téléphone: </b>${numeroTelephoneSalon}</p>
            <p class="subtitle is-6"><b>Heure d'ouverture: </b>${horairesOuverture}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
`;
}

// Fonction pour montrer la liste des salons de coiffure par id="listeSalons"
async function showListeSalonCoiffure() {
  try {
    const salons = await getSalonDeCoiffure();
    const container = document.getElementById('listeSalons');

    salons.forEach(salon => {
      const cardHTML = generateSalonCoiffureCards(salon.nomSalon, salon.adresse, salon.numeroTelephoneSalon, salon.horairesOuverture);
      container.innerHTML += cardHTML;
    });
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Fonction pour test
async function test() {
  try {
    const response = await fetch('/salon');
    if (response.ok) {
      const salons = await response.json();
      console.log(salons);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Initialisation du website
document.addEventListener("DOMContentLoaded", () => {
  showNavBar();
  test();
});
