const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

if (menuToggle && mainNav) {
  const closeMenu = () => {
    mainNav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menu');
  };

  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    mainNav.classList.toggle('is-open', !isOpen);
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Abrir menu' : 'Fechar menu');
  });

  mainNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
      menuToggle.focus();
    }
  });
}

document.querySelectorAll('.program-group').forEach((group) => {
  const summary = group.querySelector('summary');
  if (!summary) return;

  const syncExpandedState = () => {
    summary.setAttribute('aria-expanded', String(group.open));
  };

  group.addEventListener('toggle', syncExpandedState);
  syncExpandedState();
});

const header = document.querySelector('[data-header]');
if (header) {
  const syncHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 20);
  window.addEventListener('scroll', syncHeader, { passive: true });
  syncHeader();
}

const year = document.querySelector('[data-year]');
if (year) year.textContent = String(new Date().getFullYear());
