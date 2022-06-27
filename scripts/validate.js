//Функция показа ошибки
const showInputError = (formElement, inputElement, errorMessage, property) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.add(property.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(property.errorClass);
};
//Функция скрытия ошибки
const hideInputError = (formElement, inputElement, property) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.remove(property.inputErrorClass);
  errorElement.classList.remove(property.errorClass);
  errorElement.textContent = '';
};
//Функция проверки input на валидность
const checkInputValidity = (formElement, inputElement, property) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, property);
  } else {
    hideInputError(formElement, inputElement, property);
  }
};
//Функция установки слушателей
const setEventListeners = (formElement, property) => {
  const inputList = Array.from(formElement.querySelectorAll(property.inputSelector));
  const buttonElement = formElement.querySelector(property.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, property);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, property);
      toggleButtonState(inputList, buttonElement, property);
    });
  });
};
//Функция включения валидации
const enableValidation = (property) => {
  const formList = Array.from(document.querySelectorAll(property.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, property);
  });
};

//Функция включения/выключения кнопки
const toggleButtonState = (inputList, buttonElement, property) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(property.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(property.inactiveButtonClass);
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});
