import {authClient, deconnexion, generateFooter, generateNavBarWithAuth} from "../../commun.js";

document.addEventListener('DOMContentLoaded', function() {
    authClient();
    generateNavBarWithAuth();
    generateFooter();
    deconnexion();
    fetchBarbers();
    fetchHairstyles();

    async function fetchBarbers() {
        let SalonId = window.location.search.split('=')[1];
        try {
            const response = await fetch(`/getBabierData/?salonId=${SalonId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const barbers = await response.json();
            const select = document.getElementById('barber');
            barbers.forEach(barber => {
                const option = document.createElement('option');
                option.value = barber.coiffeurId;
                option.textContent = `${barber.nom} ${barber.prenom}`;
                select.appendChild(option);
            });
        } catch (error) {
            console.error('Error fetching barbers:', error);
        }
    }

    async function fetchHairstyles() {
        try {
            const response = await fetch('/getCoiffurePreEtablieData');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const hairstyles = await response.json();
            const select = document.getElementById('hairstyle');
            hairstyles.forEach(hairstyle => {
                const option = document.createElement('option');
                option.value = hairstyle.coiffureId;
                option.textContent = hairstyle.nomCoiffure;
                select.appendChild(option);
            });
        } catch (error) {
            console.error('Error fetching hairstyles:', error);
        }
    }

    const form = document.getElementById('submit');
    form.addEventListener('click', async function(event) {
        event.preventDefault();
        let reservationId = window.location.search.split('=')[1];
        const token = sessionStorage.getItem('token');
        const info = token => decodeURIComponent(atob(token.split('.')[1].replace('-', '+').replace('_', '/')).split('').map(c => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`).join(''));
        const email = JSON.parse(info(token)).email;
        const clientIdResponse = await fetch(`/getClientId?email=${email}`);
        const clientId = await clientIdResponse.json();
        const coiffeurId = document.getElementById('barber').value;
        const coiffureId = document.getElementById('hairstyle').value;
        const date = document.getElementById('appointmentDate').value;
        const time = document.getElementById('appointmentTime').value;
        const data= {
            "clientId": clientId,
            "coiffeurId": coiffeurId,
            "coiffureId": coiffureId,
            "date": date,
            "heure": time,
            "reservationId": reservationId
        }
        const response = await fetch('/modifierRendezVous', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),

        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        alert('modification de la Réservation a effectuée avec succès!');
        window.location.href = '/rendezVous';


    });

    async function fetchReservationData() {
        let reservationId = window.location.search.split('=')[1];
        try {
            const response = await fetch(`/getReservationData/${reservationId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const reservation = await response.json();
            const coiffeur = document.getElementById('coiffeur');
            const salon = document.getElementById('salon');
            const address = document.getElementById('address');
            const style = document.getElementById('style');
            const description = document.getElementById('description');
            const duration = document.getElementById('duree');

            coiffeur.innerHTML = `<strong>Coiffeur:  </strong> ${reservation[0].coiffeurPrenom} ${reservation[0].coiffeurNom}`;
            salon.innerHTML = `<strong>Salon:  </strong> ${reservation[0].nomSalon}`;
            address.innerHTML = `<strong>Adresse:  </strong> ${reservation[0].adresse}`;
            style.innerHTML = `<strong>Style:  </strong> ${reservation[0].nomCoiffure}`;
            description.innerHTML = `<strong>Description:  </strong> ${reservation[0].descriptionCoiffure}`;
            duration.innerHTML = `<strong>Durée : </strong> ${reservation[0].dureeReservation} minutes`;

        } catch (error) {
            console.error('Error fetching reservation data:', error);
        }
    }

    fetchReservationData();
});
