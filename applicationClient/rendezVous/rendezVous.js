import {deconnexion, generateFooter, generateNavBarWithAuth} from "../../commun.js";

async function fetchAndPopulateReservationData() {
  try {
    const reservations = await fetchReservationData();
    populateReservationDetails(reservations);
  } catch (error) {
    console.error('Error fetching reservation data:', error);
    // Handle error
  }
}

async function fetchReservationData() {
  try {
    const response = await fetch('/getReservationData');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    throw new Error('Failed to fetch reservation data');
  }
}

function populateReservationDetails(reservations) {
  if (reservations.length > 0) {
    const reservation = reservations[0]; // Assuming only one reservation for simplicity
    document.getElementById('reservationId').textContent = reservation.reservationId;
    document.getElementById('dateTime').textContent = reservation.dateHeureReservation;
    document.getElementById('duration').textContent = reservation.dureeReservation;
    document.getElementById('clientName').textContent = `${reservation.clientNom} ${reservation.clientPrenom}`;
    document.getElementById('coiffeurName').textContent = `${reservation.coiffeurNom} ${reservation.coiffeurPrenom}`;
    document.getElementById('coiffure').textContent = reservation.nomCoiffure;
    document.getElementById('description').textContent = reservation.descriptionCoiffure;
    document.getElementById('estimatedDuration').textContent = reservation.dureeEstimee;
  } else {
    console.log('No reservations found.');
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fetchAndPopulateReservationData();
  generateFooter();
  generateNavBarWithAuth()
  deconnexion()
});
