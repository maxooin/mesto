import './index.css'

//Импортируем данные
import {initialCards} from '../utils/cards.js';
import {validSetting} from "../utils/constants";
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {popupAdd, addButton, popupEdit, editButton, nameInput, jobInput} from '../utils/constants.js';

const popupEditValid = new FormValidator(validSetting, popupEdit);
popupEditValid.enableValidation();

const popupAddValid = new FormValidator(validSetting, popupAdd);
popupAddValid.enableValidation();

const section = new Section({items: initialCards, renderer: createElement}, ".elements");

const popupPicture = new PopupWithImage(".popup_photo");
const popupAddForm = new PopupWithForm(".popup_add-form", handleAddElement);

const userProfile = new UserInfo({userNameSelector: ".profile__name", jobSelector: ".profile__job"});

const popupProfileEdit = new PopupWithForm(".popup_edit-form", handleEditSubmit);

editButton.addEventListener("click", () => {
  const {name, job} = userProfile.getUserInfo();
  nameInput.value = name;
  jobInput.value = job;
  popupProfileEdit.open();
  popupEditValid.resetFormError();
});

addButton.addEventListener("click", () => {
  popupAddValid.resetFormError();
  popupAddForm.open();
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

// Функция сохранения Имени и работы
function handleEditSubmit(item) {
  const {name, job} = item;
  userProfile.setUserInfo(name, job);
  popupProfileEdit.close();
}

//Функция добавления нового элемента
function handleAddElement(item) {
  const element = createElement(
    {name: item.title, link: item.url},
    ".elements"
  );
  section.addItem(element);
  popupAddForm.close();
}

//Функция для октрытия Popup Картинки.
function handleShowPhoto(caption, image) {
  popupPicture.open(caption, image);
}

popupPicture.setEventListeners();
popupAddForm.setEventListeners();
popupProfileEdit.setEventListeners();

section.renderItems();
