class CountryView {
  _parentEl = document.querySelector(".container__country--detail");
  _data;
  _id;

  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((ev) =>
      window.addEventListener(ev, handler)
    );
  }

  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  _clear() {
    this._parentEl.innerHTML = "";
  }

  _generateMarkup() {
    return `
          <div class="flag--area w-full  xl:h-86 h-72">
            <img
              class="w-full h-full"
              src="${this._data.flagUrl}"
              alt="country flag"
            />
          </div>
          <div class="country--detail dark:text-elements flex flex-col justify-center gap-8">
            <h2 class="country--name font-bold text-2xl">${
              this._data.countryName
            }</h2>
            <div class="country--informations grid grid-cols-1 md:grid-cols-2">
              <div class="first--part flex flex-col gap-2">
                <p class="country--native-name font-semibold">
                  Native Name: <span class="font-normal">${
                    this._data.nativeName
                  }</span>
                </p>
                <p class="country--population font-semibold">
                  Population: <span class="font-normal">${this._data.population.toLocaleString(
                    "tr-TR"
                  )}</span>
                </p>
                <p class="country--region font-semibold">
                  Region: <span class="font-normal">${this._data.region}</span>
                </p>
                <p class="country--sub-region font-semibold">
                  Sub Region: <span class="font-normal">${
                    this._data.subRegion
                  }</span>
                </p>
                <p class="country--capital font-semibold">
                  Capital: <span class="font-normal">${
                    this._data.capital
                  }</span>
                </p>
              </div>
              <div class="second--part flex flex-col gap-2">
                <p class="country--domain font-semibold">
                  Top Level Domain: <span class="font-normal">${
                    this._data.topLevelDomain
                  }</span>
                </p>
                <p class="country--currency font-semibold">
                  Currencies: <span class="font-normal">${
                    this._data.currencies
                  }</span>
                </p>
                <p class="country--languages font-semibold">
                  Languages:
                  ${this._data.languages
                    .map(this._generateMarkupLanguages)
                    .join(",")}
                </p>
              </div>
            </div>
            <div class="flex items-center">
              <p class="country--borders font-semibold mr-2">
                Border Countries:
              </p>
              <div class="container__border--list">
                ${
                  this._data.borders
                    ? this._data.borders
                        .map(this._generateMarkupBorderCountries)
                        .join("")
                    : "There is no neighboring country"
                }
              </div>
            </div>
            </div>
    `;
  }

  _generateMarkupLanguages(lang) {
    return `
    <span class="font-normal">${lang.name}</span>
    `;
  }

  _generateMarkupBorderCountries(border) {
    return `
    <button class="country--border py-1 px-3 my-1 border"><a href="country.html#${border}">${border}</button>
    `;
  }
}

export default new CountryView();
