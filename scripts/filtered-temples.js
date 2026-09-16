// Seven course sample temples + three student-added temples
const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },

  // Three temples added for W04
  {
    templeName: "Accra Ghana",
    location: "Accra, Ghana",
    dedicated: "2004, January, 11",
    area: 17500,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/accra-ghana/400x225/accra-ghana-temple-detail-249022-2400x1200.jpg"
  },
  {
    templeName: "Salt Lake",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 6",
    area: 253015,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/salt-lake-city-utah/400x250/salt-lake-temple-37762.jpg"
  },
  {
    templeName: "Rome Italy",
    location: "Rome, Italy",
    dedicated: "2019, March, 10",
    area: 41010,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/rome-italy/2019/400x250/1-Rome-Temple-2160936.jpg"
  }
];

function createTempleCard(temple) {
  const card = document.createElement("article");
  card.classList.add("card");

  const name = document.createElement("h2");
  name.textContent = temple.templeName;

  const location = document.createElement("p");
  location.innerHTML = `<span class="label">Location:</span> ${temple.location}`;

  const dedicated = document.createElement("p");
  dedicated.innerHTML = `<span class="label">Dedicated:</span> ${temple.dedicated}`;

  const area = document.createElement("p");
  area.innerHTML = `<span class="label">Area:</span> ${temple.area.toLocaleString()} sq ft`;

  const image = document.createElement("img");
  image.src = temple.imageUrl;
  image.alt = temple.templeName;
  image.loading = "lazy";
  image.width = 400;
  image.height = 250;

  card.append(name, location, dedicated, area, image);
  return card;
}

function displayTemples(list) {
  const container = document.querySelector("#temple-cards");
  container.innerHTML = "";

  if (list.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-message";
    empty.textContent = "No temples match this filter.";
    container.appendChild(empty);
    return;
  }

  list.forEach((temple) => {
    container.appendChild(createTempleCard(temple));
  });
}

function getDedicatedYear(dedicated) {
  return parseInt(dedicated, 10);
}

function filterTemples(criteria) {
  let filtered = temples;
  const titles = {
    home: "Home",
    old: "Old",
    new: "New",
    large: "Large",
    small: "Small"
  };

  switch (criteria) {
    case "old":
      filtered = temples.filter((t) => getDedicatedYear(t.dedicated) < 1900);
      break;
    case "new":
      filtered = temples.filter((t) => getDedicatedYear(t.dedicated) > 2000);
      break;
    case "large":
      filtered = temples.filter((t) => t.area > 90000);
      break;
    case "small":
      filtered = temples.filter((t) => t.area < 10000);
      break;
    case "home":
    default:
      filtered = temples;
      break;
  }

  document.querySelector("main h1").textContent = titles[criteria] || "Home";
  displayTemples(filtered);
}

document.querySelectorAll("[data-filter]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    filterTemples(link.dataset.filter);

    document.querySelectorAll("[data-filter]").forEach((item) => {
      item.classList.remove("active");
    });
    link.classList.add("active");

    const nav = document.querySelector("#primary-nav");
    const menuButton = document.querySelector("#menu-button");
    if (nav.classList.contains("open")) {
      nav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation menu");
      menuButton.textContent = "☰";
    }
  });
});

const menuButton = document.querySelector("#menu-button");
const nav = document.querySelector("#primary-nav");

menuButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
  menuButton.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu"
  );
  menuButton.textContent = isOpen ? "✕" : "☰";
});

document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastmodified").textContent = document.lastModified;

document.querySelector('[data-filter="home"]').classList.add("active");
displayTemples(temples);
