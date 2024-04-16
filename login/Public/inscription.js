import { deconnexion, generateFooter, generateNavBarWithAuth } from "../../commun.js";

document.addEventListener("DOMContentLoaded", () => {
    generateNavBarWithAuth();
    generateFooter();
    deconnexion();

    const option1Checkbox = document.getElementById('option1');
    const option2Checkbox = document.getElementById('option2');
    const salonIdInput = document.getElementById('DivsalonId');
    const horairesTravailInput = document.getElementById('DivhorairesTravail');

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
