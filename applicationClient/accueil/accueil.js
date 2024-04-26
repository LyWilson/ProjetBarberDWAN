import { deconnexion, generateFooter, generateNavBarWithAuth, authClient } from '../../commun.js';

// Fonction pour afficher les salons
async function loadSalons() {
  const lesSalons = document.getElementById('listeSalons');
  try {
    const response = await fetch('/getSalonData');
    if (!response.ok) {
      throw new Error('Failed to fetch salon data');
    }
    const salons = await response.json();

    salons.forEach(s => {
      const carteSalons = generateCarteSalons(s.salonId, s.nomSalon, s.adresse, s.horairesOuverture);
      lesSalons.insertAdjacentHTML('beforeend', carteSalons);
    });
  } catch (error) {
    console.error('Error fetching salons:', error);
  }
}

// Function to generate HTML for salon cards
function generateCarteSalons(salonId, nomSalon, adresse, horairesOuverture) {
  const imageUrl = `/images/salon${salonId}/${salonId}.png`;
  return `
  <div class="column is-3">
    <div class="card">
      <a href="salonDetails?salonId=${salonId}">
        <div class="card-image">
          <figure class="image is-4by3">
            <img src="${imageUrl}" alt="Photo du salon: ${nomSalon}">
          </figure>
        </div>
        <header class="card-header">
          <p class="card-header-title">${nomSalon}</p>
        </header>
        <div class="card-content">
          <div class="content">
            <p><b>Adresse:</b> ${adresse}</p>
            <p><b>Heure d'ouverture:</b> ${horairesOuverture}</p>
          </div>
        </div>
      </a>
    </div>
  </div>
  `;
}

async function loadSponsor(salonId) {
  try {
    const response = await fetch(`/getSalonDataBySalonId?salonId=${salonId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch salon details');
    }
    const salonDetails = await response.json();

    const sponsorRectangle = generateSponsorRectangle(salonDetails.salonId, salonDetails.nomSalon, salonDetails.numeroTelephoneSalon, salonDetails.adresse);
    const sponsorContainer = document.getElementById('sponsorContainer');
    sponsorContainer.innerHTML = sponsorRectangle;
  } catch (error) {
    console.error('Error fetching salon details:', error);
  }
}

function generateSponsorRectangle(salonId, nomSalon, numeroTelephoneSalon, adresse) {
  const imageUrl = `./images/salon${salonId}/${salonId}.png`;
  return `
    <div class="sponsor-rectangle">
      <a href="salonDetails?salonId=${salonId}">
        <div class="columns is-vcentered">
          <div class="column is-6">
            <img src="${imageUrl}" alt="Salon Image" style="width: 100%; height: 100px;" class="centered";">
          </div>
          <div class="column">
            <p><strong>Salon Name:</strong> ${nomSalon}</p>
            <p><strong>Phone Number:</strong> ${numeroTelephoneSalon}</p>
            <p><strong>Address:</strong> ${adresse}</p>
          </div>
        </div>
      </a>
    </div>
  `;
}



function Auth() {
  if (!sessionStorage.getItem('token')) {
    window.location.href = '/connexion';
  }
}

// Fonction pour filtrer les salons
function filtrerSalons() {
  const searchInput = document.querySelector('.navbar-item input[type="text"]');
  const searchValue = searchInput.value.toLowerCase().trim();

  const salons = document.querySelectorAll('.column.is-3');

  salons.forEach(salon => {
    const salonName = salon.querySelector('.card-header-title').textContent.toLowerCase();
    const salonAddress = salon.querySelector('.content p:first-child').textContent.toLowerCase();

    if (salonName.includes(searchValue) || salonAddress.includes(searchValue)) {
      salon.style.display = "block";
    } else {
      salon.style.display = "none";
    }
  });
}

// Function to initialize and load the map
function GenereMap() {
  mapboxgl.accessToken = 'pk.eyJ1IjoiaW5jZHdhbiIsImEiOiJjbHV2ejFiNDYwN3c3MmlvNTBjbXAyY3E4In0.L4smj76jBXbuZNng4D7iTA';
  const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [-73.593864, 45.558509], // starting position [lng, lat]
    zoom: 10 // starting zoom
  });

  map.on('load', () => {
    map.addSource('places', {
      'type': 'geojson',
      'data': {
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "properties": {
              "description": "<strong>Ta Tchass</strong><p>Adresse: 6969 Rue du Hood<br>Téléphone: 514-111-1111<br>Horaire: 10:00 - 19:00</p>"
            },
            "geometry": {
              "type": "Point",
              "coordinates": [-73.622115, 45.614294]
            }
          },
          {
            "type": "Feature",
            "properties": {
              "description": "<strong>Home Say Young</strong><p>Adresse: 420 Avenue Squidgame<br>Téléphone: 514-222-2222<br>Horaire: 10:30 - 19:30</p>"
            },
            "geometry": {
              "type": "Point",
              "coordinates": [-73.560034, 45.507863]
            }
          },
          {
            "type": "Feature",
            "properties": {
              "description": "<strong>Slat Salon</strong><p>Adresse: 495 Rue Atlanta<br>Téléphone: 514-333-3333<br>Horaire: 11:00 - 20:00</p>"
            },
            "geometry": {
              "type": "Point",
              "coordinates": [-73.604080, 45.561663]
            }
          },
          {
            "type": "Feature",
            "properties": {
              "description": "<strong>Chez Drippy</strong><p>Adresse: 7102 Avenue Rosemont<br>Téléphone: 514-444-4444<br>Horaire: 11:00 - 20:00</p>"
            },
            "geometry": {
              "type": "Point",
              "coordinates": [-73.579382, 45.555649]
            }
          },
          {
            "type": "Feature",
            "properties": {
              "description": "<strong>Wing Phat Hair</strong><p>Adresse: 9102 Rue Jarry<br>Téléphone: 514-555-5555<br>Horaire: 8:00 - 21:00</p>"
            },
            "geometry": {
              "type": "Point",
              "coordinates": [-73.601758, 45.572846]
            }
          },
          {
            "type": "Feature",
            "properties": {
              "description": "<strong>Daniel Studio</strong><p>Adresse: 101 Rue Sherbrooke<br>Téléphone: 514-666-6666<br>Horaire: 9:30 - 18:30</p>"
            },
            "geometry": {
              "type": "Point",
              "coordinates": [-73.555480, 45.551003]
            }
          },
          {
            "type": "Feature",
            "properties": {
              "description": "<strong>Cheveux dAfrique</strong><p>Adresse: 789 Rue Wakanda<br>Téléphone: 514-777-7777<br>Horaire: 9:30 - 18:30</p>"
            },
            "geometry": {
              "type": "Point",
              "coordinates": [-73.636817, 45.576310]
            }
          },
          {
            "type": "Feature",
            "properties": {
              "description": "<strong>Élégance Chinoise</strong><p>Adresse: 888 Rue Xi Jinping<br>Téléphone: 514-888-8888<br>Horaire: 10:30 - 19:30</p>"
            },
            "geometry": {
              "type": "Point",
              "coordinates": [-73.666813, 45.507877]
            }
          },
          {
            "type": "Feature",
            "properties": {
              "description": "<strong>Coiffure Lorry</strong><p>Adresse: 456 Avenue Appweb<br>Téléphone: 514-999-9999<br>Horaire: 10:00 - 20:00</p>"
            },
            "geometry": {
              "type": "Point",
              "coordinates": [-73.572765, 45.513823]
            }
          }
        ]
      }
    });

    // Add a layer showing the places.
    map.addLayer({
      'id': 'places',
      'type': 'circle',
      'source': 'places',
      'paint': {
        'circle-color': '#4264fb',
        'circle-radius': 6,
        'circle-stroke-width': 2,
        'circle-stroke-color': '#ffffff'
      }
    });

    // Create a popup, but don't add it to the map yet.
    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
    });

    map.on('mouseenter', 'places', (e) => {
      // Change the cursor style as a UI indicator.
      map.getCanvas().style.cursor = 'pointer';

      // Copy coordinates array.
      const coordinates = e.features[0].geometry.coordinates.slice();
      const description = e.features[0].properties.description;

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      // Populate the popup and set its coordinates
      // based on the feature found.
      popup.setLngLat(coordinates).setHTML(description).addTo(map);
    });

    map.on('mouseleave', 'places', () => {
      map.getCanvas().style.cursor = '';
      popup.remove();
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  authClient();
  Auth();
  generateNavBarWithAuth();
  generateFooter();
  loadSalons();
  loadSponsor(9);
  deconnexion();
  GenereMap();
  document.addEventListener('input', filtrerSalons)
});
