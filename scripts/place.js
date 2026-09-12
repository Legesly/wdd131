// Footer: current year and last modified date
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// Static weather values matching the Weather section content
const temperature = 82; // °F
const windSpeed = 8; // mph

// One-line wind chill calculation (°F / mph)
function calculateWindChill(tempF, speedMph) {
  return (35.74 + 0.6215 * tempF - 35.75 * Math.pow(speedMph, 0.16) + 0.4275 * tempF * Math.pow(speedMph, 0.16)).toFixed(1);
}

let windChill = "N/A";

if (temperature <= 50 && windSpeed > 3) {
  windChill = `${calculateWindChill(temperature, windSpeed)} °F`;
}

document.getElementById("windchill").textContent = windChill;
