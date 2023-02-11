import "./index.css";
import "../components/Card.js";
import "../components/Popup.js";
import "../components/FormValidator.js";
import "../components/Api.js";
import "../components/Section.js";
import "../components/utils/constants.js";
import "../components/UserInfo.js";

import { Api } from "../components/Api.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import {
  settings,
  apiConfig,
  buttonOpenCardPopup,
  buttonOpenEditPopup,
  avatarEditButton,
  profileAvatar,
} from "../components/utils/constants.js";
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";

const api = new Api(apiConfig);
const section = new Section(
  (item) => {
    return createCard(item, userInfo.getUserInfo());
  },
  ".cards-grid"
);

const userInfo = new UserInfo(
  ".profile__name",
  ".profile__status",
  ".profile__avatar"
);

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

//функция загрузки карточек и данных пользователя
function renderCardsAndUser() {
  
  Promise.all([api.getCardsInfo(), api.getUserInfo()])
    .then(([cards, userData]) => {
      userInfo.setUserInfo(userData);
      section.setData(cards.reverse());
      section.renderItems();
    })
    .catch((err) => {
      console.error(err);
    });
}
renderCardsAndUser();

// Avatar
const popupAvatar = new PopupWithForm("#popup-avatar", (evt, {about}) => {
  evt.preventDefault();
  popupAvatar.renderLoading(true)
  api
    .patchAvatar(about)
    .then((info) => {
      console.log(info)
      userInfo.setUserInfo(info);
      popupAvatar.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      popupAvatar.renderLoading(false)
    });
});

// Card
const popupPlace = new PopupWithForm("#popup-container-place", (evt, {place, placeUrl}) => {
  evt.preventDefault();
  popupPlace.renderLoading(true)
  api
    .additionCardsByForm(place, placeUrl)
    .then((card) => {
      const newCard = createCard(card, userInfo.getUserInfo());
      section.setItem(newCard);
      popupPlace.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      popupPlace.renderLoading(false);
    });
});

// Profile
const popupProfile = new PopupWithForm("#popup", (evt, {firstname, about}) => {
  evt.preventDefault();
  popupProfile.renderLoading(true);
  api
    .patchUserInfo(firstname, about)
    .then((info) => {
      userInfo.setUserInfo(info);
      popupProfile.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      popupProfile.renderLoading(false);
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

buttonOpenEditPopup.addEventListener("click", () => {
  popupProfile.open();
  popupProfile.setInputValues(
    userInfo.getUserInfo()
  );
});
avatarEditButton.addEventListener("click", () => popupAvatar.open());
profileAvatar.addEventListener("click", () => popupAvatar.open());
buttonOpenCardPopup.addEventListener("click", () => popupPlace.open());
