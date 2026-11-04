// Scripts communs - De L’Ombre à La Lumière

document.addEventListener('DOMContentLoaded', function () {

  // =====================================
  // MENU MOBILE
  // =====================================

  const toggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');

  if (toggle && mobileNav) {

    toggle.addEventListener('click', function (event) {
      event.preventDefault();

      const isOpen = mobileNav.classList.contains('is-open');
      const shouldOpen = !isOpen;

      mobileNav.classList.toggle('is-open', shouldOpen);
      mobileNav.classList.toggle('open', shouldOpen);

      toggle.textContent = shouldOpen ? '✕' : '☰';

      toggle.setAttribute(
        'aria-expanded',
        String(shouldOpen)
      );

      toggle.setAttribute(
        'aria-label',
        shouldOpen ? 'Fermer le menu' : 'Ouvrir le menu'
      );
    });

  }

  // =====================================
  // LIENS DE NAVIGATION ACTIFS
  // =====================================

  const currentPath =
    window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav a, .mobile-nav a').forEach(link => {

    const href = link.getAttribute('href');

    if (href === currentPath) {
      link.classList.add('active');
    }

  });

  // =====================================
  // AJOUT AU PANIER
  // =====================================

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

// =====================================
// LOGO SVG RÉUTILISABLE
// =====================================

function getLogoSVG(size = 36) {

  return `
    <svg
      width="${size}"
      height="${size}"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">

      <circle
        cx="32"
        cy="32"
        r="30"
        stroke="#E9B949"
        stroke-width="2"
      />

      <path
        d="M32 14C32 14 22 28 22 36C22 41.5228 26.4772 46 32 46C37.5228 46 42 41.5228 42 36C42 28 32 14 32 14Z"
        fill="#E9B949"
      />

      <circle
        cx="32"
        cy="36"
        r="4"
        fill="#071923"
      />

    </svg>
  `;

}
