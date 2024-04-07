// Fonction de la barre de navigation
function getNavbar() {
  return `
  <nav class="navbar custom-color" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
        <a class="navbar-item" href="AccueilClient">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
                <defs>
                    <clipPath id="circleClip">
                        <circle cx="32" cy="32" r="32"/>
                    </clipPath>
                </defs>
                <image xlink:href="logo.png" width="64" height="64" clip-path="url(#circleClip)"/>
            </svg>
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
            <a class="navbar-item text-white" href="profil">Mon Profil</a>
            <a class="navbar-item text-white" href="rendezVous">Mes Rendez-vous</a>
            <a class="navbar-item text-white" href="favoris">Mes Favoris</a>
            <a class="navbar-item text-white" href="connexion">Déconnexion</a>
            <a class="navbar-item text-white" href="aide">Aide</a>
        </div>
    </div>
</nav>
  `;
}

// Fonction pour générer la barre 
export function generateNavBar() {
  const navBar = document.getElementById('navigationBar');
  navBar.innerHTML = getNavbar();
}

