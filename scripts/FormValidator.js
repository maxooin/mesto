export class FormValidator {
  constructor(validSetting, formSelector) {
    this._validSetting = validSetting;
    this._formSelector = formSelector;

    this._inputList = Array.from(
      this._formSelector.querySelectorAll(this._validSetting.inputSelector)
    );
    this._buttonElement = this._formSelector.querySelector(
      this._validSetting.submitButtonSelector
    );
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formSelector.querySelector(
      `.${inputElement.name}-error`
    );
    inputElement.classList.add(this._validSetting.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._validSetting.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formSelector.querySelector(
      `.${inputElement.name}-error`
    );
    inputElement.classList.remove(this._validSetting.inputErrorClass);
    errorElement.classList.remove(this._validSetting.errorClass);
    errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.setAttribute("disabled", "");
      this._buttonElement.classList.add(this._validSetting.inactiveButtonClass);
    } else {
      this._buttonElement.removeAttribute("disabled");
      this._buttonElement.classList.remove(this._validSetting.inactiveButtonClass);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  resetFormError() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }
}
