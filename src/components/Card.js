export class Card {
  constructor(title, link, cardSelector, handleShowPhoto, item, myId, handleElementDelete) {
    this._title = title;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleShowPhoto = handleShowPhoto;
    this._handleDeleteElement = handleElementDelete
    this._item = item;
    this._id = item._id;
    this._ownerId = item.owner._id;
    this._myId = myId;
    this._likes = item.likes

  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);
  }

  getId() {
    return this._id
  }

  _checkLikes() {
    this._likes.forEach(like => {
      if (like._id === this._myId) {
        this._element.querySelector('.element__like-button').classList.add('element__like-button_active');
      }
    });
  }

  countLikes(data) {
    this._element.querySelector('.element__like-count').textContent = data.likes.length;
  }

  deleteElement() {
    this._element.closest(".element").remove();
  }

  _handleLikeElement() {
    this._like.classList.toggle("element__like-button_active");
  }

  _setEventListener() {

    if (this._ownerId === this._myId) {
      this._delete.addEventListener("click", () => {
        this._handleDeleteElement();
      });
    }

    this._like.addEventListener("click", () => {
      this._handleLikeElement();
    });

    this._image.addEventListener("click", () => {
      this._handleShowPhoto(this._title, this._link);
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._like = this._element.querySelector(".element__like-button");
    if (this._ownerId === this._myId) {
      this._delete = this._element.querySelector(".element__delete-button");
    }
    this._image = this._element.querySelector(".element__image");

    this._setEventListener();
    this.countLikes(this._item);
    this._checkLikes();

    this._element.querySelector(".element__image").src = this._link;
    this._element.querySelector(".element__image").alt = this._title;
    this._element.querySelector(".element__title").textContent = this._title;

    return this._element;
  }
}
