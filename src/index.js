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
const popups = document.querySelectorAll(".popup");
const popupInfoName = document.querySelector("#input-name");
const popupInfoAbout = document.querySelector("#input-about");
const avatarInputValue = document.querySelector("#input-src-avatar");
const linkImg = document.querySelector("#input-src");
const ImgName = document.querySelector("#input-text-img");
const popupPlace = document.querySelector("#popup-container-place");
const popupAvatar = document.querySelector("#popup-avatar");
const popupProfile = document.querySelector("#popup");
const cardsForm = document.forms.editCards;
const avatarForm = document.forms.editAvatar;

// TODO - refactor
//const cardContainer = document.querySelector(".cards-grid");

import { api } from "./components/api.js";
import { openPopup, closePopup, renderLoading } from "./components/modal.js";
import { settings } from "./components/constants.js";
import { Validator } from "./components/validate.js";
import {
  Card,
  profileName,
  profileStatus,
  profileAvatar,
  renderCard,
} from "./components/card.js";
import {Section} from "./components/section.js"

function formValidation(formSelector) {
  const formElements = Array.from(document.querySelectorAll(formSelector));
  formElements.forEach((formElement) => {
    const validator = new Validator(settings, formElement);
    validator.enableValidation();
  });
}
formValidation(settings.formSelector);

//функция загрезки карточек
function renderCards() {
  Promise.all([api.getUserInfo(), api.getCardsInfo()])
    .then(([info, cards]) => {

      const sec = new Section (
        cards,
        (item) => {
          return new Card(
            item,
            item.owner._id === info._id,
            info,
            () => {},
            "#card-template"
          );  
        },
        ".cards-grid")
      sec.renderItems()
      profileName.textContent = info.name;
      profileStatus.textContent = info.about;
      profileAvatar.setAttribute("src", info.avatar);
    })
    .catch((err) => {
      console.error(err);
    });
}
renderCards();

//Добавление карточки через форму:
cardsForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  renderLoading("add-button-img", true, "Создать");
  api
    .additionCardsByForm(ImgName.value, linkImg.value)
    .then((card) => {
      renderCard(
        card.link,
        card.name,
        card.likes.length,
        card.likes,
        card._id,
        true
      );
      cardsForm.reset();
      closePopup(popupPlace);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      renderLoading("add-button-img", false, "Создать");
    });
});

////открыть закрыть попап:
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close-icon")) {
      closePopup(popup);
    }
  });
});

buttonOpenEditPopup.addEventListener("click", () => {
  openPopup(popupProfile);
  popupInfoName.value = profileName.textContent;
  popupInfoAbout.value = profileStatus.textContent;
});

avatarEditButton.addEventListener("click", () => openPopup(popupAvatar));
profileAvatar.addEventListener("click", () => openPopup(popupAvatar));
buttonOpenCardPopup.addEventListener("click", () => openPopup(popupPlace));

//отправка формы:
avatarForm.addEventListener("submit", function handleAvatarformSubmit(evt) {
  evt.preventDefault();
  renderLoading("add-button-img-avatar", true, "Сохранить");
  api
    .patchAvatar(avatarInputValue.value)
    .then((info) => {
      profileAvatar.setAttribute("src", info.avatar);
      avatarForm.reset();
      closePopup(popupAvatar);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      renderLoading("add-button-img-avatar", false, "Сохранить");
    });
});
profileForm.addEventListener("submit", function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  renderLoading("add-button-inf", true, "Сохранить");
  api
    .patchUserInfo(popupInfoName.value, popupInfoAbout.value)
    .then((info) => {
      profileName.textContent = info.name;
      profileStatus.textContent = info.about;
      profileAvatar.setAttribute("src", info.avatar);
      closePopup(popupProfile);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      renderLoading("add-button-inf", false, "Сохранить");
    });
});
