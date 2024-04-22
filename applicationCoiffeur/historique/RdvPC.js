import {deconnexion, generateFooter, generateNavBarWithAuth} from "../../commun.js";

const salonId = 1;

async function fetchReservationsBySalonId(salonId) {
    try {
        const response = await fetch(`/getReservationsBySalonId?salonId=${salonId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch reservations by salon ID');
        }
        const reservations = await response.json();
        updateReservationsSection(reservations);
    } catch (error) {
        console.error('Could not fetch reservations by salon ID', error);
    }
}

function updateReservationsSection(reservations) {
    const historyBox = document.querySelector('.box');
    historyBox.innerHTML = `
        <p class="menu-label">Historique des rendez-vous</p>
        <div class="content">
            <ul>
                ${reservations.map(reservation => `
                    <li>
                        <p>Rendez-vous ID: ${reservation.reservationId}</p>
                        <p>Date et heure: ${reservation.dateHeureReservation}</p>
                        <p>Durée: ${reservation.dureeReservation} minutes</p>
                        <p>Coiffeur: ${reservation.coiffeurNom} ${reservation.coiffeurPrenom}</p>
                        <p>Salon: ${reservation.nomSalon}</p>
                        <p>Adresse: ${reservation.adresse}</p>
                        <p>Coiffure: ${reservation.nomCoiffure}</p>
                        <p>Description de la coiffure: ${reservation.descriptionCoiffure}</p>
                    </li></br>
                `).join('')}
            </ul>
        </div>
    `;
}

document.addEventListener("DOMContentLoaded", () => {
    generateFooter();
    generateNavBarWithAuth()
    deconnexion()
    fetchReservationsBySalonId(salonId);
});
