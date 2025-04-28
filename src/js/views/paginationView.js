import { RES_PER_PAGE } from "../config.js";
import View from "./View.js";
import icons from "url:../../img/icons.svg";

class PaginationView extends View {
  _parentEl = document.querySelector(".pagination");
  _pagesNum = document.querySelector(".pagination__num");

  addHandlerClick(handler) {
    this._parentEl.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");

      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    return this._generateMarkupBtn(currentPage, numPages);
  }

  _generateMarkupBtn(curPage, numPages) {
    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return `
            <div class="pagination__num">
            <span>${curPage} of ${numPages}</span>
          </div>

            <button data-goto="${
              curPage + 1
            }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
            </button>
          `;
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      return `
            <button data-goto="${
              curPage - 1
            }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
            </button>

            <div class="pagination__num">
            <span>${curPage} of ${numPages}</span>
          </div>
            `;
    }

    // Other page
    if (curPage < numPages) {
      return `
            <button data-goto="${
              curPage - 1
            }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
            </button>

            <div class="pagination__num">
             <span>${curPage} of ${numPages}</span>
          </div>

           <button data-goto="${
             curPage + 1
           }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}.svg#icon-arrow-right"></use>
            </svg>
            </button>
        `;
    }

    // Page 1, and there are NO other pages
    return "";
  }
}

export default new PaginationView();
