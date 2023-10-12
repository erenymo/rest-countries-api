class ResultsView {
  _parentEl = document.querySelector(".container__countries");
  _data;

  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  _clear() {
    this._parentEl.innerHTML = "";
  }

  renderResults(data) {
    this._clear();
    this._data = data;
    this._data.map((country) => this.render(country));
  }

  _generateMarkup() {
    return `
        <li
        class="country--card shadow-lg bg-elements dark:text-elements dark:bg-darkModeElements rounded overflow-hidden hover:-translate-y-4 duration-300"
      ><a href="country.html#${this._data.cca2}">
        <img
          class="country-flag w-full h-44"
          src="${this._data.flagUrl}"
          alt="country flag"
        />
      
        <div class="country--info p-6">
          <h1 class="country--name font-bold text-xl mb">${
            this._data.countryName
          }</h1>
          <p class="country--population font-semibold mt-4">
            Population: <span class="font-normal">${this._data.population.toLocaleString(
              "tr-TR"
            )}</span>
          </p>
          <p class="country--region font-semibold">
            Region: <span class="font-normal">${this._data.region}</span>
          </p>
          <p class="country--capital font-semibold">
            Capital: <span class="font-normal">${this._data.capital}</span>
          </p>
        </div>
        </a>
      </li>
          `;
  }
}

export default new ResultsView();
