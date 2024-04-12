import { deconnexion, generateFooter, generateNavBarWithAuth } from "../../commun.js";

// Pour obtenir les informations du token
const token = sessionStorage.getItem('token');
const info = token => decodeURIComponent(atob(token.split('.')[1].replace('-', '+').replace('_', '/')).split('').map(c => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`).join(''));

// Fonction pour obtenir les données de réservation
async function infoReservation() {
    try {
        const email = JSON.parse(info(token)).email;
        const response = await fetch(`/getReservationData?email=${email}`);
        if (!response.ok) {
            throw new Error('Failed to fetch reservation data');
        }
        const reservations = await response.json();
        populateReservationDetails(reservations);
    } catch (error) {
        console.error(error);
    }
}

function populateReservationDetails(reservations) {
    const reservationsContainer = document.getElementById('reservationsContainer');
    reservationsContainer.innerHTML = '';

    if (reservations.length > 0) {
        reservations.forEach(reservation => {
            const reservationHtml = `
              <div class="card">
                  <header class="card-header">
                      <p class="card-header-title">
                          Date et heure de la réservation: ${reservation.dateHeureReservation}
                      </p>
                  </header>
                  <div class="card-content">
                      <div class="content">
                          <p>Coiffeur: <strong>${reservation.coiffeurPrenom} ${reservation.coiffeurNom}</strong></p>
                          <p>Salon: <strong>${reservation.nomSalon}</strong></p>
                          <p>Adresse: <strong>${reservation.adresse}</strong></p>
                          <p>Style de coiffure: <strong>${reservation.nomCoiffure}</strong></p>
                          <p>Description: <strong>${reservation.descriptionCoiffure}</strong></p>
                          <p>Durée de la réservation: <strong>${reservation.dureeReservation} minutes</strong></p>
                      </div>
                  </div>
              </div>`;
            reservationsContainer.insertAdjacentHTML('beforeend', reservationHtml);
        });
    } else {
        const noReservationsHtml = `<p class="has-text-centered">Vous n'avez pas encore de réservations.</p>`;
        reservationsContainer.insertAdjacentHTML('beforeend', noReservationsHtml);
    }
}


document.addEventListener("DOMContentLoaded", () => {
    generateNavBarWithAuth();
    generateFooter();
    deconnexion();

    infoReservation();
});
