const countriesEl = document.getElementById('country');
const toggleBtn = document.getElementById('toggle');

getcountries();

async function getcountries() {
    const res = await fetch('https://restcountries.eu/rest/v2/all')
    const countries = await res.json();

    displaycountries(countries);
}

function displaycountries(countries) {

    countriesEl.innerHTML = '';

    countries.forEach(country => {

    const countryEl = document.createElement('div');
    countryEl.classList.add('country');

    countryEl.innerHTML = `
        <div class="country-header">
            <img class="country-images" src="${country.flag}" alt="Germany">
        </div>
        <div class="country-body">
            <h3>${country.name}</h3>
            <p><strong>Population: </strong>${country.population}</p>
            <p><strong>Region: </strong>${country.region}</p>
            <p><strong>Capital: </strong>${country.capital}</p>
        </div>
    `

    countriesEl.appendChild(countryEl);
});
}

toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-body');
})