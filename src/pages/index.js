import './index.css'

//Импортируем данные
// import {initialCards} from '../utils/cards.js';
import {apiSetting, validSetting} from "../utils/constants";
import {
  addButton,
  editAvatar,
  editButton,
  jobInput,
  nameInput,
  popupAdd,
  popupAvatar,
  popupEdit
} from '../utils/constants.js';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupDelete from "../components/PopupDelete.js";
import Api from "../components/Api.js";

let myId;
let cardList;

const api = new Api(apiSetting);

const popupEditValid = new FormValidator(validSetting, popupEdit);
popupEditValid.enableValidation();

const popupAddValid = new FormValidator(validSetting, popupAdd);
popupAddValid.enableValidation();

const popupAvatarValid = new FormValidator(validSetting, popupAvatar);
popupAvatarValid.enableValidation()

// const section = new Section({items: initialCards, renderer: createElement}, ".elements");

const popupPicture = new PopupWithImage(".popup_photo");
const popupAddForm = new PopupWithForm(".popup_add-form", handleAddElement);
const popupDelete = new PopupDelete('.popup_delete', '.popup__form_delete');
const popupEditAvatar = new PopupWithForm('.popup_avatar', handleChangeAvatar);
const popupProfileEdit = new PopupWithForm(".popup_edit-form", handleEditSubmit);

const userProfile = new UserInfo({
  userNameSelector: ".profile__name",
  jobSelector: ".profile__job",
  userAvatarSelector: '.profile__photo'
});

const getUserInfoPromise = api.getUserInfoApi();
const getInitialCards = api.getInitialCards();

getUserInfoPromise
  .then(res => {
    userProfile.setUserInfo(res);
  })
  .catch(err => {
    console.log(err)
  })

getInitialCards.then(res => {
  cardList = new Section({
      items: res,
      renderer: elementItem => {
        const element = createElement(elementItem);
        cardList.addItem(element)
      },
    },
    '.elements'
  );
  cardList.renderItems();
})
  .catch(err => {
    console.log(err)
  });

Promise.all(([getUserInfoPromise, getInitialCards]))
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log(err)
  })
editButton.addEventListener("click", () => {
  nameInput.value = userProfile.getUserInfo().name;
  jobInput.value = userProfile.getUserInfo().job;
  popupProfileEdit.open();
  popupEditValid.resetFormError();
});

addButton.addEventListener("click", () => {
  popupAddValid.resetFormError();
  popupAddForm.open();
});

editAvatar.addEventListener('click', () => {
  popupAvatarValid.resetFormError()
  popupEditAvatar.open()
})

function createElement(item) {
  const element = new Card(
    item.name,
    item.link,
    ".template-element",
    handleShowPhoto,
    myId,
    () => {
      popupDelete.open(() =>
        api.deleteElement(element.getId())
          .then(() => {
            element.deleteElement();
            popupDelete.close()
          })
          .catch((err) => {
            console.log(err);
          }));
    }
  );
  return element.generateCard();
}

// Функция сохранения Имени и работы
function handleEditSubmit(item) {
  popupProfileEdit.alertLoading(true, 'Сохранить');
  api.setUserInfoApi(item.name, item.job)
    .then(res => {
      userProfile.setUserInfo(res);
      popupProfileEdit.close();
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      popupProfileEdit.alertLoading(false, 'Сохранить');
    })

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

function handleChangeAvatar(item) {
  popupEditAvatar.alertLoading(true, 'Сохранить');
  api.changeAvatar(item.avatar)
    .then(res => {
      userProfile.setUserInfo(res);
      popupEditAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEditAvatar.alertLoading(false, 'Сохранить');
    })
}

popupPicture.setEventListeners();
popupAddForm.setEventListeners();
popupProfileEdit.setEventListeners();
popupEditAvatar.setEventListeners();

// section.renderItems();
