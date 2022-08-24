export default class Api {
  constructor(apiSetting) {
    this._url = apiSetting.url;
    this._headers = apiSetting.headers;
  }

  _checkResponse(res) {
    console.log(res)
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfoApi() {
    return fetch(`${this._url}users/me`, {
      method: "GET",
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this._url}cards`, {
      method: "GET",
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  setUserInfoApi(name, job) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: job
      })
    })
      .then(this._checkResponse)
  }

  addNewElement(title, url) {
    return fetch(`${this._url}cards`, {
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
    return fetch(`${this._url}cards/likes/${id}`, {
      method: isLike ? 'PUT' : 'DELETE',
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  deleteElement(id) {
    return fetch(`${this._url}cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  changeAvatar(item) {
    return fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: item.url
      })
    })
      .then(this._checkResponse);
  }
}
