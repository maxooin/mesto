export default class Api {
  constructor(apiSetting) {
    this._url = apiSetting.url;
    this._headers = apiSetting.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  setUserInfo(user, job) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: user,
        about: job
      })
    })
      .then(this._checkResponse)
  }

  addNewElement(title, url) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: title,
        link: url
      })
    })
      .then(this._checkResponse);
  }

  like(id, isLike) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: isLike ? 'PUT' : 'DELETE',
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  deleteElement(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  changeAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then(this._checkResponse);
  }
}
