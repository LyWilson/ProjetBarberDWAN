document.addEventListener("DOMContentLoaded", function() {
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
});
