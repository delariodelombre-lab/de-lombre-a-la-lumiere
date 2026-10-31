// Scripts communs - De L’Ombre à La Lumière

document.addEventListener('DOMContentLoaded', function () {

  // Menu mobile
  const toggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');

  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      toggle.textContent = mobileNav.classList.contains('open') ? '✕' : '☰';
    });
  }

  // Active nav link
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav a, .mobile-nav a').forEach(link => {
    const href = link.getAttribute('href');

    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Gestion des boutons Ajouter au panier
  // La délégation permet de détecter aussi les boutons créés dynamiquement.
  document.addEventListener('click', function (e) {

    const btn = e.target.closest('[data-add-to-cart]');

    if (!btn) return;

    e.preventDefault();

    const id = btn.getAttribute('data-add-to-cart');
    const originalText = btn.textContent;

    if (typeof addToCart !== 'function') {
      alert('Le panier ne fonctionne pas correctement. Réessaie plus tard.');
      return;
    }

    if (addToCart(id)) {
      btn.textContent = '✓ Ajouté';
      btn.disabled = true;

      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
      }, 2000);
    }
  });

});

// Logo SVG réutilisable
function getLogoSVG(size = 36) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="32" r="30" stroke="#E9B949" stroke-width="2"/>
    <path d="M32 14C32 14 22 28 22 36C22 41.5228 26.4772 46 32 46C37.5228 46 42 41.5228 42 36C42 28 32 14 32 14Z" fill="#E9B949"/>
    <circle cx="32" cy="36" r="4" fill="#071923"/>
  </svg>`;
}