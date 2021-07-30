const countriesEl = document.getElementById('country');
const toggleBtn = document.getElementById('toggle');
const filterBtn = document.getElementById('filter');
const regionFilters = filterBtn.querySelectorAll('li');
const searchEl = document.getElementById('search');
const modal = document.getElementById('modal');
const closeBtn = document.getElementById('close');


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
            <img class="country-images" src="${country.flag}" alt="${country.name}">
        </div>
        <div class="country-body">
            <h3 class="country-name">${country.name}</h3>
            <p><strong>Population: </strong>${country.population}</p>
            <p class="country-region"><strong>Region: </strong>${country.region}</p>
            <p><strong>Capital: </strong>${country.capital}</p>
        </div>
    `

    countryEl.addEventListener('click', () => {
        modal.style.display = 'flex';
		showCountryDetails(country);
    })

    countriesEl.appendChild(countryEl);
});
}

function showCountryDetails(country) {
	const modalBody = modal.querySelector('.modal-body');
	const modalImg = modal.querySelector('img');

	modalImg.src = country.flag;

	modalBody.innerHTML = `
        <h2>${country.name}</h2>
        <p>
            <strong>Native Name:</strong>
            ${country.nativeName}
        </p>
        <p>
            <strong>Population:</strong>
            ${country.population}
        </p>
        <p>
            <strong>Region:</strong>
            ${country.region}
        </p>
        <p>
            <strong>Sub Region:</strong>
            ${country.subregion}
        </p>
        <p>
            <strong>Capital:</strong>
            ${country.capital}
        </p>
        <p>
            <strong>Top Level Domain:</strong>
            ${country.topLevelDomain[0]}
        </p>
        <p>
            <strong>Currencies:</strong>
            ${country.currencies.map(currency => currency.code)}
        </p>
        <p>
            <strong>Languages:</strong>
            ${country.languages.map(language => language.name)}
        </p>
    `;
}

// TOGGLE THEME DARK / LIGHT

toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-body');
})

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
})

// SHOW OR HIDE FILTERS

filterBtn.addEventListener('click', () => {
    filterBtn.classList.toggle('open');
})

searchEl.addEventListener('input', e => {
    const { value } = e.target;
    const countryName = document.querySelectorAll('.country-name');

    countryName.forEach(name => {
        if (name.innerText.toLowerCase().includes(value.toLowerCase())) {
            name.parentElement.parentElement.style.display = 'block';
        }
        else {
            name.parentElement.parentElement.style.display = 'none';
        }
    });
    
});

regionFilters.forEach(filter => {
	filter.addEventListener('click', () => {
		const value = filter.innerText;
		const countryRegion = document.querySelectorAll('.country-region');

		countryRegion.forEach(region => {
			if (region.innerText.includes(value) || value === 'All') {
				// .card -> .card-body -> .country-region
				region.parentElement.parentElement.style.display = 'block';
			} else {
				region.parentElement.parentElement.style.display = 'none';
			}
		});
	});
});
