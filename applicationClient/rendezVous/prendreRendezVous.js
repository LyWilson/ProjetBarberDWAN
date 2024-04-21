document.addEventListener('DOMContentLoaded', function() {
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
        const clientId = document.getElementById('clientId').value;
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
