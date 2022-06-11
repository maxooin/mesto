import {initialCards} from './cards.js';

const elementsSection = document.querySelector('.elements');

// Функция для постановки Like

function handleLikeElement(evt) {
  evt.target.classList.toggle('element__like-button_active');
}

function createCard(item) {
  const templateElement = document.querySelector('.template-element').content;
  const element = templateElement.querySelector('.element').cloneNode(true);
  const elementImage = element.querySelector('.element__image');
  const elementTitle = element.querySelector('.element__title');
  const elementLike = element.querySelector('.element__like-button');

  elementTitle.textContent = item.name;
  elementImage.alt = item.name;
  elementImage.src = item.link;

  elementLike.addEventListener('click', handleLikeElement);

  return element;
}

function renderList() {
  const result = initialCards.map(item => {
    return createCard(item);
  });
  elementsSection.append(...result);
}

renderList();

// переменные
const popupAdd = document.querySelector('.popup_add-form');
const addButton = document.querySelector('.profile__add-button');

const addCloseButton = document.querySelector('.popup__add-close');

const popupEdit = document.querySelector('.popup_edit-form');
const popupOpenEdit = document.querySelector('.profile__edit-button');
const popCloseButton = document.querySelector('.popup__edit-close');
const formEdit = document.querySelector('.popup__form_edit');
let nameInput = formEdit.querySelector('.popup__input_value_name');
let jobInput = formEdit.querySelector('.popup__input_value_job');
let userName = document.querySelector('.profile__name');
let userJob = document.querySelector('.profile__job');


function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// Функция для открытия popup
function openEdit() {
  openPopup(popupEdit);

  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
}

// Функция для закрытия popup
function closeEdit() {
  closePopup(popupEdit);
}

// Функция для submit

function handleFormSubmit(evt) {
  evt.preventDefault();

  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;

  closeEdit();
}

addButton.addEventListener('click', () => openPopup(popupAdd));
addCloseButton.addEventListener('click', () => closePopup(popupAdd));
popupOpenEdit.addEventListener('click', openEdit);
popCloseButton.addEventListener('click', closeEdit);
formEdit.addEventListener('submit', handleFormSubmit);
