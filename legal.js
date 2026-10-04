const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('#mobile-menu');
const backToTop = document.querySelector('.back-to-top');
const header = document.querySelector('.site-header');
const year = document.querySelector('#year');

function setMenu(open) {
  if (!menuToggle || !mobileMenu) return;
  menuToggle.classList.toggle('open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  mobileMenu.hidden = !open;
}

menuToggle?.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));
mobileMenu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
window.addEventListener('resize', () => { if (window.innerWidth > 1120) setMenu(false); });

function updateScrollUI() {
  const y = window.scrollY;
  header?.classList.toggle('scrolled', y > 15);
  backToTop?.classList.toggle('visible', y > 420);
}
window.addEventListener('scroll', updateScrollUI, { passive: true });
updateScrollUI();
backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
if (year) year.textContent = new Date().getFullYear();
