import {authCoiffeur, deconnexion, generateFooter, generateNavBarWithAuth} from "../../commun.js";

async function fetchCoiffeurId(email) {
    try {
        const response = await fetch(`/getCoiffeurId?email=${email}`);
        if (!response.ok) {
            throw new Error('Failed to fetch coiffeur ID');
        }
        const coiffeurId = await response.json();
        fetchReservationsBySalonId(coiffeurId)
    } catch (error) {
        console.error('Could not fetch coiffeur ID', error);
    }
}

async function fetchReservationsBySalonId(coiffeurId) {
    try {
        const response = await fetch(`/getReservationsByCoiffeurId?coiffeurId=${coiffeurId}`);
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

    const convertDateToISO = dateString => {
        const parts = dateString.split(' ');
        const datePart = parts[0];
        const timePart = parts[1].split('-')[0]; // Only take the start time
        return `${datePart}T${timePart}:00.000Z`;
    };

    const upcomingReservations = reservations.filter(reservation => {
        const reservationDate = new Date(convertDateToISO(reservation.dateHeureReservation));
        return reservationDate > currentDate;
    });

    const pastReservations = reservations.filter(reservation => {
        const reservationDate = new Date(convertDateToISO(reservation.dateHeureReservation));
        return reservationDate <= currentDate;
    });

    console.log(upcomingReservations);
    console.log(pastReservations);

    const upcomingBox = document.getElementById('upcomingBox');
    const historyBox = document.getElementById('historyBox');

    upcomingBox.innerHTML = generateReservationList(upcomingReservations);
    historyBox.innerHTML = generateReservationList(pastReservations);
}

function generateReservationList(reservations) {
    return reservations.map(reservation => `
        <div class="card">
            <header class="card-header">
                <p class="card-header-title">
                    Rendez-vous ID: ${reservation.reservationId} - ${reservation.dateHeureReservation}
                </p>
            </header>
            <div class="card-content">
                <div class="content">
                    <p><strong>Date et heure:</strong> ${reservation.dateHeureReservation}</p>
                    <p><strong>Durée:</strong> ${reservation.dureeReservation} minutes</p>
                    <p><strong>Coiffeur:</strong> ${reservation.coiffeurNom} ${reservation.coiffeurPrenom}</p>
                    <p><strong>Salon:</strong> ${reservation.nomSalon}</p>
                    <p><strong>Adresse:</strong> ${reservation.adresse}</p>
                    <p><strong>Coiffure:</strong> ${reservation.nomCoiffure}</p>
                    <p><strong>Description:</strong> ${reservation.descriptionCoiffure}</p>
                </div>
            </div>
            <footer class="card-footer">
                <a href="#" class="card-footer-item">Avis</a>
            </footer>
        </div>
    `).join('');
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
    fetchCoiffeurId(email);
});
