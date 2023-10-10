import { async } from "regenerator-runtime";
import * as model from "./model.js";
import resultsView from "./views/resultsView.js";
import searchView from "./views/searchView.js";
import filterView from "./views/filterView.js";
import countryView from "./views/countryView.js";

const controlCountry = async function () {
  // takes the hash part of url
  const id = window.location.hash.slice(1);
  console.log(id);
  if (!id) return;

  console.log("hi");

  await model.loadCountry(id);

  countryView.render(model.state.country);
  console.log("tamamlandi");
};

const controlSearchResults = async function () {
  try {
    // 1) get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) load search results
    await model.loadSearchResults(query);

    // 3) render results
    resultsView.renderResults(model.state.search.results);
  } catch (err) {
    console.error(err);
  }
};

const controlFilterResults = async function () {
  try {
    // 1) get filter query
    const query = filterView.getQuery();

    // 2) load search results
    await model.loadSearchResults(query, true);

    // 3) render results
    resultsView.renderResults(model.state.search.results);
  } catch (err) {
    console.error(err);
  }
};

const init = function () {
  searchView.addHandlerSearch(controlSearchResults);
  filterView.addHandlerFilter(controlFilterResults);
  countryView.addHandlerRender(controlCountry);
};
init();
