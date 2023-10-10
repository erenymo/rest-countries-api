import { async } from "regenerator-runtime";

export const state = {
  country: {},
  search: {
    query: "",
    results: [],
  },
  regions: ["Africa", "America", "Asia", "Europe", "Oceania"],
};

const createCountryObject = function (data, i = 0) {
  const languages = data[i].languages;
  const languagesArray = Object.entries(languages).map(function (item) {
    return {
      code: item[0],
      name: item[1],
    };
  });

  const currencyArray = Object.values(data[i].currencies);
  const nativeName = Object.values(data[i].name.nativeName);

  return (state.country = {
    countryName: data[i].name.common,
    population: data[i].population,
    region: data[i].region,
    subRegion: data[i].subregion,
    capital: data[i].capital[0],
    topLevelDomain: data[i].tld[0],
    flagUrl: data[i].flags.png,
    nativeName: nativeName[0].common,
    cca2: data[i].cca2,
    languages: languagesArray,
    currencies: currencyArray[0].name,
    borders: data[i].borders,
  });
};

export const loadCountry = async function (id) {
  try {
    const res = await fetch(`https://restcountries.com/v3.1/alpha/${id}`);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    state.country = createCountryObject(data);
  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = async function (query, region = false) {
  try {
    state.search.query = query;

    const res = await fetch(
      `https://restcountries.com/v3.1/${!region ? `name` : `region`}/${query}`
    );
    const data = await res.json();

    // console.log(data);
    state.search.results = data.map((country) => {
      return {
        countryName: country.name.common,
        population: country.population,
        region: country.region,
        capital: country.capital,
        flagUrl: country.flags.png,
        nativeName: country.name.nativeName,
        cca2: country.cca2,
      };
    });
  } catch (err) {
    console.error(err);
  }
};
