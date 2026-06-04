// Get current count
let count = Number(localStorage.getItem("reviewCount")) || 0;

// Increment
count++;

// Save back to localStorage
localStorage.setItem("reviewCount", count);

// Display
document.querySelector("#reviewCount").textContent = count;
