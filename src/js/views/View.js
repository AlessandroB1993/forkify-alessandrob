import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  /**
   * Render the received object to the DOM
   * @param {Object | Object[]} data The data to be rendered (e.g. recipe)
   * @param {boolean} [render=true] If false, create markup string indtead of rendering the DOM
   * @returns  {undefined | string} A markup is returned if render=false
   * @this {Object} View instance
   * @author Alessandro Bergamo
   * @todo Finish implementation
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();


    const newDOM = document.createRange().createContextualFragment(newMarkup); 
    const newElements = Array.from(newDOM.querySelectorAll('*')); // Return array from a node list
    const curElements = Array.from(this._parentEl.querySelectorAll('*'));
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      // Update changed TEXT
      if (!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== '') { 
        curEl.textContent = newEl.textContent; 
      }

      // Update changed ATTRIBUTES
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr => curEl.setAttribute(attr.name, attr.value));
  }
});
  }

_clear() {
  this._parentEl.innerHTML = '';
}

renderSpinner = function () {
  const markup = `
              <div class="spinner">
                <svg>
                  <use href="${icons}#icon-loader"></use>
                </svg>
              </div>
              `;
  this._clear();
  this._parentEl.insertAdjacentHTML('afterbegin', markup);
}

renderError(message = this._errorMessage, position = 'afterbegin') {
  const markup = `
          <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
    `
  this._clear();
  this._parentEl.insertAdjacentHTML(position, markup);
}

renderMessage(message = this._message) {
  const markup = `
          <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
    `
  this._clear();
  this._parentEl.insertAdjacentHTML('afterbegin', markup);
}

}