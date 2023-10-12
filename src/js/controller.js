import { async } from "regenerator-runtime";
import * as model from "./model.js";
import resultsView from "./views/resultsView.js";
import searchView from "./views/searchView.js";
import filterView from "./views/filterView.js";

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

const toggleDarkMode = function () {
  const buttonDarkTheme = document.querySelector(".theme-switch");

  // Icon
  const moonIcon = document.querySelector(".moon");
  const sunIcon = document.querySelector(".sun");
  const moonText = document.querySelector(".moon-text");
  const lightText = document.querySelector(".light-text");

  // Icon Toggling
  const iconToggle = () => {
    moonIcon.classList.toggle("hidden");
    sunIcon.classList.toggle("hidden");
    moonText.classList.toggle("hidden");
    lightText.classList.toggle("hidden");
  };

  // Manual Theme Switch
  const themeSwitch = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      iconToggle();
      return;
    }
    document.documentElement.classList.add("dark");
    iconToggle();
  };

  buttonDarkTheme.addEventListener("click", themeSwitch);
};
toggleDarkMode();

const init = function () {
  searchView.addHandlerSearch(controlSearchResults);
  filterView.addHandlerFilter(controlFilterResults);
};
init();
