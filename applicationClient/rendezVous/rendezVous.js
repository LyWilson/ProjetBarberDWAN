import { generateNavBar } from '../../commun.js';

// Fetch reservation data from the server
async function fetchReservationData() {
    try {
        const response = await fetch('/getReservationData');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching reservation data:', error);
        return [];
    }
}

// Display reservation data in the table
async function displayReservationData() {
    const reservationTableBody = document.getElementById('reservationBody');
    reservationTableBody.innerHTML = ''; // Clear previous data

    const reservations = await fetchReservationData();

    reservations.forEach(reservation => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${reservation.reservationId}</td>
            <td>${new Date(reservation.dateHeureReservation).toLocaleString()}</td>
            <td>${reservation.dureeReservation} minutes</td>
            <td>${reservation.clientNom} ${reservation.clientPrenom}</td>
            <td>${reservation.coiffeurNom} ${reservation.coiffeurPrenom}</td>
            <td>${reservation.nomCoiffure}</td>
            <td>${reservation.descriptionCoiffure}</td>
            <td>${reservation.dureeEstimee} minutes</td>
        `;
        reservationTableBody.appendChild(row);
    });
}

// Initialisation de la page de réservation du client
document.addEventListener("DOMContentLoaded", () => {
    generateNavBar();
    displayReservationData();
  });

