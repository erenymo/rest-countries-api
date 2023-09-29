class FilterView {
  _parentEl = document.getElementById("region-select");
  _query;

  getQuery() {
    const query = this._parentEl.value;
    return query;
  }

  addHandlerFilter(handler) {
    this._parentEl.addEventListener("change", function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new FilterView();
