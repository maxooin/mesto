//Импортируем данные
import {initialCards} from './cards.js';
import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

//Объект настроек для функции resetFormError
const validSetting = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};
// переменные
const popupAdd = document.querySelector('.popup_add-form');
const addButton = document.querySelector('.profile__add-button');
const addCloseButton = document.querySelector('.popup__close-button_type_add');
const addForm = document.querySelector('.popup__form_add');
const titleInput = addForm.querySelector('.popup__input_value_title');
const urlInput = addForm.querySelector('.popup__input_value_url');

const popupEdit = document.querySelector('.popup_edit-form');
const popupOpenEdit = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close-button_type_edit');
const formEdit = document.querySelector('.popup__form_edit');
const nameInput = formEdit.querySelector('.popup__input_value_name');
const jobInput = formEdit.querySelector('.popup__input_value_job');
const userName = document.querySelector('.profile__name');
const userJob = document.querySelector('.profile__job');

const popupPhoto = document.querySelector('.popup_photo');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const photoCloseButton = document.querySelector('.popup__close-button_type_photo');

const elementsSection = document.querySelector('.elements');


//Общая функция для открытия Popup'оф
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscClose);
  document.addEventListener('click', handleClickClose);
}

//Общая функция для закрытия Popup'оф
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscClose);
  document.removeEventListener('click', handleClickClose);
}

//Функция закрытия Popup'оф по кнопке Esc
function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector('.popup_opened')
    closePopup(popup);
  }
}

//Функция закрытия Popup'оф по клику на overlay
function handleClickClose(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
}

// Функция для открытия popupEdit
function openEdit() {
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
  openPopup(popupEdit);
  popupEditValid.resetFormError();
}

//Функция открытия popupAdd
function openAdd() {
  addForm.reset();
  openPopup(popupAdd);
  popupAddValid.resetFormError();
}

// Функция сохранения Имени и работы
function handleFormSubmit(evt) {
  evt.preventDefault();

  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;

  closePopup(popupEdit);
}

//Функция добавления нового элемента
function handleAddElement(evt) {
  evt.preventDefault();

  const element = new Card(titleInput.value, urlInput.value, '.template-element');
  const newElement = element.generateCard();
  elementsSection.prepend(newElement);

  closePopup(popupAdd);
  addForm.reset();
}

//Функция для октрытия Popup Картинки.
export function handleShowPhoto(image, caption) {

  popupImage.src = image;
  popupImage.alt = caption;
  popupCaption.textContent = caption;

  openPopup(popupPhoto);
}

const popupEditValid = new FormValidator(validSetting, popupEdit);
popupEditValid.enableValidation();

const popupAddValid = new FormValidator(validSetting, popupAdd);
popupAddValid.enableValidation();

initialCards.forEach((item) => {
  const initialCard = new Card(item.name, item.link, ".template-element");
  const initialCardElement = initialCard.generateCard();
  elementsSection.prepend(initialCardElement);
});

//Слушатели на кнопках и формах
addButton.addEventListener('click', openAdd);
addCloseButton.addEventListener('click', () => closePopup(popupAdd));
addForm.addEventListener('submit', handleAddElement);
popupOpenEdit.addEventListener('click', openEdit);
popupCloseButton.addEventListener('click', () => closePopup(popupEdit));
formEdit.addEventListener('submit', handleFormSubmit);
photoCloseButton.addEventListener('click', () => closePopup(popupPhoto));
