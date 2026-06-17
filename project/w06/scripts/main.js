// ===============================
// 1. Display Current Year in Footer
// ===============================
const yearSpan = document.getElementById("year");
yearSpan.textContent = new Date().getFullYear();

// ===============================
// 2. Ghana Facts (Array + Objects)
// ===============================
const ghanaFacts = [
  { title: "Capital City", info: "Accra is the capital and largest city of Ghana." },
  { title: "Independence", info: "Ghana became the first African nation to gain independence in 1957." },
  { title: "Population", info: "Ghana has a population of over 32 million people." },
  { title: "Languages", info: "English is the official language, with many local languages spoken." }
];

// Display facts in console (array method)
ghanaFacts.forEach(fact => console.log(`${fact.title}: ${fact.info}`));

// ===============================
// 3. Save Form Data to localStorage
// ===============================
const form = document.getElementById("contactForm");
const response = document.getElementById("formResponse");

if (form) {
  form.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // Simple validation (conditional logic)
    if (name === "" || email === "" || message === "") {
      response.textContent = "Please fill out all fields.";
      response.style.color = "red";
      return;
    }

    // Save to localStorage (object + template literal)
    const formData = {
      name,
      email,
      message,
      date: new Date().toLocaleString()
    };

    localStorage.setItem("ghanaContact", JSON.stringify(formData));

    response.textContent = `Thank you, ${name}! Your message has been received.`;
    response.style.color = "green";

    form.reset();
  });
}
