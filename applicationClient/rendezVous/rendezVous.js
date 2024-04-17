import { deconnexion, generateFooter, generateNavBarWithAuth } from "../../commun.js";

const token = sessionStorage.getItem('token');

// Fonction pour décoder le token 
function parseJwt(token) {
  try {
    return JSON.parse(decodeURIComponent(atob(token.split('.')[1].replace('-', '+').replace('_', '/')).split('').map(c => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`).join('')));
  } catch (e) {
    return null;
  }
}

// Function to get all reservations for the user
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
      throw new Error('Failed to fetch reservations');
    }
    const reservations = await response.json();
    if (reservations.length > 0) {
      reservations.forEach(reservation => {
        generateCarteReservation(reservation.dateHeureReservation, reservation.coiffeurPrenom, reservation.coiffeurNom, reservation.nomSalon, reservation.adresse, reservation.nomCoiffure, reservation.descriptionCoiffure, reservation.dureeReservation);
      });
    } else {
      console.log('No reservation data received');
    }
  } catch (error) {
    console.error(error);
  }
}

function generateCarteReservation(dateHeureReservation, coiffeurPrenom, coiffeurNom, nomSalon, adresse, nomCoiffure, descriptionCoiffure, dureeReservation) {
  const reservationsContainer = document.getElementById('reservationsContainer');

  const date = new Date(dateHeureReservation);
  const dateFormatted = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} à ${date.getHours().toString().padStart(2, '0')}h${date.getMinutes().toString().padStart(2, '0')}`;
  const reservationHtml = `
  <div class="card reservation-card">
      <header class="card-header">
          <p class="card-header-title">
              RÉSERVATION: ${dateFormatted}
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


document.addEventListener("DOMContentLoaded", () => {
  generateNavBarWithAuth();
  generateFooter();
  deconnexion();
  infoReservation();
});
