//Объект настроек для функции resetFormError
export const validSetting = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

export const apiSetting = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-48/',
  headers: {
    authorization: 'dc493407-c65d-4755-8236-dab7c7a9e0c4',
    'Content-Type': 'application/json'
  }
}

export const popupAdd = document.querySelector('.popup_add-form');
export const addButton = document.querySelector('.profile__add-button');
export const popupEdit = document.querySelector('.popup_edit-form');
export const editButton = document.querySelector('.profile__edit-button');
const formEdit = document.querySelector('.popup__form_edit');
export const nameInput = formEdit.querySelector('.popup__input_value_name');
export const jobInput = formEdit.querySelector('.popup__input_value_job');
export const popupAvatar = document.querySelector('.popup_avatar')
export const editAvatar = document.querySelector('.profile__avatar')
