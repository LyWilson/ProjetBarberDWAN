import {deconnexion, generateFooter, generateNavBarWithAuth} from "../../commun.js";

document.addEventListener("DOMContentLoaded", () => {
    generateFooter();
    generateNavBarWithAuth();
    deconnexion();
    initializePieChart();
    initbarChart();
    initLineChart()
});

//Pie Chart
async function initializePieChart(salonId) {
    // Make sure the salonId is valid or exit the function
    if (!salonId) return console.error('Salon ID is required');

    try {
        // Fetch the salon data
        const response = await fetch(`/getSalonDataBySalonId?salonId=${salonId}`);
        if (!response.ok) {
            throw new Error('Salon not found');
        }
        const salonData = await response.json();

        // Extract the evaluation score from salonData
        const reviewScore = salonData.evaluation; // Assuming 'evaluation' is the column name
        const maxScore = 5; // Assuming the max score is 5

        // Initialize the pie chart with the fetched data
        const ctx = document.getElementById('chartContainer').getContext('2d');
        const chart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Score', 'Remaining'],
                datasets: [{
                    label: 'All Time Review',
                    data: [reviewScore, maxScore - reviewScore],
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
    } catch (error) {
        console.error('Error fetching salon data:', error);
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

