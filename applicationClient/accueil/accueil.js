import { deconnexion, generateFooter, generateNavBarWithAuth } from '../../commun.js';

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
    center: [-73.623848, 45.520123], // starting position [lng, lat]
    zoom: 10 // starting zoom
  });

  map.on('load', () => {
    map.addSource('places', {
      'type': 'geojson',
      'data': {
        'type': 'FeatureCollection',
        'features': [
          {
            'type': 'Feature',
            'properties': {
              'description': '<strong>M9</strong><p>Dwan office</p>'
            },
            'geometry': {
              'type': 'Point',
              'coordinates': [-73.553131, 45.550018]
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
  Auth();
  generateNavBarWithAuth();
  generateFooter();
  loadSalons();
  deconnexion();
  GenereMap();
  document.addEventListener('input', filtrerSalons)
});
