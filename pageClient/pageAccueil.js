function setupNavbar() {
  const burgerMenu = document.querySelector('.navbar-burger');
  const navbarItems = document.getElementById('navbarItems');

  // Ouverture/Fermeture du menu burger
  burgerMenu.addEventListener('click', function() {
    navbarItems.classList.toggle('slide-in');
    navbarItems.classList.toggle('slide-out');
  });

    // Fermeture du menu burger si on clique en dehors
  document.addEventListener('click', function(event) {
    const isClickInside = navbarItems.contains(event.target) || burgerMenu.contains(event.target);
    if (!isClickInside && navbarItems.classList.contains('slide-in')) {
      navbarItems.classList.remove('slide-in');
      navbarItems.classList.add('slide-out');
    }
  });
}

// Appel des fonctions au chargement de la page
document.addEventListener("DOMContentLoaded", function() {
  setupNavbar();
});
