const { ConnectionPool } = require('mssql');

// MSSQL Connection Config
const config = {
  user: 'admin',
  password: 'admin',
  server: 'localhost',
  database: 'Barbier_v3',
  port: 1390,
  options: {
    trustServerCertificate: true,
    encrypt: true
  }
};

// Create MSSQL pool
const pool = new ConnectionPool(config);

// Fonction pour récupérer les salons de la base de données
async function fetchShopsFromDatabase() {
  try {
    await pool.connect();
    const request = pool.request();
    const result = await request.query('SELECT nomSalon, adresse, horairesOuverture, evaluation FROM Salon');
    return result.recordset;
  } catch (error) {
    console.error('Error fetching shops from database:', error);
    return [];
  } finally {
    await pool.close(); // Await closing the connection pool
  }
}

// Example usage
async function exampleUsage() {
  try {
    const shops = await fetchShopsFromDatabase();
    console.log('Shops:', shops);
  } catch (error) {
    console.error('Error:', error);
  }
}

exampleUsage(); // Call the function to retrieve shops




function setupNavbar() {
  const burgerMenu = document.querySelector('.navbar-burger');
  const navbarItems = document.getElementById('navbarItems');

  burgerMenu.addEventListener('click', function () {
    navbarItems.classList.toggle('slide-in');
    navbarItems.classList.toggle('slide-out');
  });

  document.addEventListener('click', function (event) {
    const isClickInside = navbarItems.contains(event.target) || burgerMenu.contains(event.target);
    if (!isClickInside && navbarItems.classList.contains('slide-in')) {
      navbarItems.classList.remove('slide-in');
      navbarItems.classList.add('slide-out');
    }
  });
}



document.addEventListener("DOMContentLoaded", async function () {
  setupNavbar();
  const shops = await fetchShopsFromDatabase();
  displayShops(shops);
});
