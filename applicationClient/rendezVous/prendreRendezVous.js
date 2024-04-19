document.addEventListener('DOMContentLoaded', function() {
    // fetchBarbers();
    fetchHairstyles();

    /*async function fetchBarbers() {
        try {
            const response = await fetch('/api/barbers');
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
    }*/

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

    window.submitAppointment = async function() {
        try {
            const date = document.getElementById('appointmentDate').value;
            const time = document.getElementById('appointmentTime').value;
            const hairstyle = document.getElementById('hairstyle').value;
            const barber = document.getElementById('barber').value;

            console.log(`Date: ${date}, Heure: ${time}, Coiffure: ${hairstyle}, Barbier: ${barber}`);
            alert(`Rendez-vous confirmé pour le ${date} à ${time} avec ${barber} pour une ${hairstyle}.`);

            // Remplacer par la logique d'envoi des données au serveur si nécessaire
        } catch (error) {
            console.error('Error submitting appointment:', error);
        }
    }
});
