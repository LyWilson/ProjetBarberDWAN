import {authCoiffeur, deconnexion, generateFooter, generateNavBarWithAuth} from "../../commun";

document.addEventListener('DOMContentLoaded', function () {
    authCoiffeur();
    generateNavBarWithAuth();
    generateFooter();
    deconnexion();

    const form = document.getElementById('submit');
    form.addEventListener('click', async function(event) {
        event.preventDefault();
        let reservationId = window.location.search.split('=')[1];

        const result = await fetch(`/getReservationDataClient/${reservationId}`);
        if (!result.ok) {
            throw new Error('Network response was not ok');
        }
        const reservation = await result.json();

        const data = {
            "clientId": reservation[0].clientId,
            "note": document.getElementById('note'),value,
            "avis": document.getElementById('comment').value
        }

        const response = await fetch('/ajouterAvisCoiffeur', {
            method: 'POST',
            headers: {
                'Cpntent-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        alert('avis envoyé avec succès');
        window.location.href = '/historique';
    });

    async function fetchReservationData2() {
        let reservationId = window.location.search.split('=')[1];
        try{
            const response = await fetch(`/getReservationsByCoiffeurId/${reservationId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const reservation = await response.json();
            const client = document.getElementById('client');
            const nom = document.getElementById('nom');
            const prenom = document.getElementById('prenom');
            const clientId = reservation[0].clientId

            client.innerHTML = <strong>Client: </strong> ${reservation[0].clientPrenom} ${reservation[0].clientNom}

            try {
                const response = await fetch(`/getClientDataByClientId/${clientId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const Clients = await response.json();
                const select = document.getElementById('');
            } catch (error) {
                console.error('Error fetching the client:', error);
            }
        } catch (error) {
            console.error('Error fetching reservation data', error);
        }
    }
    fetchReservationData2()
})
