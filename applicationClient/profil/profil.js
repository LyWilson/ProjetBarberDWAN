// Import the generateNavBar function from commun.js
import { generateNavBar } from '../../commun.js';

// Function to fetch client profile and populate form fields
const fetchAndPopulateProfile = async () => {
    try {
        // Fetch client information
        const response = await fetch('/api/client/profile');
        if (!response.ok) {
            throw new Error('Failed to fetch client profile');
        }
        const client = await response.json();

        // Populate form fields with client information
        document.getElementById('firstName').value = client.nom;
        document.getElementById('lastName').value = client.prenom;
        document.getElementById('email').value = client.email;
        document.getElementById('phoneNumber').value = client.numeroTelephone;
    } catch (error) {
        console.error('Error fetching or populating profile:', error);
        alert('Failed to load profile. Please try again later.');
    }
};

// Function to handle form submission
const handleFormSubmission = async (event) => {
    try {
        event.preventDefault();

        // Extract form data
        const formData = new FormData(event.target);
        const profileData = {};
        formData.forEach((value, key) => {
            profileData[key] = value;
        });

        // Update client profile
        const updateResponse = await fetch('/api/client/profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(profileData)
        });

        if (!updateResponse.ok) {
            throw new Error('Failed to update profile');
        }

        alert('Profile updated successfully!');
    } catch (error) {
        console.error('Error updating profile:', error);
        alert('Failed to update profile. Please try again later.');
    }
};

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
    // Generate the navigation bar
    generateNavBar();

    // Fetch and populate client profile
    fetchAndPopulateProfile();

    // Attach event listener to form submission
    document.getElementById('profileForm').addEventListener('submit', handleFormSubmission);
});
