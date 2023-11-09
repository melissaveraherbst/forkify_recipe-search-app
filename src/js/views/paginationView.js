import { RESULTS_PER_PAGE } from '../config.js';
import View from './View.js';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  _data;
  _errorMessage = 'Something went wrong';

  // PUBLIC METHODS
  renderPaginationButtons(data) {
    if (!data || data.length === 0) {
      return this.renderErrorMessage(this._errorMessage);
    }
    this._data = data;
    const html = this._generateHtml();
    this._clearHtml();
    this._parentElement.insertAdjacentHTML('afterbegin', html);
  }

  addHandlerButton(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const button = e.target.closest('button');
      if (!button) return;
      const goToPage = Number(button.dataset.gotopage);
      handler(goToPage);
    });
  }

  // PRIVVATE METHODS
  _generateHtml() {
    const totalPages = Math.ceil(this._data.results.length / RESULTS_PER_PAGE);
    const activePage = Number(this._data.activePage);
    // 1) first page of only 1 page
    if (totalPages <= 1) return '';
    // 2) first page of many
    if (activePage === 1 && totalPages > 1) {
      return `
        <button class="btn--inline pagination__btn--next" data-gotopage=${activePage + 1}>
            <span>Page ${activePage + 1}</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-arrow-right"></use>
            </svg>
        </button>`;
    }
    // 3) pages between first and last
    if (activePage < totalPages) {
      return `
        <button class="btn--inline pagination__btn--next" data-gotopage=${activePage + 1}>
            <span>Page ${activePage + 1}</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-arrow-right"></use>
            </svg>
        </button>
        <button class="btn--inline pagination__btn--prev" data-gotopage=${activePage - 1}>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-arrow-left"></use>
            </svg>
            <span>Page ${activePage - 1}</span>
        </button>`;
    }
    // 4) last page of many
    if (activePage === totalPages && totalPages > 1) {
      return `
        <button class="btn--inline pagination__btn--prev" data-gotopage=${activePage - 1}>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-arrow-left"></use>
            </svg>
            <span>Page ${activePage - 1}</span>
        </button>`;
    }
  }
}

export default new PaginationView();