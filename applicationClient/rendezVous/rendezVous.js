import { deconnexion, generateFooter, generateNavBarWithAuth } from "../../commun.js";

const token = sessionStorage.getItem('token');
console.log(token);
// Fonction pour décoder le token
function parseJwt(token) {
  try {
    return JSON.parse(decodeURIComponent(atob(token.split('.')[1].replace('-', '+').replace('_', '/')).split('').map(c => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`).join('')));
  } catch (e) {
    return null;
  }
}
function modifierReservation(reservation) {
  try {
    window.location.href = `/updateRendezVous/?reservationId=${reservation}`;
  } catch (error) {
    console.error(error);
  }
}

function deleteReservationId(reservation) {
  try {
    fetch(`/deleteReservation/?reservationId=${reservation}`, {
      method: 'GET',
    }).then(response => {
      if (response.ok) {
        window.location.reload();
      } else {
        throw new Error('Failed to delete reservation');
      }
    });
  } catch (error) {
    console.error(error);
  }
}
// Function to get all reservations for the user
async function infoReservation() {
  try {
    const userData = parseJwt(token);
    console.log(userData)
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
    console.log(reservations)
    if (reservations.length > 0) {
      reservations.forEach(reservation => {
        generateCarteReservation(reservation.reservationId, reservation.dateHeureReservation, reservation.coiffeurPrenom, reservation.coiffeurNom, reservation.nomSalon, reservation.adresse, reservation.nomCoiffure, reservation.descriptionCoiffure, reservation.dureeReservation, reservation.idReservation);
      });
    } else {
      console.log('No reservation data received');
    }
  } catch (error) {
    console.error(error);
  }
}

function generateCarteReservation(reservationId, dateHeureReservation, coiffeurPrenom, coiffeurNom, nomSalon, adresse, nomCoiffure, descriptionCoiffure, dureeReservation, reservation) {
  const reservationsContainer = document.getElementById('reservationsContainer');

  const date = new Date(dateHeureReservation);
  const options = { year: 'numeric', month: 'long', day: 'numeric'}
  const dateFormatted = date.toLocaleDateString('fr-FR', options) + ` à ${date.getHours().toString().padStart(2, '0')}h${date.getMinutes().toString().padStart(2, '0')}`;

  const reservationHtml = `
  <div class="card reservation-card">
      <header class="card-header">
          <p class="card-header-title">
              RÉSERVATION: ${dateFormatted}
          </p>
      </header>
      <div class="card-content">
          <div class="content">
              <p><strong>Coiffeur:  </strong>${coiffeurPrenom} ${coiffeurNom}</p>
              <p><strong>Salon:  </strong>${nomSalon}</p>
              <p><strong>Adresse:  </strong>${adresse}</p>
              <p><strong>Style de coiffure:  </strong>${nomCoiffure}</p>
              <p><strong>Description:  </strong>${descriptionCoiffure}</p>
              <p><strong>Durée de la réservation:  </strong>${dureeReservation} minutes</p>
          </div>
          <div class="card-footer">
            <a class="card-footer-item" id="btnModReservation${reservationId}">Modifier la réservation</a>
            <a class="card-footer-item annuler-reservation" id="btnDeleteReservation${reservationId}")>Annuler la réservation</a>
          </div>
      </div>
  </div>`;
  reservationsContainer.insertAdjacentHTML('beforeend', reservationHtml);

  const btnDeleteReservation = document.getElementById(`btnDeleteReservation${reservationId}`);
  btnDeleteReservation.addEventListener('click', () => {
    deleteReservationId(reservationId);
  });

  const btnModReservation = document.getElementById(`btnModReservation${reservationId}`);
    btnModReservation.addEventListener('click', () => {
        modifierReservation(reservationId);
    });
}


document.addEventListener("DOMContentLoaded", () => {
  generateNavBarWithAuth();
  generateFooter();
  deconnexion();

  infoReservation();
});
