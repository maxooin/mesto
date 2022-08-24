export default class Card {
  constructor(
    item,
    selector,
    handleOpenImage,
    myId,
    handleDeleteElement,
    like,
    dislike
  ) {
    this._item = item;
    this._name = item.name;
    this._link = item.link;
    this._likes = item.likes;
    this._id = item._id;
    this._selector = selector;
    this._handleOpenImage = handleOpenImage;
    this._myId = myId;
    this._ownerId = item.owner._id;
    this._like = like;
    this._dislike = dislike;
    this._handleDeleteElement = handleDeleteElement;
  }

  _getTemplate() {
    return document
      .querySelector(this._selector)
      .content.querySelector(".element")
      .cloneNode(true);
  }

  getId() {
    return this._id;
  }

  likeElement() {
    this._element
      .querySelector(".element__like-button")
      .classList.add("element__like-button_active");
  }

  disLikeElement() {
    this._element
      .querySelector(".element__like-button")
      .classList.remove("element__like-button_active");
  }

  _checkLikes() {
    this._likes.forEach((like) => {
      if (like._id === this._myId) {
        this._element
          .querySelector(".element__like-button")
          .classList.add("element__like-button_active");
      }
    });
  }

  countLikes(item) {
    this._element.querySelector(".element__like-count").textContent =
      item.likes.length;
  }

  deleteElement() {
    this._element.closest(".element").remove();
  };

  _setEventListeners() {
    this._image.addEventListener("click", () => {
      this._handleOpenImage(this._name, this._link);
    });

    if (this._ownerId === this._myId) {
      this._element.querySelector(".element__delete-button").addEventListener("click", () => {
        this._handleDeleteElement();
      });
    }

    this._likeButton.addEventListener("click", () => {
      if (this._likeButton.classList.contains("element__like-button_active")) {
        this._dislike();
      } else {
        this._like();
      }
    });
  }

  createElement() {
    this._element = this._getTemplate();

    if (this._ownerId !== this._myId) {
      this._element.querySelector(".element__delete-button").remove();
    }
    this._likeButton = this._element.querySelector(".element__like-button");
    this._image = this._element.querySelector(".element__image");


    this._element.querySelector(".element__image").src = this._link;
    this._element.querySelector(".element__image").alt = this._name;
    this._element.querySelector(".element__title").textContent = this._name;

    this._setEventListeners();
    this.countLikes(this._item);
    this._checkLikes();

    return this._element;
  }
}
