const apiConfig = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-17",
  headers: {
    authorization: "c8ce4a71-bdd1-470d-8928-726e47ccdf35",
    "Content-Type": "application/json",
  },
};

function getUserInfo() {
  return fetch("https://nomoreparties.co/v1/plus-cohort-17/users/me ", {
    headers: apiConfig.headers,
  }).then((res) => validation(res));
}

function getCardsInfo() {
  return fetch("https://nomoreparties.co/v1/plus-cohort-17/cards", {
    headers: apiConfig.headers,
  }).then((res) => validation(res));
}

function patchUserInfo(nameValue, abouValue) {
  return fetch("https://nomoreparties.co/v1/plus-cohort-17/users/me ", {
    method: "PATCH",
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: nameValue,
      about: abouValue,
    }),
  }).then((res) => validation(res));
}

function patchAvatar(avatarValue) {
  return fetch("https://nomoreparties.co/v1/plus-cohort-17/users/me/avatar ", {
    method: "PATCH",
    headers: {
      authorization: "c8ce4a71-bdd1-470d-8928-726e47ccdf35",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: avatarValue,
    }),
  }).then((res) => validation(res));
}

function validation(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}
//Функция удаления карточки
function deleteCard(cardId) {
  return fetch(`https://nomoreparties.co/v1/plus-cohort-17/cards/${cardId}`, {
    method: "DELETE",
    headers: apiConfig.headers,
  }).then((res) => {
    validation(res);
  });
}

//Функция удаления лайка
function deleteCardLike(cardLikeId) {
  return fetch(
    `https://nomoreparties.co/v1/plus-cohort-17/cards/likes/${cardLikeId}`,
    {
      method: "DELETE",
      headers: apiConfig.headers,
    }
  ).then((res) => validation(res));
}

//Функция добавления лайка на карточку
function addCardLike(cardLikeId) {
  return fetch(
    `https://nomoreparties.co/v1/plus-cohort-17/cards/likes/${cardLikeId}`,
    {
      method: "PUT",
      headers: apiConfig.headers,
      body: JSON.stringify(),
    }
  ).then((res) => validation(res));
}

// Функция добавления карточки через форму:
function additionCardsByForm(nameValue, linkValue) {
  return fetch("https://nomoreparties.co/v1/plus-cohort-17/cards", {
    method: "POST",
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: nameValue,
      link: linkValue,
    }),
  }).then((res) => validation(res));
}

export {
  additionCardsByForm,
  addCardLike,
  deleteCardLike,
  getUserInfo,
  getCardsInfo,
  deleteCard,
  patchUserInfo,
  patchAvatar,
};
