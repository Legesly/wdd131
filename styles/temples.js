// Hamburger menu
const menuButton = document.querySelector('#menu-button');
const navList = document.querySelector('#primary-nav ul');

menuButton.addEventListener('click', () => {
  const isOpen = navList.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  menuButton.textContent = isOpen ? '✕' : '☰';
});

// Footer dates
const yearSpan = document.querySelector('#currentyear');
const lastModifiedSpan = document.querySelector('#lastmodified');

const now = new Date();
yearSpan.textContent = now.getFullYear();

lastModifiedSpan.textContent = document.lastModified;
