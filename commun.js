// Navigation Bar
function getNavbar() {
  return `
  <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
    <!-- Logo on the left side -->
    <div class="navbar-brand">
      <a class="navbar-item" href="pageAccueil.html">
        <img src="/logo.png" alt="DWAN Coiffure" style="border-radius: 50%; width: 42px">
      </a>
    </div>

    <!-- Search bar in the middle -->
    <div class="navbar-item">
      <div class="control">
        <label>
          <input class="input" type="text" placeholder="Recherche des salons de coiffure">
        </label>
      </div>
    </div>

    <!-- Navigation Items -->
    <div class="navbar-menu">
      <div class="navbar-end">
        <a class="navbar-item" href="./profil.html">
          Mon Profil
        </a>
        <a class="navbar-item" href="./rendezVous.html">
          Mes Rendez-vous
        </a>
        <a class="navbar-item" href="./favoris.html">
          Mes Favoris
        </a>
        <a class="navbar-item" href="../login/Public/connexion.html">
          Déconnexion
        </a>
        <hr class="navbar-divider">
        <a class="navbar-item">
          Aide
        </a>
      </div>
    </div>
  </nav>
  `;
}

// Fonction pour générer la barre de navigation
export function generateNavBar() {
  const navBar = document.getElementById('navigationBar');
  navBar.innerHTML = getNavbar();
}
