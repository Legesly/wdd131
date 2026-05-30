// ------------------------------
// Temple Data (7 originals + 3 new)
// ------------------------------
const temples = [
  {
    templeName: "Aba Nigeria Temple",
    location: "Aba, Nigeria",
    dedicated: "2005-08-07",
    area: 11500,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/aba-nigeria-temple/aba-nigeria-temple-lds-1024621-wallpaper.jpg"
  },
  {
    templeName: "Accra Ghana Temple",
    location: "Accra, Ghana",
    dedicated: "2004-01-11",
    area: 17500,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/accra-ghana-temple/accra-ghana-temple-lds-1024620-wallpaper.jpg"
  },
  {
    templeName: "Bern Switzerland Temple",
    location: "Bern, Switzerland",
    dedicated: "1955-09-11",
    area: 35500,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/bern-switzerland-temple/bern-switzerland-temple-lds-1024622-wallpaper.jpg"
  },
  {
    templeName: "Campinas Brazil Temple",
    location: "Campinas, Brazil",
    dedicated: "2002-05-17",
    area: 48000,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/campinas-brazil-temple/campinas-brazil-temple-lds-1024623-wallpaper.jpg"
  },
  {
    templeName: "Columbia River Washington Temple",
    location: "Richland, Washington",
    dedicated: "2001-11-18",
    area: 16000,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/columbia-river-washington-temple/columbia-river-washington-temple-lds-1024624-wallpaper.jpg"
  },
  {
    templeName: "Freiberg Germany Temple",
    location: "Freiberg, Germany",
    dedicated: "1985-06-29",
    area: 21500,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/freiberg-germany-temple/freiberg-germany-temple-lds-1024625-wallpaper.jpg"
  },
  {
    templeName: "Johannesburg South Africa Temple",
    location: "Johannesburg, South Africa",
    dedicated: "1985-08-24",
    area: 19184,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/johannesburg-south-africa-temple/johannesburg-south-africa-temple-lds-1024626-wallpaper.jpg"
  },

  // ------------------------------
  // Your 3 NEW temples
  // ------------------------------
  {
    templeName: "Paris France Temple",
    location: "Paris, France",
    dedicated: "2017-05-21",
    area: 44175,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/paris-france-temple/paris-france-temple-lds-1024630-wallpaper.jpg"
  },
  {
    templeName: "Rome Italy Temple",
    location: "Rome, Italy",
    dedicated: "2019-03-10",
    area: 40000,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/rome-italy-temple/rome-italy-temple-lds-1024631-wallpaper.jpg"
  },
  {
    templeName: "Salt Lake Temple",
    location: "Salt Lake City, Utah",
    dedicated: "1893-04-06",
    area: 253015,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/salt-lake-temple/salt-lake-temple-lds-1024632-wallpaper.jpg"
  }
];

// ------------------------------
// Display Function
// ------------------------------
function displayTemples(list) {
  const container = document.querySelector("#temple-cards");
  container.innerHTML = "";

  list.forEach(temple => {
    const card = document.createElement("section");
    card.classList.add("card");

    card.innerHTML = `
      <h3>${temple.templeName}</h3>
      <p><strong>Location:</strong> ${temple.location}</p>
      <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
      <p><strong>Area:</strong> ${temple.area.toLocaleString()} sq ft</p>
      <img src="${temple.imageUrl}" alt="${temple.templeName}" loading="lazy">
    `;

    container.appendChild(card);
  });
}

// ------------------------------
// Filter Logic
// ------------------------------
function filterTemples(criteria) {
  let filtered = temples;

  if (criteria === "old") {
    filtered = temples.filter(t => parseInt(t.dedicated) < 1900);
  } else if (criteria === "new") {
    filtered = temples.filter(t => parseInt(t.dedicated) > 2000);
  } else if (criteria === "large") {
    filtered = temples.filter(t => t.area > 90000);
  } else if (criteria === "small") {
    filtered = temples.filter(t => t.area < 10000);
  }

  displayTemples(filtered);
}

// ------------------------------
// Navigation Click Events
// ------------------------------
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const filter = e.target.dataset.filter;
    filterTemples(filter);
  });
});

// ------------------------------
// Mobile Menu Toggle
// ------------------------------
const menuButton = document.querySelector("#menu-button");
const nav = document.querySelector("#primary-nav");

menuButton.addEventListener("click", () => {
  nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", nav.classList.contains("open"));
});

// ------------------------------
// Footer Dates
// ------------------------------
document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastmodified").textContent = document.lastModified;

// ------------------------------
// Initial Load
// ------------------------------
displayTemples(temples);
