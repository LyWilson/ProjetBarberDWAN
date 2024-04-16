import { deconnexion, generateFooter, generateNavBarWithAuth } from "../../commun.js";

const token = sessionStorage.getItem('token');

const parseJwt = token => {
  try {
    return JSON.parse(decodeURIComponent(atob(token.split('.')[1].replace('-', '+').replace('_', '/')).split('').map(c => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`).join('')));
  } catch (e) {
    return null;
  }
};

// Fonction pour obtenir les informations de la réservation de l'utilisateur
async function infoReservation() {
  try {
    const userData = parseJwt(token);
    if (!userData) {
      console.error('Invalid token');
      return;
    }
    const email = userData.email;
    const response = await fetch(`/getReservationData?email=${encodeURIComponent(email)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user reservation');
    }
    const reservation = await response.json();
    if (reservation) {
      populateReservationDetails(reservation.dateHeureReservation, reservation.coiffeurPrenom, reservation.coiffeurNom, reservation.nomSalon, reservation.adresse, reservation.nomCoiffure, reservation.descriptionCoiffure, reservation.dureeReservation);
    } else {
      console.log('No reservation data received');
    }
  } catch (error) {
    console.error(error);
  }
}

// Function that populates reservation details directly from arguments
function populateReservationDetails(dateHeureReservation, coiffeurPrenom, coiffeurNom, nomSalon, adresse, nomCoiffure, descriptionCoiffure, dureeReservation) {
  const reservationsContainer = document.getElementById('reservationsContainer');
  reservationsContainer.innerHTML = '';

  const reservationHtml = `
    <div class="card">
        <header class="card-header">
            <p class="card-header-title">
                Date et heure de la réservation: ${dateHeureReservation}
            </p>
        </header>
        <div class="card-content">
            <div class="content">
                <p>Coiffeur: <strong>${coiffeurPrenom} ${coiffeurNom}</strong></p>
                <p>Salon: <strong>${nomSalon}</strong></p>
                <p>Adresse: <strong>${adresse}</strong></p>
                <p>Style de coiffure: <strong>${nomCoiffure}</strong></p>
                <p>Description: <strong>${descriptionCoiffure}</strong></p>
                <p>Durée de la réservation: <strong>${dureeReservation} minutes</strong></p>
            </div>
        </div>
    </div>`;
  reservationsContainer.insertAdjacentHTML('beforeend', reservationHtml);
}

// Initialisation de la page avec les réservations de l'utilisateur
document.addEventListener("DOMContentLoaded", () => {
  generateNavBarWithAuth();
  generateFooter();
  deconnexion();
  infoReservation();
});
