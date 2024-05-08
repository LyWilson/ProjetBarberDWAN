import {authCoiffeur, deconnexion, generateFooter, generateNavBarWithAuth} from "../../commun.js";

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
    console.log(reservations);
    const currentDate = new Date();
    const upcomingReservations = reservations.filter(reservation => new Date(reservation.dateHeureReservation) > currentDate);
    const pastReservations = reservations.filter(reservation => new Date(reservation.dateHeureReservation) <= currentDate);

    const upcomingBox = document.getElementById('upcomingBox');
    const historyBox = document.getElementById('historyBox');

    upcomingBox.innerHTML = generateReservationList(upcomingReservations);
    historyBox.innerHTML = generateReservationList(pastReservations);
}

function generateReservationList(reservations) {
    return `
        <ul>
            ${reservations.map(reservation => `
                <li>
                    <p><b>Rendez-vous ID:</b> ${reservation.reservationId}</p>
                    <p><b>Date et heure:</b> ${reservation.dateHeureReservation}</p>
                    <p><b>Durée:</b> ${reservation.dureeReservation} minutes</p>
                    <p><b>Coiffeur:</b> ${reservation.coiffeurNom} ${reservation.coiffeurPrenom}</p>
                    <p><b>Salon:</b> ${reservation.nomSalon}</p>
                    <p><b>Adresse:</b> ${reservation.adresse}</p>
                    <p><b>Coiffure:</b> ${reservation.nomCoiffure}</p>
                    <p><b>Description de la coiffure:</b> ${reservation.descriptionCoiffure}</p>
                </li></br></br>
            `).join('')}
        </ul>
    `;
}

document.addEventListener("DOMContentLoaded", async function(event) {
    authCoiffeur();
    event.preventDefault();
    const token = sessionStorage.getItem('tokenCoiffeur');
    const info = token => decodeURIComponent(atob(token.split('.')[1].replace('-', '+').replace('_', '/')).split('').map(c => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`).join(''));
    const email = JSON.parse(info(token)).email;
    const resultat = await fetch(`/getSalonId?email=${email}`)
    const salonId = await resultat.json();
    generateFooter();
    generateNavBarWithAuth()
    deconnexion()
    fetchReservationsBySalonId(salonId);
});
