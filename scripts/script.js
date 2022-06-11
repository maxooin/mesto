// переменные
import {initialCards} from './cards.js';

const popupAdd = document.querySelector('.popup_add-form');
const addButton = document.querySelector('.profile__add-button');

const addCloseButton = document.querySelector('.popup__add-close');
const addForm = document.querySelector('.popup__form_add');
const titleInput = addForm.querySelector('.popup__input_value_title');
const urlInput = addForm.querySelector('.popup__input_value_url');

const popupEdit = document.querySelector('.popup_edit-form');
const popupOpenEdit = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__edit-close');
const formEdit = document.querySelector('.popup__form_edit');
let nameInput = formEdit.querySelector('.popup__input_value_name');
let jobInput = formEdit.querySelector('.popup__input_value_job');
let userName = document.querySelector('.profile__name');
let userJob = document.querySelector('.profile__job');

const elementsSection = document.querySelector('.elements');


//Общая функция для открытия Popup'оф
function openPopup(popup) {
  popup.classList.add('popup_opened');
}
//Общая функция для закрытия Popup'оф
function closePopup(popup) {
  popup.classList.remove('popup_opened');
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

// Функция создания элемента и вставления из шаблона
function createElement(item) {
  const templateElement = document.querySelector('.template-element').content;
  const element = templateElement.querySelector('.element').cloneNode(true);
  const elementImage = element.querySelector('.element__image');
  const elementTitle = element.querySelector('.element__title');
  const elementLike = element.querySelector('.element__like-button');
  const elementDelete = element.querySelector('.element__delete-button');

  elementTitle.textContent = item.name;
  elementImage.alt = item.name;
  elementImage.src = item.link;

  elementLike.addEventListener('click', handleLikeElement);
  elementDelete.addEventListener('click', handleDeleteElement);

  return element;
}
//Функция отрисовки элемента
function renderList() {
  const result = initialCards.map(item => {
    return createElement(item);
  });
  elementsSection.append(...result);
}
//Функция добавления нового элемента
function handleAddElement(evt) {
  evt.preventDefault();

  const newElement = createElement({name: titleInput.value, link: urlInput.value});
  elementsSection.prepend(newElement);
  closePopup(popupAdd);
  addForm.reset();
}

renderList();

//Слушатели на кнопках и формах
addButton.addEventListener('click', () => openPopup(popupAdd));
addCloseButton.addEventListener('click', () => closePopup(popupAdd));
addForm.addEventListener('submit', handleAddElement);
popupOpenEdit.addEventListener('click', openEdit);
popupCloseButton.addEventListener('click', () => closePopup(popupEdit));
formEdit.addEventListener('submit', handleFormSubmit);
