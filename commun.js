// Navigation Bar
function getNavbar() {
  return `
  <nav class="navbar custom-color" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
        <a class="navbar-item" href="#">
            <img src="logo.png" alt="DWAN Coiffure" style="border-radius: 75%; width: auto; height: auto ">
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

function generateNavBar() {
  const navBar = document.getElementById('navigationBar');
  navBar.innerHTML = getNavbar();
}

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

function generateFooter() {
    const footer = document.getElementById('footer');
    footer.innerHTML = getFooter();

}
// Function to generate the navigation bar
export {generateNavBar, generateFooter}
