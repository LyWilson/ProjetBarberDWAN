async function showSalons() {
  const lesSalons = document.getElementById('listeSalons');
  try {
    const reponse = await fetch('/salon');
    const salons = await reponse.json();

    salons.forEach(s => {
      const carteSalons = generateCarteSalons(s.nomSalon, s.adresse, s.numeroTelephoneSalon, s.horairesOuverture);
      lesSalons.insertAdjacentHTML('beforeend', carteSalons);
    });
  } catch (error) {
    console.error('Error fetching salons:', error);
  }
}

// Fonction pour générer les cartes des magasins
function generateCarteSalons(nomSalon, adresse, numeroTelephoneSalon, horairesOuverture) {
  return `
  <div class="column is-4">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">${nomSalon}</p>
      </header>
      <div class="card-content">
        <div class="content">
          <p><b>Adresse:</b> ${adresse}</p>
          <p><b>Numéro de téléphone:</b> ${numeroTelephoneSalon}</p>
          <p><b>Heure d'ouverture:</b> ${horairesOuverture}</p>
        </div>
      </div>
    </div>
  </div>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  showSalons();
});