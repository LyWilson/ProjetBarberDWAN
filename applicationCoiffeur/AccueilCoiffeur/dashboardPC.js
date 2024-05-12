import {authCoiffeur, deconnexion, generateFooter, generateNavBarWithAuth} from "../../commun.js";

//Pie Chart
async function initializePieChartWithReviews(email) {
    try {
        const coiffeurIdResponse = await fetch(`/getCoiffeurId?email=${email}`);
        if (!coiffeurIdResponse.ok) {
            return null;
        }

        const coiffeurId = await coiffeurIdResponse.json();
        const avisResponse = await fetch(`/getAvisClientById?coiffeurId=${coiffeurId}`);
        if (!avisResponse.ok) {
            throw new Error('Failed to fetch avis clients');
        }
        const avisClients = await avisResponse.json();
        console.log(avisClients);

        // Calculate number of positive, negative, and neutral reviews
        let positiveReviews = 0;
        let negativeReviews = 0;
        let neutralReviews = 0;

        avisClients.forEach(review => {
            if (review.evaluation > 3) {
                positiveReviews++;
            } else if (review.evaluation < 3) {
                negativeReviews++;
            } else {
                neutralReviews++;
            }
        });

        // Initialize the pie chart with review data
        const ctx = document.getElementById('chartContainer').getContext('2d');
        const chart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Positive', 'Negative', 'Neutral'],
                datasets: [{
                    label: 'Reviews',
                    data: [positiveReviews, negativeReviews, neutralReviews],
                    backgroundColor: [
                        'rgb(75, 192, 192)',
                        'rgb(255, 99, 132)',
                        'rgb(255, 205, 86)'
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
    } catch (error) {
        console.error('Error initializing pie chart with reviews:', error);
    }
}




//
const Utils = {
    months: function({count}) {
        // Assuming this function returns an array of month names
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return monthNames.slice(0, count);
    },
    day: function({count}) {
        // Generates an array with day numbers from 1 to count
        return Array.from({length: count}, (_, i) => i + 1);
    },
    numbers: function({count, min, max}) {
        return Array.from({length: count}, () => Math.floor(Math.random() * (max - min + 1)) + min);
    },
    revenus: function({count, min = 10000, max = 25000}) {
        return Array.from({length: count}, () => Math.floor(Math.random() * (max - min + 1)) + min);
    },
    CHART_COLORS: {
        red: 'rgb(255, 99, 132)',
        orange: 'rgb(255, 159, 64)',
        yellow: 'rgb(255, 205, 86)',
        cyan: 'rgb(75, 192, 192)',
        blue :'rgb(54, 162, 235)',
        purple: 'rgb(153, 102, 255)',
        white: 'rgb(201, 203, 207)'
    },
    transparentize: function(color, opacity) {
        let alpha = opacity === undefined ? 0.5 : 1 - opacity;
        return color.replace('rgb', 'rgba').replace(')', `, ${alpha})`);
    },
};

//Bar chart
function initbarChart() {
    // Get the context of the canvas element we want to select
    const ctx = document.getElementById('barChartContainer').getContext('2d');

    // Define the data and config for the bar chart using the provided datasets and labels
    const labels = Utils.months({count: 4});
    const data = {
        labels: labels,
        datasets: [{
            label: 'Revenus',
            data: Utils.revenus({count: labels.length}),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
            ],
            borderWidth: 2
        }]
    };

    const config = {
        type: 'bar',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        },
    };

    // Create a new Chart instance
    const myChart = new Chart(ctx, config);
}

//Line Chart
function initLineChart() {
    const labels = Utils.day({count: 31}); // Labels for the days of the month
    const data = {
        labels: labels,
        datasets: [{
            label: 'Nombre de clients par jour',
            data: Utils.numbers({count: 31, min: 0, max: 20}), // Generates random data for each day
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    suggestedMax: 20 // Optional: Adjust according to your data range
                }
            }
        }
    };

    const ctx = document.getElementById('lineChartContainer').getContext('2d');
    const lineChart = new Chart(ctx, config);
}

async function updateSponsor(salonId) {
    const response = await fetch(`/updateSponsor?salonId=${salonId}`);
    if (response.ok) {
        alert('Sponsor updated successfully');
    } else {
        alert('Failed to update sponsor');
    }
}

async function getCoiffeurId(email) {
    try {
        const response = await fetch(`/getCoiffeurId?email=${email}`);
        if (response.ok) {
            return await response.json();
        }
    } catch (error) {
        console.error('Failed to get coiffeur ID:', error);
    }
}

async function getAvisClientById(email) {
    const coiffeurIdResponse = await fetch(`/getCoiffeurId?email=${email}`);
    if (!coiffeurIdResponse.ok) {
        return null;
    }

    const coiffeurId = await coiffeurIdResponse.json();
    const avisClientResponse = await fetch(`/getAvisClientById?coiffeurId=${coiffeurId}`);

    if (avisClientResponse.ok) {
        const avisClients = await avisClientResponse.json();
        afficherAvisClients(avisClients);
    } else {
        return null;
    }
}

async function afficherAvisClients(avisClients) {
    const reviewsList = document.getElementById('customerReviews');

    if (avisClients && avisClients.length > 0) {
        reviewsList.innerHTML = '';

        avisClients.forEach(review => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<strong>Client:</strong> ${review.nom_client} ${review.prenom_client}, <strong>Rating:</strong> ${review.evaluation}/5<br>${review.message}`;
            reviewsList.appendChild(listItem);
        });
    } else {
        reviewsList.innerHTML = '<li>Aucun avis disponible pour le moment.</li>';
    }
}


document.addEventListener("DOMContentLoaded", async function(event) {
    authCoiffeur();
    event.preventDefault()
    const token = sessionStorage.getItem('tokenCoiffeur');
    const info = token => decodeURIComponent(atob(token.split('.')[1].replace('-', '+').replace('_', '/')).split('').map(c => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`).join(''));
    const email = JSON.parse(info(token)).email;
    const resultat = await fetch(`/getSalonId?email=${email}`)
    const salonId = await resultat.json();
    generateFooter();
    generateNavBarWithAuth();
    deconnexion();
    getAvisClientById(email);
    initializePieChartWithReviews(email);
    initbarChart();
    initLineChart();
    document.getElementById('updateSponsor').addEventListener('click', () => updateSponsor(salonId));
});
