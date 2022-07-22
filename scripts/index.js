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
const addForm = document.querySelector('.popup__form_add');
const titleInput = addForm.querySelector('.popup__input_value_title');
const urlInput = addForm.querySelector('.popup__input_value_url');

const popupEdit = document.querySelector('.popup_edit-form');
const popupOpenEdit = document.querySelector('.profile__edit-button');
const formEdit = document.querySelector('.popup__form_edit');
const nameInput = formEdit.querySelector('.popup__input_value_name');
const jobInput = formEdit.querySelector('.popup__input_value_job');
const userName = document.querySelector('.profile__name');
const userJob = document.querySelector('.profile__job');

const popupPhoto = document.querySelector('.popup_photo');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

const closeButtons = document.querySelectorAll('.popup__close-button');
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

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

function createElement(item) {
  const element = new Card(
    item.name,
    item.link,
    ".template-element",
    handleShowPhoto
  );
  return element.generateCard();
}

function prependToSection(title, link) {
  const newElement = createElement({name: title, link: link})
  elementsSection.prepend(newElement)
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

  prependToSection(titleInput.value, urlInput.value);
  closePopup(popupAdd);
  addForm.reset();
}

//Функция для октрытия Popup Картинки.
function handleShowPhoto(caption, image) {

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
  prependToSection(item.name, item.link);
});

//Слушатели на кнопках и формах
addButton.addEventListener('click', openAdd);
addForm.addEventListener('submit', handleAddElement);
popupOpenEdit.addEventListener('click', openEdit);
formEdit.addEventListener('submit', handleFormSubmit);
