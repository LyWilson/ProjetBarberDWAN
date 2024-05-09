import {authClient, deconnexion, generateFooter, generateNavBarWithAuth} from "../../commun.js";

document.addEventListener('DOMContentLoaded', function() {
    authClient();
    generateNavBarWithAuth();
    generateFooter();
    deconnexion();

    const form = document.getElementById('submit');
    form.addEventListener('click', async function(event) {
        event.preventDefault();
        let reservationId = window.location.search.split('=')[1];

        const result = await fetch(`/getReservationData/${reservationId}`);
        if (!result.ok) {
            throw new Error('Network response was not ok');
        }
        const reservation = await result.json();

        const data= {
            "coiffeurId": document.getElementById('barber').value,
            "clientId": reservation[0].clientId,
            "note": document.getElementById('note').value,
            "avis": document.getElementById('comment').value}

        const response = await fetch(`/ajouterAvis`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        alert('avis deposé avec succès');
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
            const SalonId = reservation[0].salonId;

            coiffeur.innerHTML = `<strong>Coiffeur:  </strong> ${reservation[0].coiffeurPrenom} ${reservation[0].coiffeurNom}`;
            salon.innerHTML = `<strong>Salon:  </strong> ${reservation[0].nomSalon}`;
            address.innerHTML = `<strong>Adresse:  </strong> ${reservation[0].adresse}`;
            style.innerHTML = `<strong>Style:  </strong> ${reservation[0].nomCoiffure}`;
            description.innerHTML = `<strong>Description:  </strong> ${reservation[0].descriptionCoiffure}`;
            duration.innerHTML = `<strong>Durée : </strong> ${reservation[0].dureeReservation} minutes`;

            try {
                const response = await fetch(`/getBabierDataBySalonId/${SalonId}`);
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

        } catch (error) {
            console.error('Error fetching reservation data:', error);
        }
    }

        fetchReservationData();

});
