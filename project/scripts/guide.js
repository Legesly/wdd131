const places = [
  {
    id: "cape-coast",
    name: "Cape Coast Castle",
    region: "Central Region",
    type: "history",
    summary: "A UNESCO World Heritage site on the coast, with guided tours that explain the castle and the Atlantic slave trade."
  },
  {
    id: "kakum",
    name: "Kakum National Park",
    region: "Central Region",
    type: "nature",
    summary: "Rainforest walks and a canopy walkway above the trees, an easy day trip from Cape Coast."
  },
  {
    id: "mole",
    name: "Mole National Park",
    region: "Savannah Region",
    type: "nature",
    summary: "Ghana's largest park, known for elephants, antelope, and walking safaris with a guide."
  },
  {
    id: "labadi",
    name: "Labadi Beach",
    region: "Greater Accra",
    type: "coast",
    summary: "Accra's best-known beach, with weekend music, horses, and grilled seafood nearby."
  },
  {
    id: "manhyia",
    name: "Manhyia Palace Museum",
    region: "Ashanti Region",
    type: "history",
    summary: "The royal museum in Kumasi, covering Asante history, gold, and the role of the Asantehene."
  },
  {
    id: "wli",
    name: "Wli Waterfalls",
    region: "Volta Region",
    type: "nature",
    summary: "One of the tallest waterfalls in West Africa, reached by a walk through village farms and forest."
  }
];

function setFooterDates() {
  const year = document.querySelector("#year");
  const modified = document.querySelector("#lastmodified");

  if (year) {
    year.textContent = `${new Date().getFullYear()}`;
  }

  if (modified) {
    modified.textContent = `${document.lastModified}`;
  }
}

function showVisitMessage() {
  const banner = document.querySelector("#visit-banner");

  if (!banner) {
    return;
  }

  const stored = localStorage.getItem("visitCount");
  let visits = stored ? Number(stored) : 0;
  visits += 1;
  localStorage.setItem("visitCount", `${visits}`);

  if (visits === 1) {
    banner.textContent = `Welcome. This is your first visit to Ghana Travel Guide.`;
  } else {
    banner.textContent = `Welcome back. You have opened this guide ${visits} times on this browser.`;
  }
}

function placeCard(place) {
  return `<article class="place-card"><h3>${place.name}</h3><p class="meta">${place.region}</p><p>${place.summary}</p></article>`;
}

function renderPlaces(type) {
  const list = document.querySelector("#place-list");

  if (!list) {
    return;
  }

  const chosen = type === "all" ? places : places.filter((place) => place.type === type);

  if (chosen.length === 0) {
    list.innerHTML = `<p>No places match that filter yet.</p>`;
    return;
  }

  list.innerHTML = chosen.map((place) => placeCard(place)).join("");
}

function setupFilters() {
  const buttons = document.querySelectorAll("[data-filter]");

  if (buttons.length === 0) {
    return;
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const type = `${button.dataset.filter}`;
      renderPlaces(type);
      buttons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
    });
  });

  renderPlaces("all");
}

function populateDestinations() {
  const select = document.querySelector("#destination");

  if (!select) {
    return;
  }

  places.forEach((place) => {
    const option = document.createElement("option");
    option.value = place.id;
    option.textContent = `${place.name}`;
    select.appendChild(option);
  });
}

function setupMenu() {
  const button = document.querySelector("#menu-button");
  const nav = document.querySelector("#primary-nav");

  if (!button || !nav) {
    return;
  }

  button.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    button.setAttribute("aria-expanded", `${open}`);
    button.textContent = open ? `Close` : `Menu`;
  });
}

function storeInquiry() {
  const form = document.querySelector("#inquiry-form");

  if (!form) {
    return;
  }

  form.addEventListener("submit", () => {
    const data = new FormData(form);
    const inquiry = {
      fullname: `${data.get("fullname")}`,
      email: `${data.get("email")}`,
      destination: `${data.get("destination")}`,
      message: `${data.get("message")}`
    };
    localStorage.setItem("latestInquiry", JSON.stringify(inquiry));
  });
}

function destinationName(id) {
  const match = places.find((place) => place.id === id);
  return match ? `${match.name}` : `your trip`;
}

function showConfirmation() {
  const message = document.querySelector("#confirm-message");
  const countOutput = document.querySelector("#question-count");

  if (!message || !countOutput) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const fullname = params.get("fullname");

  if (!fullname) {
    message.textContent = `Use the contact form to ask a travel question.`;
    countOutput.textContent = ``;
    return;
  }

  const signature = `${params.toString()}`;
  const previous = localStorage.getItem("lastQuestion");
  let count = Number(localStorage.getItem("questionCount")) || 0;

  if (previous !== signature) {
    count += 1;
    localStorage.setItem("questionCount", `${count}`);
    localStorage.setItem("lastQuestion", signature);
  }

  const place = destinationName(params.get("destination"));
  const label = count === 1 ? `question` : `questions`;

  message.textContent = `Thank you, ${fullname}. Your question about ${place} has been received.`;
  countOutput.textContent = `You have sent ${count} travel ${label} from this browser.`;
}

setFooterDates();
setupMenu();
showVisitMessage();
setupFilters();
populateDestinations();
storeInquiry();
showConfirmation();
