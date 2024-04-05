// Navigation Bar
function getNavbar() {
  return `
  <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
        <a class="navbar-item" href="index.html">
            <img src="logo.png" alt="DWAN Coiffure" style="border-radius: 75%; width: auto; height: auto " >
            <strong>DWAN Coiffure</strong>
        </a>
        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
        </a>
    </div>

    <div class="navbar-menu">
        <div class="navbar-start">
            <div class="navbar-item">
                <input class="input" type="text" placeholder="Recherche des salons de coiffure">
            </div>
        </div>

        <div class="navbar-end">
            <a class="navbar-item" href="profil">Mon Profil</a>
            <a class="navbar-item" href="rendezVous">Mes Rendez-vous</a>
            <a class="navbar-item" href="favoris">Mes Favoris</a>
            <a class="navbar-item" href="connexion">Déconnexion</a>
            <a class="navbar-item" href="aide">Aide</a>
        </div>
    </div>
</nav>
  `;
}

// Function to generate the navigation bar
export function generateNavBar() {
  const navBar = document.getElementById('navigationBar');
  navBar.innerHTML = getNavbar();
}
