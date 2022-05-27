const popup = document.querySelector('.popup');
const popupOpenEdit = document.querySelector('.profile__edit-button');
const popCloseButton = document.querySelector('.popup__close-button');
const formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input_value_name');
let jobInput = formElement.querySelector('.popup__input_value_job');
let name = document.querySelector('.profile__name');
let job = document.querySelector('.profile__job');

// Функция для открытия popup
function openEdit() {
  popup.classList.add('popup_opened');

  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
}

// Функция для закрытия popup
function closeEdit() {
  popup.classList.remove('popup_opened')
}

// Функция для submit

function handleFormSubmit(evt) {
  evt.preventDefault();

  name.textContent = nameInput.value;
  job.textContent = jobInput.value;

  closeEdit();
}

popupOpenEdit.addEventListener('click', openEdit);
popCloseButton.addEventListener('click', closeEdit);
formElement.addEventListener('submit', handleFormSubmit);
