import {authCoiffeur, deconnexion, generateFooter, generateNavBarWithAuth} from "../../commun.js";

async function getCoiffeurId(email) {
    try {
        const response = await fetch(`/getCoiffeurId?email=${email}`);
        if (response.ok) {
            return await response.json();
        }
    } catch (error) {
        console.error('Failed to get coiffeur ID:', error);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    authCoiffeur();
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
        console.log(reservation);

        const token = sessionStorage.getItem('tokenCoiffeur');
        const info = token => decodeURIComponent(atob(token.split('.')[1].replace('-', '+').replace('_', '/')).split('').map(c => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`).join(''));
        const email = JSON.parse(info(token)).email;
        const coiffeurId = await getCoiffeurId(email);

        const data = {
            "coiffeurId": coiffeurId,
            "clientId": reservation[0].clientId,
            "note": document.getElementById('note').value,
            "avis": document.getElementById('comment').value
        };

        const response = await fetch('/ajouterAvisCoiffeur', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        alert('Avis envoyé avec succès');
        window.location.href = '/RdvPC';
    });

    async function fetchReservationData2() {
        let reservationId = window.location.search.split('=')[1];
        try {
            const response = await fetch(`/getReservationData/${reservationId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const reservation = await response.json();
            const client = document.getElementById('client');
            const clientId = reservation[0].clientId;



            try {
                const clientResponse = await fetch(`/getClientDataByClientId?clientId=${clientId}`);
                if (!clientResponse.ok) {
                    throw new Error('Network response was not ok');
                }
                const clientData = await clientResponse.json();
                client.innerHTML = `<strong>Client:  </strong> ${clientData[0].prenom} ${clientData[0].nom}`;

            } catch (clientError) {
                console.error('Error fetching the client:', clientError);
            }
        } catch (error) {
            console.error('Error fetching reservation data', error);
        }
    }
    fetchReservationData2();
});
