import "./pages/index.css";
import "./components/card.js";
import "./components/modal.js";
import "./components/utilits.js";
import "./components/validate.js";
import "./components/api.js";
import "./components/section.js";
import "./components/constants.js";

const profileForm = document.forms.editProfile;
const buttonOpenCardPopup = document.querySelector(".profile__add-button");
const buttonOpenEditPopup = document.querySelector(".profile__edit");
const avatarEditButton = document.querySelector(".profile__avatar_edit");
// const popups = document.querySelectorAll(".popup");
const popupInfoName = document.querySelector("#input-name");
const popupInfoAbout = document.querySelector("#input-about");
const avatarInputValue = document.querySelector("#input-src-avatar");
const linkImg = document.querySelector("#input-src");
const ImgName = document.querySelector("#input-text-img");
/* const popupPlace = document.querySelector("#popup-container-place");
const popupAvatar = document.querySelector("#popup-avatar");
const popupProfile = document.querySelector("#popup"); */
const profileAvatar = document.querySelector(".profile__avatar");

// TODO - refactor
//const cardContainer = document.querySelector(".cards-grid");

import { api } from "./components/api.js";
import { renderLoading, PopupWithImage, PopupWithForm } from "./components/modal.js";
import { settings } from "./components/constants.js";
import { Validator } from "./components/validate.js";
import { Card } from "./components/card.js";
import {Section} from "./components/section.js"
import { UserInfo } from "./components/UserInfo";

let sec = null;
const userInfo = new UserInfo(".profile__name", ".profile__status", api, (state) => { renderLoading("add-button-inf", state, "Сохранить"); });
const info = userInfo.getUserInfo();

const popupAvatar = new PopupWithForm('#popup-avatar',
(evt) => {
  evt.preventDefault();
  renderLoading("add-button-img-avatar", true, "Сохранить");
  api
    .patchAvatar(avatarInputValue.value)
    .then((info) => {
      profileAvatar.setAttribute("src", info.avatar);
      popupAvatar.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      renderLoading("add-button-img-avatar", false, "Сохранить");
    });
}
);

const popupPlace = new PopupWithForm(
  '#popup-container-place',
 (evt) => {
   evt.preventDefault();
  renderLoading("add-button-img", true, "Создать");
  api
    .additionCardsByForm(ImgName.value, linkImg.value)
    .then((card) => {
      const newCard = new Card(card,
        true,
        user,
        (url, name) => { popupImage.open(url, name) },
        "#card-template")
        sec.setItem(newCard.generate());
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      renderLoading("add-button-img", false, "Создать");
    });
  })

const popupProfile = new PopupWithForm('#popup',
(evt) => {
  evt.preventDefault();
  renderLoading("add-button-inf", true, "Сохранить");
  userInfo.setUserInfo(popupInfoName.value, popupInfoAbout.value)
});

const popupImage = new PopupWithImage(".popup_img")

function formValidation(formSelector) {
  const formElements = Array.from(document.querySelectorAll(formSelector));
  formElements.forEach((formElement) => {
    const validator = new Validator(settings, formElement);
    validator.enableValidation();
  });
}
formValidation(settings.formSelector);

//функция загрузки карточек
function renderCards() {
  Promise.all([info, api.getCardsInfo()])
    .then(([info, cards]) => {
      sec = new Section (
        cards.reverse(),
        (item) => {
          return new Card(
            item,
            item.owner._id === info._id,
            info,
            (url, name) => { popupImage.open(url, name) },
            "#card-template"
          );  
        },
        ".cards-grid")

      sec.renderItems()
      profileAvatar.setAttribute("src", info.avatar);
    })
    .catch((err) => {
      console.error(err);
    });
}
renderCards();

buttonOpenEditPopup.addEventListener("click", () => { popupProfile.open(); });
avatarEditButton.addEventListener("click", () =>  popupAvatar.open());
profileAvatar.addEventListener("click", () =>  popupAvatar.open());
buttonOpenCardPopup.addEventListener("click", () => popupPlace.open());

