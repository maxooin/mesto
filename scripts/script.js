//Импортируем массив
import {initialCards} from './cards.js';
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

const templateElement = document.querySelector('.template-element').content;
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
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

//Функция удаления карточки
function handleDeleteElement(evt) {
  evt.target.closest('.element').remove();
}

//Функция постановки лайка
function handleLikeElement(evt) {
  evt.target.classList.toggle('element__like-button_active');
}

// Функция для открытия popupEdit
function openEdit() {
  openPopup(popupEdit);

  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
}

// Функция сохранения Имени и работы
function handleFormSubmit(evt) {
  evt.preventDefault();

  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;

  closePopup(popupEdit);
}

// Добавление element в html
function prependToSection(title, link) {
  const newElement = createElement({name: title, link: link});
  elementsSection.prepend(newElement);
}

//Функция добавления нового элемента
function handleAddElement(evt) {
  evt.preventDefault();

  prependToSection(titleInput.value, urlInput.value);

  closePopup(popupAdd);
  addForm.reset();
}

//Функция для октрытия Popup Картинки.
function handleShowPhoto(image, caption) {

  popupImage.src = image;
  popupImage.alt = caption;
  popupCaption.textContent = caption;

  openPopup(popupPhoto);
}

// Функция создания элемента и вставления из шаблона
function createElement(item) {
  const element = templateElement.querySelector('.element').cloneNode(true);
  const elementImage = element.querySelector('.element__image');
  const elementTitle = element.querySelector('.element__title');
  const elementLike = element.querySelector('.element__like-button');
  const elementDelete = element.querySelector('.element__delete-button');

  elementImage.src = item.link;
  elementImage.alt = item.name;
  elementTitle.textContent = item.name;

  elementLike.addEventListener('click', handleLikeElement);
  elementDelete.addEventListener('click', handleDeleteElement);
  elementImage.addEventListener('click', () => handleShowPhoto(item.link, item.name));

  return element;
}

//Функция отрисовки элемента
function renderList() {
  initialCards.forEach(item =>
    prependToSection(item.name, item.link));
}

renderList();
//Слушатели на кнопках и формах
addButton.addEventListener('click', () => openPopup(popupAdd));
addCloseButton.addEventListener('click', () => closePopup(popupAdd));
addForm.addEventListener('submit', handleAddElement);
popupOpenEdit.addEventListener('click', openEdit);
popupCloseButton.addEventListener('click', () => closePopup(popupEdit));
formEdit.addEventListener('submit', handleFormSubmit);
photoCloseButton.addEventListener('click', () => closePopup(popupPhoto));
