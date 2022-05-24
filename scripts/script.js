const buttonLike = document.querySelectorAll('.element__like-button');

buttonLike.forEach((buttonLike) => {
  buttonLike.addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like-button_active')
  })
})

const popup = document.querySelector('.popup');
const popupOpenEdit = document.querySelector('.profile__edit-button');
const popCloseButton = document.querySelector('.popup__close-button');
const formElement = document.querySelector('.popup__container');
let nameInput = formElement.querySelector('.popup__name');
let jobInput = formElement.querySelector('.popup__job');
let name = document.querySelector('.profile__name');
let job = document.querySelector('.profile__job');

function openEdit() {
  popup.classList.add('popup_opened');

  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
}

popupOpenEdit.addEventListener('click', (openEdit));

popCloseButton.addEventListener('click', () => {
  popup.classList.remove('popup_opened');
})

function formSubmitHandler(evt) {
  evt.preventDefault();

  name.textContent = nameInput.value;
  job.textContent = jobInput.value;

  return popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler);
