import View from './View.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg';


class ResultsView extends View {
  _parentEl = document.querySelector('.results');
  _sortBtn = document.querySelector('.search-results__sort');
  _errorMessage = `No recipes found for your query! Please try again ;)`;
  _message = ``;

  showSortBtn() {
    this._sortBtn.classList.remove('hidden');
  }

  addHandlerSortByDuration() {
    this._sortBtn.addEventListener('click', function() {
      
    })
  }

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultsView();