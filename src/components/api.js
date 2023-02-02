const apiConfig = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-17",
  headers: {
    authorization: "c8ce4a71-bdd1-470d-8928-726e47ccdf35",
    "Content-Type": "application/json",
  },
};

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  validation(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then((res) => this.validation(res));
  }

  getCardsInfo() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then((res) => this.validation(res));
  }

  patchUserInfo(nameValue, abouValue) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: nameValue,
        about: abouValue,
      }),
    }).then((res) => this.validation(res));
  }

  patchAvatar(avatarValue) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: "c8ce4a71-bdd1-470d-8928-726e47ccdf35",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: avatarValue,
      }),
    }).then((res) => this.validation(res));
  }

  //Функция удаления карточки
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: apiConfig.headers,
    }).then((res) => {
      this.validation(res);
    });
  }

  //Функция удаления лайка
  deleteCardLike(cardLikeId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardLikeId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this.validation(res));
  }

  //Функция добавления лайка на карточку
  addCardLike(cardLikeId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardLikeId}`, {
      method: "PUT",
      headers: this._headers,
      body: JSON.stringify(),
    }).then((res) => this.validation(res));
  }

  // Функция добавления карточки через форму:
  additionCardsByForm(nameValue, linkValue) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: nameValue,
        link: linkValue,
      }),
    }).then((res) => this.validation(res));
  }
}

export const api = new Api(apiConfig);
