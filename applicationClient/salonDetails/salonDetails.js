// Function to fetch and display salon details
async function showSalonDetails() {
    try {
        // Get salonId from query parameters
        const urlParams = new URLSearchParams(window.location.search);
        const salonId = urlParams.get('salonId');
        
        // Fetch salon details based on salonId
        const response = await fetch(`/getSalonDetails?salonId=${salonId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch salon details');
        }
        const salonDetails = await response.json();

        // Generate HTML for salon details
        const salonDetailsHTML = generateSalonDetails(salonDetails);
        
        // Render salon details on the page
        const salonDetailsContainer = document.getElementById('salonDetails');
        salonDetailsContainer.innerHTML = salonDetailsHTML;
    } catch (error) {
        console.error('Error fetching salon details:', error);
    }
}

// Function to generate HTML for salon details
function generateSalonDetails(salonDetails) {
    return `
        <div class="column is-8">
            <h1 class="title">${salonDetails.nomSalon}</h1>
            <p><b>Adresse:</b> ${salonDetails.adresse}</p>
            <p><b>Numéro de téléphone:</b> ${salonDetails.numeroTelephoneSalon}</p>
            <p><b>Heure d'ouverture:</b> ${salonDetails.horairesOuverture}</p>
        </div>
    `;
}

// Call showSalonDetails function when the page loads
document.addEventListener("DOMContentLoaded", () => {
    showSalonDetails();
});
