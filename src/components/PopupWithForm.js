import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSection, handleFormSubmit) {
    super(popupSection);

    this._form = this._popup.querySelector('.popup__form');
    this._inputs = [...this._form.querySelectorAll('.popup__input')];
    this._values = {};
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    this._inputs.forEach((input) => {
      this._values[input.name] = input.value;
    });
    return this._values;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();

    this._form.reset();
  }
}
