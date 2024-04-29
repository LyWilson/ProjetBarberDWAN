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

        if (!option1Checkbox.checked && !option2Checkbox.checked) {
            alert("Veuillez sélectionner au moins un type de compte.");
        }
    }
    document.getElementById("SubmitBtn").addEventListener("click", async () => {
        checkForm()
    });
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
