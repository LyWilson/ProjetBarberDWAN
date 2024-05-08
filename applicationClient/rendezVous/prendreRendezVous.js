import {authClient, deconnexion, generateFooter, generateNavBarWithAuth} from "../../commun.js";

document.addEventListener('DOMContentLoaded', function() {
    authClient();
    generateNavBarWithAuth();
    generateFooter();
    deconnexion();
    fetchBarbers();
    fetchHairstyles();
    heureDisponible();

    async function fetchBarbers() {
        let SalonId = window.location.search.split('=')[1]
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
    }

    async function heureDisponible() {
        let SalonId = window.location.search.split('=')[1]
        try {
            const response = await fetch(`/getSalonDataBySalonId/?salonId=${SalonId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const heures = await response.json();
            console.log(heures);
            const select = document.getElementById('appointmentTime');
            const heuresDropdown = listeDispo(heures.horairesOuverture);
            heuresDropdown.forEach(dropdown => {
                const option = document.createElement('option');
                option.innerHTML = dropdown;
                select.appendChild(option);
            });

        } catch (error) {
            console.error('Error fetching barbers:', error);
        }
    }

    function listeDispo(timeRange) {
        const [startHour, endHour] = timeRange.split(" - ").map(time => parseInt(time.split(":")[0]));

        const dropdowns = [];

        for (let hour = startHour; hour < endHour; hour++) {
            const dropdown = `<option value="${hour}:00 - ${hour + 1}:00">${hour}:00 - ${hour + 1}:00</option>`;
            dropdowns.push(dropdown);
        }

        return dropdowns;
    }

    async function fetchHairstyles() {
        let SalonId = window.location.search.split('=')[1]
        try {
            const response = await fetch(`/getCoiffurePreEtablieDataBySalonId/${SalonId}`);
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
            "heure": time
        }
        const response = await fetch('/prendreRendezVous', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),

        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        alert('Réservation effectuée avec succès!');
        window.location.href = '/rendezVous';


    });
});
