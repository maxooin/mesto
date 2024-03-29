import Popup from "./Popup.js";

export default class PopupDelete extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form_delete');
  }

  open(deleteElement) {
    super.open();
    this._deleteElement = deleteElement;
  }

  _handleDeleteElement = (evt) => {
    evt.preventDefault();
    this._deleteElement();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._handleDeleteElement)
  }
}
