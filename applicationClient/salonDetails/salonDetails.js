import { generateNavBar } from '../../commun.js';

// Function to fetch and display salon details
async function showSalonsDetails() {
    try {
        // Get salonId from query parameters
        const urlParams = new URLSearchParams(window.location.search);
        const salonId = urlParams.get('salonId');
        
        // Fetch salon details based on salonId
        const salonDetails = await getSalonDataBySalonId(salonId);

        const lesSalons = document.getElementById('salonDetails'); 
        const carteSalons = generateSalonDetails(salonDetails.nomSalon, salonDetails.adresse, salonDetails.numeroTelephoneSalon, salonDetails.horairesOuverture);
        lesSalons.insertAdjacentHTML('beforeend', carteSalons);
    } catch (error) {
        console.error('Error fetching salon details:', error);
    }
}

// Function to fetch salon data by salonId
async function getSalonDataBySalonId(salonId) {
    try {
        const response = await fetch(`/getSalonDataBySalonId?salonId=${salonId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch salon details');
        }
        const salonDetails = await response.json();
        return salonDetails;
    } catch (error) {
        console.error('Error fetching salon data by salonId:', error);
        throw error;
    }
}

// Function to generate HTML for salon details
function generateSalonDetails(nomSalon, adresse, numeroTelephoneSalon, horairesOuverture) {
    return `
        <div class="column is-8">
            <h1 class="title">${nomSalon}</h1>
            <p><b>Adresse:</b> ${adresse}</p>
            <p><b>Numéro de téléphone:</b> ${numeroTelephoneSalon}</p>
            <p><b>Heure d'ouverture:</b> ${horairesOuverture}</p>
        </div>
    `;
}

// Initialization of the salon details page
document.addEventListener("DOMContentLoaded", () => {
    generateNavBar();
    showSalonsDetails();
});
