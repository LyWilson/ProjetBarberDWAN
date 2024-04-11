// Fonction de la barre de navigation
function getNavbar() {
    return `
  <nav class="navbar custom-color" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
        <a class="navbar-item" href="/AccueilClient">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
                <defs>
                    <clipPath id="circleClip">
                        <circle cx="32" cy="32" r="32"/>
                    </clipPath>
                </defs>
                <image xlink:href="http://localhost:3000/logo.png" width="64" height="64" clip-path="url(#circleClip)"/>
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
                <input class="input" type="text" style="width: 500px" placeholder="Recherche des salons de coiffure">
            </div>
        </div>

        <div class="navbar-end">
            <a class="navbar-item text-white" href="profil" id="profil">Mon Profil</a>
            <a class="navbar-item text-white" href="rendezVous" id="rdv">Mes Rendez-vous</a>
            <a class="navbar-item text-white" href="favoris" id="favoris">Mes Favoris</a>
            <a class="navbar-item text-white" id="deconnexion">Déconnexion</a>
            <a class="navbar-item text-white" href="aide" id="aide">Aide</a>
        </div>
    </div>
</nav>
  `;
}

// Fonction pour générer la barre de navigation
function generateNavBar() {
    const navBar = document.getElementById('navigationBar');
    navBar.innerHTML = getNavbar();
}

// Fonction du pied de page
function getFooter() {
    return `
  <footer class="footer " style="background-color: black">
    <div class="content has-text-centered">
            <p>
                <strong>© 2024</strong>
                Wilson Ly | Daniel To | Nicolas Fauteux | Andy Ly Phok
            </p>
        </div>
</footer>
    `;
}

// Fonction pour générer le pied de page
function generateFooter() {
    const footer = document.getElementById('footer');
    footer.innerHTML = getFooter();

}

// Fonction pour la barre de navigation sans authentification
function getNavBarNonAuth() {
    return `
  <nav class="navbar custom-color" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
        <a class="navbar-item" href="/">
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
        

        <div class="navbar-end">
            <a class="navbar-item text-white" href="connexion" id="connexion">Connexion</a>
            <a class="navbar-item text-white" href="inscription" id="inscription">Inscription</a>
            <a class="navbar-item text-white" href="aide" id="aide">Aide</a>
        </div>
    </div>
</nav>
    `;
}

// Fonction pour générer la barre de navigation sans authentification
function generateNavBarNonAuth() {
    const navBar = document.getElementById('navigationBar');
    navBar.innerHTML = getNavBarNonAuth();
}

// Fonction pour générer la barre de navigation avec authentification
function generateNavBarWithAuth() {
    if (sessionStorage.getItem("token")) {
        generateNavBar();
    } else {
        generateNavBarNonAuth();
    }
}

// Fonction pour la déconnexion de l'utilisateur
function deconnexion() {
    const btnDeconnexion = document.getElementById('deconnexion');
    btnDeconnexion.addEventListener('click', () => {
        sessionStorage.removeItem('token');
        window.location.href = '/connexion';
    });
}

// Exportation des fonctions
export { generateNavBarWithAuth, generateFooter, deconnexion };
