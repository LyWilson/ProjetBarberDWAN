// salonDetails.js

// Function to generate reservation slots based on opening hours
const generateReservationSlots = (openingHours) => {
    const slots = [];
    let startTime = new Date(openingHours.start);
    const endTime = new Date(openingHours.end);

    while (startTime < endTime) {
        const slot = startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        slots.push(slot);
        startTime.setMinutes(startTime.getMinutes() + 15); // Increment by 15 minutes
    }

    return slots;
};

// Function to display reservation slots in the popup
const displayReservationSlots = (slots) => {
    const reservationSlotsContainer = document.getElementById('reservationSlots');
    reservationSlotsContainer.innerHTML = '';

    slots.forEach(slot => {
        const button = document.createElement('button');
        button.classList.add('button', 'is-light');
        button.textContent = slot;
        button.addEventListener('click', () => {
            // Handle slot selection (e.g., make reservation)
            console.log('Selected slot:', slot);
            // Close the popup
            closeModal();
        });
        reservationSlotsContainer.appendChild(button);
    });
};

// Function to open the reservation popup
const openPopup = () => {
    document.getElementById('reservationPopup').classList.add('is-active');
};

// Function to close the reservation popup
const closeModal = () => {
    document.getElementById('reservationPopup').classList.remove('is-active');
};

const fetchSalonDetails = async (salonId) => {
    try {
        const response = await fetch(`/getSalonDataBySalonId?salonId=${salonId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch salon details');
        }
        const salonDetails = await response.json();
        return salonDetails;
    } catch (error) {
        console.error('Error fetching salon details:', error);
        throw error;
    }
};

// Function to display salon details on the page
const displaySalonDetails = (salonDetails) => {
    document.getElementById('salonName').innerHTML = salonDetails.nomSalon;
    document.getElementById('salonAddress').innerHTML = salonDetails.adresse;
    document.getElementById('salonPhoneNumber').innerHTML = salonDetails.numeroTelephoneSalon;
    document.getElementById('salonOpeningHours').innerHTML = salonDetails.horairesOuverture;
};

// Initialize the page by fetching and displaying salon details
const initPage = async () => {
    try {
        // Get the salonId from the URL query parameters
        const urlParams = new URLSearchParams(window.location.search);
        const salonId = urlParams.get('salonId');

        // Fetch salon details using the salonId
        const salonDetails = await fetchSalonDetails(salonId);

        // Display salon details on the page
        displaySalonDetails(salonDetails);
    } catch (error) {
        console.error('Error initializing page:', error);
    }
};

// Call initPage when the DOM content is loaded
document.addEventListener('DOMContentLoaded', initPage);

// Open the reservation popup when "Make a Reservation" button is clicked
document.getElementById('reservationButton').addEventListener('click', openPopup);

// Close the reservation popup when "Cancel" button or outside the popup is clicked
document.querySelectorAll('.modal-close, .modal-background, #closePopup').forEach(element => {
    element.addEventListener('click', closeModal);
});
