import "./index.css";
import "../components/Card.js";
import "../components/Popup.js";
import "../components/utils/utilits.js";
import "../components/FormValidator.js";
import "../components/Api.js";
import "../components/Section.js";
import "../components/utils/constants.js";

import { Api } from "../components/Api.js";
import { renderLoading } from "../components/utils/utilits.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import {
  settings,
  apiConfig,
  buttonOpenCardPopup,
  buttonOpenEditPopup,
  avatarEditButton,
  avatarInputValue,
  linkImg,
  imgName,
  profileAvatar,
} from "../components/utils/constants.js";
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo";

const api = new Api(apiConfig);
let sec = null;
const userInfo = new UserInfo(
  ".profile__name",
  ".profile__status",
  ".profile__avatar"
);

function loadUserInfo() {
  api
    .getUserInfo()
    .then((info) => {
      userInfo.setUserInfo(info);
    })
    .catch((err) => {
      console.error(err);
    });
}
loadUserInfo();
const info = userInfo.getUserInfo();

const popupAvatar = new PopupWithForm("#popup-avatar", (evt) => {
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
});

const popupPlace = new PopupWithForm("#popup-container-place", (evt) => {
  evt.preventDefault();
  renderLoading("add-button-img", true, "Создать");
  api
    .additionCardsByForm(imgName.value, linkImg.value)
    .then((card) => {
      const newCard = createCard(card, info);
      sec.setItem(newCard);
      popupPlace.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      renderLoading("add-button-img", false, "Создать");
    });
});

const popupProfile = new PopupWithForm("#popup", (evt, data) => {
  evt.preventDefault();
  renderLoading("add-button-inf", true, "Сохранить");
  api
    .patchUserInfo(data.firstname, data.about)
    .then((info) => {
      userInfo.setUserInfo(info);
      popupProfile.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      renderLoading("add-button-inf", false, "Сохранить");
    });
});

const popupImage = new PopupWithImage(".popup_img");

function addFormValidation(formSelector) {
  const formElements = Array.from(document.querySelectorAll(formSelector));
  formElements.forEach((formElement) => {
    const validator = new FormValidator(settings, formElement);
    validator.enableValidation();
  });
}
addFormValidation(settings.formSelector);

function createCard(item, info) {
  const newCard = new Card(
    item,
    item.owner._id === info._id,
    info,
    (url, name) => {
      popupImage.open(url, name);
    },
    "#card-template",
    api
  );
  return newCard.generate();
}

//функция загрузки карточек
function renderCards() {
  api
    .getCardsInfo()
    .then((cards) => {
      sec = new Section(
        cards.reverse(),
        (item) => {
          return createCard(item, userInfo.getUserInfo());
        },
        ".cards-grid"
      );
      sec.renderItems();
    })
    .catch((err) => {
      console.error(err);
    });
}
renderCards();

buttonOpenEditPopup.addEventListener("click", () => {
  popupProfile.open();
  popupProfile.setInputValues({
    firstname: document.querySelector(".profile__name").textContent,
    about: document.querySelector(".profile__status").textContent,
  });
});
avatarEditButton.addEventListener("click", () => popupAvatar.open());
profileAvatar.addEventListener("click", () => popupAvatar.open());
buttonOpenCardPopup.addEventListener("click", () => popupPlace.open());
