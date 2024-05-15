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
/*
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
    return `
        <ul>
            ${reservations.map(reservation => `
                <div>
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
                </div>
                <div>
                    <a class="card-footer-item" id="btnHistoryReservation${reservation}">Compléter</a>
                    <a class="card-footer-item" id="btnAvis${reservation}">Donner un avis</a>
                </div>
            `).join('')}
        </ul>
    `;
}
*/

function genCarteReservationAVenir(reservation) {
    console.log(reservation)
    const reservationsContainer = document.getElementById('upcomingBox');

    // Séparer la date et l'heure de la réservation
    const [datePart, timePart, nothing, timePartEnd] = dateHeureReservation.split(' ');
    const [year, month, day] = datePart.split('-');

    // Obtenir le nom du mois
    const months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
    const monthName = months[parseInt(month, 10) - 1];

    // Construction de la carte HTML de réservation
    const reservationHtml = `
    <div class="card reservation-card">
        <header class="card-header">
            <p class="card-header-title">
                RÉSERVATION: ${parseInt(day, 10)} ${monthName} ${year} à ${timePart} - ${timePartEnd}
            </p>
        </header>
        <div class="card-content">
            <div class="content">
                <p><strong>Coiffeur : </strong>${coiffeurPrenom} ${coiffeurNom}</p>
                <p><strong>Salon : </strong>${nomSalon}</p>
                <p><strong>Adresse : </strong>${adresse}</p>
                <p><strong>Style de coiffure : </strong>${nomCoiffure}</p>
                <p><strong>Description : </strong>${descriptionCoiffure}</p>
                <p><strong>Durée de la réservation : </strong>${dureeReservation} minutes</p>
            </div>
            <div class="card-footer">
              <a class="card-footer-item" id="btnHistoryReservation${reservationId}">Transférer à l'historique</a>
              <a class="card-footer-item" id="btnAvis${reservationId}">Donner un avis</a>
            </div>
        </div>
    </div>`;

    // Insérer la carte de réservation dans le conteneur des réservations
    upcomingBox.insertAdjacentHTML('beforeend', reservationHtml);

    // Ajouter un écouteur d'événement pour le bouton de transfert à l'historique
    const btnHistoryReservation = document.getElementById(`btnHistoryReservation${reservationId}`);
    btnHistoryReservation.addEventListener('click', () => {
        transferToHistory(reservationId);
    });

    // Ajouter un écouteur d'événement pour le bouton de donner un avis
    const btnAvis = document.getElementById(`btnAvis${reservationId}`);
    btnAvis.addEventListener('click', () => {
        donnerAvis(reservationId);
    });
}

// Function to transfer the reservation to the history section
function transferToHistory(reservationId) {
    // Your code to transfer the reservation to the history section goes here
    // Example:
    alert(`Transferring reservation ID: ${reservationId} to history`);
    // Implement the actual logic to transfer the reservation to the history
}

// Function to give a review to the client
function donnerAvis(reservationId) {
    // Your code to give a review to the client goes here
    // Example:
    alert(`Giving review for reservation ID: ${reservationId}`);
    // Implement the actual logic to give a review to the client
}

function updateReservationsSection(reservations) {
    console.log(reservations);
    const currentDate = new Date();

    const convertDateToISO = dateString => {
        const parts = dateString.split(' ');
        const datePart = parts[0];
        const timePart = parts[1].split('-')[0];
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

    upcomingBox.innerHTML = upcomingReservations.map(reservation => genCarteReservationAVenir(reservation)).join('');
    historyBox.innerHTML = pastReservations.map(reservation => genCarteReservationAVenir(reservation)).join('');
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
