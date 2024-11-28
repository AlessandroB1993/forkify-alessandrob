import View from './View.js';
import icons from 'url:../../img/icons.svg';


class AddRecipeView extends View {
    _parentEl = document.querySelector('.upload');
    _form = this._parentEl.innerHTML;
    _message = 'Recipe was successfully uploaded!'

    _window = document.querySelector('.add-recipe-window');
    _overlay = document.querySelector('.overlay');
    _btnOpen = document.querySelector('.nav__btn--add-recipe');
    _btnClose = document.querySelector('.btn--close-modal');
    _popup;

    _title = document.querySelector('.input--form__title');
    _url = document.querySelector('.input--form__url');
    _image = document.querySelector('.input--form__image');
    _publisher = document.querySelector('.input--form__publisher');

    that = this;

    constructor() {
        super();
        this._addHandlerShowWindow();
        this._addHandlerHideWindow();
        this._addHandlerCheckForm();
    }

    hideWindow() {
        this._overlay.classList.add('hidden');
        this._window.classList.add('hidden');
    }

    // So we can bind the this kw when we call this method in the event listener
    toggleWindow() {
        this._overlay.classList.toggle('hidden');
        this._window.classList.toggle('hidden');
    }

    // We don't need the controller, there's just a window to show/hide 
    _addHandlerShowWindow() {
        this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
    }

    _addHandlerHideWindow() {
        this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
        this._overlay.addEventListener('click', this.toggleWindow.bind(this));
    }

    addHandlerUpload(handler) {
        this._parentEl.addEventListener('submit', function (e) {
            e.preventDefault();

            const dataArr = [...new FormData(this)]; // Returns an obj to spread into an array
            const data = Object.fromEntries(dataArr); // The opposite of the entries method available on arrays
            handler(data);
        });
    }

    _insertPopup(element, message) {
        this._popup = `
         <div class="popup">${message}</div>
         `
        element.nextElementSibling.remove();
        element.insertAdjacentHTML('afterend', this._popup);
    }

    _removePopup(element) {
        const div = `<div class="empty-slot"></div>`

        if (element.nextElementSibling.classList.contains('popup')) {
            element.nextElementSibling.remove();
            element.insertAdjacentHTML('afterend', div);
        }
    }

    _checkFormHelper(e) {

        e.target === this._title && this._title.value.length < 5 ?
            this._insertPopup(this._title, 'Title must have at least 5 characters!') :
            this._removePopup(this._title);

        e.target === this._url && this._url.value.length < 4 ?
            this._insertPopup(this._url, 'URL must have at least 4 characters!') :
            this._removePopup(this._url);

        e.target === this._image && this._image.value.length < 4 ?
            this._insertPopup(this._image, 'URL must have at least 4 characters!') :
            this._removePopup(this._image);

        e.target === this._publisher && this._publisher.value.length < 4 ?
            this._insertPopup(this._publisher, 'Publisher must have at least 5 characters!') :
            this._removePopup(this._publisher);
    }

    _addHandlerCheckForm() {
        this._parentEl.addEventListener('keydown', this._checkFormHelper.bind(this));
    }

    resetForm() {
        this._clear();
        this._parentEl.insertAdjacentHTML('afterbegin', this._form);
    }
}

export default new AddRecipeView();