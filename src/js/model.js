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
  return (state.country = {
    countryName: data[i].name.common,
    population: data[i].population,
    region: data[i].region,
    capital: data[i].capital[0],
    flagUrl: data[i].flags.png,
    nativeName: data[i].name.nativeName,
  });
};

export const loadCountry = async function (name) {
  try {
    const res = await fetch(`https://restcountries.com/v3.1/name/${name}`);
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

    console.log(data);
    state.search.results = data.map((country) => {
      return {
        countryName: country.name.common,
        population: country.population,
        region: country.region,
        capital: country.capital,
        flagUrl: country.flags.png,
        nativeName: country.name.nativeName,
      };
    });
  } catch (err) {
    console.error(err);
  }
};
