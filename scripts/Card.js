export class Card {
  constructor(title, link, cardSelector, handleShowPhoto) {
    this._title = title;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleShowPhoto = handleShowPhoto;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);
  }

  _handleDeleteElement() {
    this._element.closest(".element").remove();
  }

  _handleLikeElement() {
    this._like.classList.toggle("element__like-button_active");
  }

  /*_handleShowPhoto() {
    handleShowPhoto(this._link, this._title);
  }*/

  _setEventListener() {
    this._delete.addEventListener("click", () => {
      this._handleDeleteElement();
    });

    this._like.addEventListener("click", () => {
      this._handleLikeElement();
    });

    // this._image.addEventListener("click", () => {
    //   this._handleShowPhoto();
    // });

    this._image.addEventListener("click", () => {
      this._handleShowPhoto(this._title, this._link);
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._like = this._element.querySelector(".element__like-button");
    this._delete = this._element.querySelector(".element__delete-button");
    this._image = this._element.querySelector(".element__image");

    this._setEventListener();

    this._element.querySelector(".element__image").src = this._link;
    this._element.querySelector(".element__image").alt = this._title;
    this._element.querySelector(".element__title").textContent = this._title;

    return this._element;
  }
}
