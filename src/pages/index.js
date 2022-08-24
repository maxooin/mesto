import './index.css'

//Импортируем данные
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
import {FormValidator} from '../components/FormValidator.js';
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupDelete from "../components/PopupDelete.js";
import Api from "../components/Api.js";
import Card from "../components/Card.js";

let myId;
let elementList;

const api = new Api(apiSetting);

const popupEditValid = new FormValidator(validSetting, popupEdit);
popupEditValid.enableValidation();

const popupAddValid = new FormValidator(validSetting, popupAdd);
popupAddValid.enableValidation();

const popupAvatarValid = new FormValidator(validSetting, popupAvatar);
popupAvatarValid.enableValidation()

const popupPicture = new PopupWithImage(".popup_photo");
const popupAddForm = new PopupWithForm(".popup_add-form", handleAddElement);
const popupDelete = new PopupDelete('.popup_delete');
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
    myId = res._id;
    userProfile.setUserInfo(res);
  })
  .catch(err => {
    console.log(err)
  })

getInitialCards
  .then(res => {
    elementList = new Section({
        items: res,
        renderer: elementItem => {
          const element = createElement(elementItem);
          elementList.addItem(element);
        },
      },
      '.elements'
    );
    elementList.renderItems();
  })
  .catch(err => {
    console.log(err)
  })

function createElement(item) {
  const element = new Card(item, '.template-element', handleShowPhoto, myId, () => {
    popupDelete.open(() =>
      api.deleteElement(element.getId())
        .then(() => {
          element.deleteElement();
          popupDelete.close();
        })
        .catch((err) => {
          console.log(err);
        }));
  }, () => {
    api.like(element.getId())
      .then((res) => {
        element.likeElement();
        element.countLikes(res);
      })
      .catch((err => {
        console.log(err);
      }))
  }, () => {
    api.dislike(element.getId())
      .then((res) => {
        element.disLikeElement();
        element.countLikes(res)
      })
      .catch((err) => {
        console.log(err);
      })
  })
  return element.createElement();
}

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
  popupAddForm.alertLoading(true, 'Сохранить');
  api.addNewElement(item.title, item.url)
    .then(res => {
      elementList.addItem(createElement(res));
      popupAddForm.close();
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      this.alertLoading(false, 'Сохранить');
    })
}

//Функция для октрытия Popup Картинки.
function handleShowPhoto(name, link) {
  popupPicture.open(name, link);
}

function handleChangeAvatar(item) {
  popupEditAvatar.alertLoading(true, 'Сохранить');
  api.changeAvatar(item)
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
popupDelete.setEventListeners();
