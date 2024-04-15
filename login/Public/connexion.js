import {deconnexion, generateFooter, generateNavBarWithAuth} from "../../commun.js";

document.addEventListener("DOMContentLoaded", () => {
    generateFooter();
    generateNavBarWithAuth()
    deconnexion()

    const option1Checkbox = document.getElementById('option1');
    const option2Checkbox = document.getElementById('option2');

    //Client
    option1Checkbox.addEventListener('change', () => {
        if (option1Checkbox.checked) {
            option2Checkbox.checked = false;
        } else {

        }
    });

    //Coiffeur
    option2Checkbox.addEventListener('change', () => {
        if (option2Checkbox.checked) {
            option1Checkbox.checked = false;
        } else {
        }
    });
});
