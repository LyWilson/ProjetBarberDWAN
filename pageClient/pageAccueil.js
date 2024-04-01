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

async function fetchShopsFromDatabase() {
  try {
    await pool.connect();
    const request = pool.request();
    const result = await request.query('SELECT nomSalon, adresse FROM Salon');
    return result.recordset;
  } catch (error) {
    console.error('Error fetching shops from database:', error);
    return [];
  } finally {
    pool.close();
  }
}

function displayShops(shops) {
  const shopsContainer = document.getElementById('shopsContainer');
  shopsContainer.innerHTML = '';

  shops.forEach(shop => {
    const shopElement = document.createElement('div');
    shopElement.classList.add('column');
    shopElement.innerHTML = `
            <div class="shop">
                <h2>${shop.nomSalon}</h2>
                <p>${shop.adresse}</p>
            </div>
        `;
    shopsContainer.appendChild(shopElement);
  });
}



function setupNavbar() {
  const burgerMenu = document.querySelector('.navbar-burger');
  const navbarItems = document.getElementById('navbarItems');

  burgerMenu.addEventListener('click', function() {
    navbarItems.classList.toggle('slide-in');
    navbarItems.classList.toggle('slide-out');
  });

  document.addEventListener('click', function(event) {
    const isClickInside = navbarItems.contains(event.target) || burgerMenu.contains(event.target);
    if (!isClickInside && navbarItems.classList.contains('slide-in')) {
      navbarItems.classList.remove('slide-in');
      navbarItems.classList.add('slide-out');
    }
  });
}



document.addEventListener("DOMContentLoaded", async function() {
  setupNavbar();
  const shops = await fetchShopsFromDatabase();
  displayShops(shops);
});
