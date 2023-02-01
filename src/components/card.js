import { openPopup } from "./modal.js";
import { api } from "./api.js";

const popupOpenImg = document.querySelector(".popup_img");
const cardContainer = document.querySelector(".cards-grid");
const popupOpenImgName = document.querySelector(".popup_img_name");
const popupOpenImgPhoto = document.querySelector(".popup_img_photo");
const popupConfirm = document.querySelector("#popup-confirm");
const profileName = document.querySelector(".profile__name");
const profileStatus = document.querySelector(".profile__status");
const profileAvatar = document.querySelector(".profile__avatar");
const cardTemplate = document.querySelector("#card-template").content;

export class Card {
  constructor({photoLink, placeName, placeLikesLength, placeLike, cardId, ownCard, info}, handleCardClick, selector) {
    console.log(selector)
    this._photoLink = photoLink, 
    this._placeName = placeName, 
    this._placeLikesLength = placeLikesLength, 
    this._placeLike = placeLike, 
    this._cardId = cardId, 
    this._ownCard = ownCard, 
    this._info = info,
    this._handleCardClick = handleCardClick, 
    this._selector = selector
  }

_getTemplate() {
  const cardTemplate = document
    .querySelector(this._selector)
    .content
    .querySelector(".card")
    .cloneNode(true)

    return cardTemplate
}

  _handleLikeClick(evt) {
    if (!evt.target.classList.contains("card__like_status_on")) {
      api
        .addCardLike(cardId)
        .then(() => {
          cardLikeCounter.textContent = Number(cardLikeCounter.textContent) + 1;
          evt.target.classList.add("card__like_status_on");
        })
        .catch((err) => {
          console.error(err);
        });
    } else if (evt.target.classList.contains("card__like_status_on")) {
      api
        .deleteCardLike(cardId, info)
        .then(() => {
          cardLikeCounter.textContent = Number(cardLikeCounter.textContent) - 1;
          evt.target.classList.remove("card__like_status_on");
        })
        .catch((err) => {
          console.error(err);
        });
    }

  }

  _setEventListeners () {
    this._element.querySelector('.card__like').addEventListener("click", (evt) => {this._handleLikeClick(evt) })
  }
  

  generate() {
    this._element = this._getTemplate()
    this._setEventListeners()

    this._element.querySelector('.card__img').textContent = this._photoLink
    this._element.querySelector('.card__name').textContent = this._placeName
    this._element.querySelector('.card__like-counter').textContent = this._placeLikesLength

    return this._element
  }
}


// функция создания (удаления) новой карточки и открытие изображения на весь экран:
function addCard(
  photoLink,
  placeName,
  placeLikesLength,
  placeLike,
  cardId,
  ownCard,
  info
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardElementImg = cardElement.querySelector(".card__img");
  const cardElementTrash = cardElement.querySelector(".card__trash");
  const cardLikeCounter = cardElement.querySelector(".card__like-counter");
  const cardLike = cardElement.querySelector(".card__like");

  //передача значений с попапа:
  cardElementImg.setAttribute("src", photoLink);
  cardElement.querySelector(".card__name").textContent = placeName;
  cardLikeCounter.textContent = placeLikesLength;
  cardElementImg.setAttribute("alt", placeName);

  // Добавление/удаление лайка:

  cardLike.addEventListener("click", (evt) => {
    if (!evt.target.classList.contains("card__like_status_on")) {
      api
        .addCardLike(cardId)
        .then(() => {
          cardLikeCounter.textContent = Number(cardLikeCounter.textContent) + 1;
          evt.target.classList.add("card__like_status_on");
        })
        .catch((err) => {
          console.error(err);
        });
    } else if (evt.target.classList.contains("card__like_status_on")) {
      api
        .deleteCardLike(cardId, info)
        .then(() => {
          cardLikeCounter.textContent = Number(cardLikeCounter.textContent) - 1;
          evt.target.classList.remove("card__like_status_on");
        })
        .catch((err) => {
          console.error(err);
        });
    }
  });

  //Проверка на наличие лайка:
  if (cardLikeCounter.textContent > 0) {
    for (let j = 0; j <= placeLikesLength; j++) {
      if (placeLike[j] !== undefined && placeLike[j]._id === info._id) {
        cardLike.classList.add("card__like_status_on");
      }
    }
  }

  //удаление карточки с сервера:
  function deletingCard() {
    if (ownCard) {
      cardElementTrash.addEventListener("click", () => {
        api
          .deleteCard(cardId)
          .then(() => {
            cardElement.remove();
          })
          .catch((err) => {
            console.error(err);
          });
      });
    } else {
      cardElement.querySelector(".card__trash").remove();
    }
  }
  deletingCard();

  //открытие попапа с картинкой:
  cardElementImg.addEventListener("click", (evt) => {
    evt.preventDefault();
    openPopup(popupOpenImg);
    popupOpenImgName.textContent = placeName;
    popupOpenImgPhoto.setAttribute("src", photoLink);
    popupOpenImgPhoto.setAttribute("alt", placeName);
  });

  return cardElement;
}
function renderCard(
  photoLink,
  placeName,
  placeLikesLength,
  placeLike,
  cardId,
  ownCard,
  info
) {
  cardContainer.prepend(
    addCard(
      photoLink,
      placeName,
      placeLikesLength,
      placeLike,
      cardId,
      ownCard,
      info
    )
  );
}

export { Card, renderCard, popupConfirm, profileName, profileStatus, profileAvatar };
