import { deconnexion, generateFooter, generateNavBarWithAuth } from "../../commun.js";

document.addEventListener("DOMContentLoaded", () => {
    generateNavBarWithAuth();
    generateFooter();
    deconnexion();

    const option1Checkbox = document.getElementById('option1');
    const option2Checkbox = document.getElementById('option2');
    const salonIdInput = document.getElementById('DivsalonId');
    const horairesTravailInput = document.getElementById('DivhorairesTravail');
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
    registrationForm.addEventListener('submit', (event) => {
        if (!checkForm()) {
            event.preventDefault(); // Prevent form submission if validation fails
        }
    });

    //Client
    option1Checkbox.addEventListener('change', () => {
        if (option1Checkbox.checked) {
            salonIdInput.setAttribute('hidden', 'hidden');
            horairesTravailInput.setAttribute('hidden', 'hidden');
            option2Checkbox.checked = false;
        } else {

        }
    });

    //Coiffeur
    option2Checkbox.addEventListener('change', () => {
        if (option2Checkbox.checked) {
            salonIdInput.removeAttribute('hidden');
            horairesTravailInput.removeAttribute('hidden');
            salonIdInput.removeAttribute('type');
            horairesTravailInput.removeAttribute('type');
            option1Checkbox.checked = false;
        } else {
            salonIdInput.setAttribute('hidden', 'hidden');
            horairesTravailInput.setAttribute('hidden', 'hidden');
        }
    });
});
