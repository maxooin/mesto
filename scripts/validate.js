const showInputError = (formElement, inputElement, errorMessage, setting) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.add(setting.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(setting.errorClass);
};

const hideInputError = (formElement, inputElement, setting) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.remove(setting.inputErrorClass);
  errorElement.classList.remove(setting.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, setting) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, setting);
  } else {
    hideInputError(formElement, inputElement, setting);
  }
};

const setEventListeners = (formElement, setting) => {
  const inputList = Array.from(formElement.querySelectorAll(setting.inputSelector));
  const buttonElement = formElement.querySelector(setting.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, setting);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, setting);
      toggleButtonState(inputList, buttonElement, setting);
    });
  });
};

const enableValidation = (setting) => {
  const formList = Array.from(document.querySelectorAll(setting.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, setting);
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement, setting) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(setting.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(setting.inactiveButtonClass);
  }
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});
