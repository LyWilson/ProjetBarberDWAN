// Fonction pour afficher ou masquer la popup de réservation selon l'état actuel de la popup
function togglePopup(active) {
    const popup = document.getElementById('reservationPopup');
    popup.classList.toggle('is-active', active);
}
document.getElementById('reservationButton').addEventListener('click', () => togglePopup(true));
document.querySelectorAll('.modal-close, .modal-background, #closePopup')
    .forEach(element => element.addEventListener('click', () => togglePopup(false)));


// Fonction pour afficher les détails du salon selon l'ID du salon dans l'URL de la page
async function fetchAndDisplaySalonDetails() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const salonId = urlParams.get('salonId');
        const response = await fetch(`/getSalonDataBySalonId?salonId=${salonId}`);
        if (!response.ok) throw new Error('Failed to fetch salon details');
        const salonDetails = await response.json();
        document.getElementById('salonName').textContent = salonDetails.nomSalon;
        document.getElementById('salonAddress').textContent = salonDetails.adresse;
        document.getElementById('salonPhoneNumber').textContent = salonDetails.numeroTelephoneSalon;
        document.getElementById('salonOpeningHours').textContent = salonDetails.horairesOuverture;
    } catch (error) {
        console.error('Error fetching or displaying salon details:', error);
    }
}

// Fonction pour ajouter des photos du salon à la page
async function fetchAndDisplaySalonPhotos() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const salonId = urlParams.get('salonId');
        const response = await fetch(`/getSalonPhotosBySalonId?salonId=${salonId}`);
        if (!response.ok) throw new Error('Failed to fetch salon photos');
        const salonPhotos = await response.json();
        const gallery = document.getElementById('salonGallery');
        salonPhotos.forEach(photo => {
            const img = document.createElement('img');
            img.src = photo.urlPhoto;
            img.alt = photo.descriptionPhoto;
            gallery.appendChild(img);
        });
    } catch (error) {
        console.error('Error fetching or displaying salon photos:', error);
    }
}

// Fonction pour ajouter des photos du salon à la page selon l'ID du salon dans l'URL de la page
const fetchAndDisplaySalonPhotos = async (salonId) => {
    try {
        const photosFolder = `/applicationClient/salonDetails/photos"${salonId}/`;

        // Fetch list of photo file names for the given salonId
        const response = await fetch(`/getSalonPhotos?salonId=${salonId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch salon photos');
        }
        const photoFiles = await response.json();

        // Display salon photos in the photo gallery section
        const photoGallery = document.getElementById('photoGallery');
        photoFiles.forEach(photoFile => {
            const photoElement = document.createElement('div');
            photoElement.classList.add('column', 'is-3');

            const img = document.createElement('img');
            img.src = `${photosFolder}${photoFile}`;
            img.alt = 'image'; 

            photoElement.appendChild(img);
            photoGallery.appendChild(photoElement);
        });
    } catch (error) {
        console.error('Error fetching and displaying salon photos:', error);
    }
};


// Initialisation de la page de détails du salon
document.addEventListener('DOMContentLoaded', () => {
    fetchAndDisplaySalonDetails()
});
