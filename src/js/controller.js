import { async } from "regenerator-runtime";
import * as model from "./model.js";
import resultsView from "./views/resultsView.js";
import searchView from "./views/searchView.js";
import filterView from "./views/filterView.js";
import countryView from "./views/countryView.js";

const controlCountry = async function () {
  // takes the hash part of url
  const id = window.location.hash.slice(1);
  if (!id) return;

  await model.loadCountry(id);

  countryView.render(model.state.country);
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

const toggleDarkMode = function () {
  const buttonsDarkTheme = document.querySelectorAll(".theme-switch");

  // Icon
  const moonIcon = document.querySelector(".moon");
  const sunIcon = document.querySelector(".sun");
  const moonText = document.querySelector(".moon-text");
  const lightText = document.querySelector(".light-text");

  // Theme Vars
  const userTheme = localStorage.getItem("theme");
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

  // Icon Toggling
  const iconToggle = () => {
    moonIcon.classList.toggle("hidden");
    sunIcon.classList.toggle("hidden");
    moonText.classList.toggle("hidden");
    lightText.classList.toggle("hidden");
  };

  // Initial Theme Check
  const themeCheck = () => {
    if (userTheme === "dark" || (!userTheme && systemTheme)) {
      document.documentElement.classList.add("dark");
      moonIcon.classList.add("hidden");
      moonText.classList.add("hidden");
      sunIcon.classList.remove("hidden");
      lightText.classList.remove("hidden");
      return;
    }
    sunIcon.classList.add("hidden");
  };

  // Manual Theme Switch
  const themeSwitch = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      iconToggle();
      return;
    }
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
    iconToggle();
  };

  buttonsDarkTheme.forEach(function (button) {
    button.addEventListener("click", themeSwitch);
  });

  // invoke theme check on initial load
  themeCheck();
};
toggleDarkMode();

const init = function () {
  searchView.addHandlerSearch(controlSearchResults);
  filterView.addHandlerFilter(controlFilterResults);
  countryView.addHandlerRender(controlCountry);
};
init();
