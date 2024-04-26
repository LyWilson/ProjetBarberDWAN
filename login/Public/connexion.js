import { deconnexion, generateFooter, generateNavBarWithAuth } from "../../commun.js";

document.addEventListener("DOMContentLoaded", () => {
    generateFooter();
    generateNavBarWithAuth();
    deconnexion();

    const option1Checkbox = document.getElementById('option1');
    const option2Checkbox = document.getElementById('option2');
    const registrationForm = document.getElementById('registrationForm');

    // Function to check if all required fields are filled
    function checkForm() {
        const email = document.getElementById('email').value.trim();
        const nom = document.getElementById('nom').value.trim();
        const prenom = document.getElementById('prenom').value.trim();
        const motDePasse = document.getElementById('motDePasse').value.trim();
        const numeroTelephone = document.getElementById('numeroTelephone').value.trim();

        // Check if any required field is empty
        if (!email || !nom || !prenom || !motDePasse || !numeroTelephone) {
            alert("Veuillez remplir tous les champs obligatoires.");
            return false; // Prevent form submission
        }

        // Check if at least one checkbox is checked
        if (!option1Checkbox.checked && !option2Checkbox.checked) {
            alert("Veuillez sélectionner au moins un type de compte.");
            return false; // Prevent form submission
        }

        // If all required fields are filled, allow form submission
        return true;
    }

    // Add event listener for form submission
    /*
    registrationForm.addEventListener('submit', (event) => {
        if (!checkForm()) {
            event.preventDefault(); // Prevent form submission if validation fails
        }
    });
*/
    //Client
    option1Checkbox.addEventListener('change', () => {
        if (option1Checkbox.checked) {
            option2Checkbox.checked = false;
        }
    });

    //Coiffeur
    option2Checkbox.addEventListener('change', () => {
        if (option2Checkbox.checked) {
            option1Checkbox.checked = false;
        }
    });
});
