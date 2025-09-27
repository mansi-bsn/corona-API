const countriesUrl = "https://covid-193.p.rapidapi.com/countries";
const statsUrl = "https://covid-193.p.rapidapi.com/statistics?country=";

const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': 'fdc5b84c42mshdaca2435428100dp1008a2jsn4577190db909',
        'x-rapidapi-host': 'covid-193.p.rapidapi.com'
    }
};

const countrySelect = document.getElementById("countrySelect");
const statsDiv = document.getElementById("stats");
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
countrySelect.addEventListener("change", async function () {
    const country = this.value;
    if (!country) return;

    try {
        const res = await fetch(statsUrl + country, options);
        const data = await res.json();
        const stats = data.response[0];

        document.getElementById("countryName").textContent = stats.country;
        document.getElementById("cases").textContent = stats.cases.total || "N/A";
        document.getElementById("deaths").textContent = stats.deaths.total || "N/A";
        document.getElementById("recovered").textContent = stats.cases.recovered || "N/A";

        statsDiv.style.display = "block";
    } catch (err) {
        console.error("Error loading stats:", err);
    }
});

loadCountries();