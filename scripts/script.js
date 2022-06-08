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
const popup = document.querySelector('.popup');
const popupOpenEdit = document.querySelector('.profile__edit-button');
const popCloseButton = document.querySelector('.popup__close-button');
const formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input_value_name');
let jobInput = formElement.querySelector('.popup__input_value_job');
let userName = document.querySelector('.profile__name');
let userJob = document.querySelector('.profile__job');


// Функция для открытия popup
function openEdit() {
  popup.classList.add('popup_opened');

  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
}

// Функция для закрытия popup
function closeEdit() {
  popup.classList.remove('popup_opened')
}

// Функция для submit

function handleFormSubmit(evt) {
  evt.preventDefault();

  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;

  closeEdit();
}

popupOpenEdit.addEventListener('click', openEdit);
popCloseButton.addEventListener('click', closeEdit);
formElement.addEventListener('submit', handleFormSubmit);
