export class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  getUserInfo() {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });
  }

  getCardsInfo() {
    return this._request(`${this._baseUrl}/cards`, {
      headers: this._headers,
    });
  }

  patchUserInfo(nameValue, abouValue) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: nameValue,
        about: abouValue,
      }),
    });
  }

  patchAvatar(avatarValue) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarValue,
      }),
    });
  }

  //Функция удаления карточки
  deleteCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  //Функция удаления лайка
  deleteCardLike(cardLikeId) {
    return this._request(`${this._baseUrl}/cards/likes/${cardLikeId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  //Функция добавления лайка на карточку
  addCardLike(cardLikeId) {
    return this._request(`${this._baseUrl}/cards/likes/${cardLikeId}`, {
      method: "PUT",
      headers: this._headers,
      body: JSON.stringify(),
    });
  }

  // Функция добавления карточки через форму:
  additionCardsByForm(nameValue, linkValue) {
    return this._request(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: nameValue,
        link: linkValue,
      }),
    });
  }
}
