const countriesUrl = "https://covid-193.p.rapidapi.com/countries";
const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': 'fdc5b84c42mshdaca2435428100dp1008a2jsn4577190db909',
    'x-rapidapi-host': 'covid-193.p.rapidapi.com'
  }
};

const countrySelect = document.getElementById("countrySelect");
const statsDiv = document.getElementById("stats");

// Load Country List
async function loadCountries() {
  try {
    const res = await fetch(countriesUrl, options);
    const data = await res.json();
    const countries = data.response;

    countries.forEach(country => {
      let opt = document.createElement("option");
      opt.value = country;
      opt.textContent = country;
      countrySelect.appendChild(opt);
    });
  } catch (err) {
    console.error("Error loading countries:", err);
  }
}

// Load Statistics for Selected Country
const statsUrl = "https://covid-193.p.rapidapi.com/statistics";

async function loadStats(country) {
  try {
    const res = await fetch(`${statsUrl}?country=${country}`, options);
    const data = await res.json();
    console.log("Statistics data:", data);

    const stats = data.response[0];
    if (!stats) {
      alert("No data found for this country.");
      return;
    }

    document.getElementById("countryName").textContent = stats.country;
    document.getElementById("cases").textContent = stats.cases.total || "N/A";
    document.getElementById("deaths").textContent = stats.deaths.total || "N/A";
    document.getElementById("recovered").textContent = stats.cases.recovered || "N/A";

    statsDiv.style.display = "block";
  } catch (err) {
    console.error("Error loading stats:", err);
  }
}

// Event Listener for dropdown
countrySelect.addEventListener("change", function () {
  const country = this.value;
  if (country) {
    loadStats(country);
  } else {
    statsDiv.style.display = "none";
  }
});

// Initial Call
loadCountries();
