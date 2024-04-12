import {deconnexion, generateFooter, generateNavBarWithAuth} from "../../commun.js";

document.addEventListener("DOMContentLoaded", () => {
    generateFooter();
    generateNavBarWithAuth();
    deconnexion();
    initializeChart();
});

function initializeChart() {
    const ctx = document.getElementById('chartContainer').getContext('2d');
    const reviewScore = 4; // Your dynamic score value goes here
    const maxScore = 5;
    const chart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Score', 'Remaining'],
            datasets: [{
                label: 'All Time Review',
                data: [reviewScore, maxScore - reviewScore], // Data for pie chart: score and the remaining to make up 5
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(211, 211, 211)'
                ],
                hoverOffset: 4
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom'
                }
            }
        }
    });
}
