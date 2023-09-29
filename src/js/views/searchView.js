class SearchView {
  _parentEl = document.querySelector(".search");
  _filterEl = document.getElementById("region-select");
  _query;

  getQuery() {
    this._query = this._parentEl.querySelector(".search--field").value;
    this._clearInput();
    return this._query;
  }

  _clearInput() {
    this._parentEl.querySelector(".search--field").value = "";
  }

  addHandlerSearch(handler) {
    this._parentEl.addEventListener("change", function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
