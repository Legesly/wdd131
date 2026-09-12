// Hamburger menu
const menuButton = document.querySelector("#menu-button");
const navList = document.querySelector("#primary-nav ul");

menuButton.addEventListener("click", () => {
  const isOpen = navList.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
  menuButton.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu"
  );
  menuButton.textContent = isOpen ? "✕" : "☰";
});

// Footer dates
document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastmodified").textContent = document.lastModified;
