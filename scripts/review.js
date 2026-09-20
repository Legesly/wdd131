const storageKey = "reviewCount";
let count = Number(localStorage.getItem(storageKey)) || 0;
count += 1;
localStorage.setItem(storageKey, String(count));

const countMessage = document.querySelector("#review-count");
if (count === 1) {
  countMessage.textContent = "This is your first review submitted from this browser.";
} else {
  countMessage.textContent = `You have submitted ${count} reviews from this browser.`;
}

document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastmodified").textContent = document.lastModified;
