import "./pages/index.css";
import "./components/card.js";
import "./components/modal.js";
import "./components/utilits.js";
import "./components/validate.js";
import "./components/api.js";

const profileForm = document.forms.editProfile;
const buttonOpenCardPopup = document.querySelector(".profile__add-button");
const buttonOpenEditPopup = document.querySelector(".profile__edit");
const avatarEditButton = document.querySelector(".profile__avatar_edit");
const popups = document.querySelectorAll(".popup");
const popupInfoName = document.querySelector("#input-name");
const popupInfoAbout = document.querySelector("#input-about");
const avatarInputValue = document.querySelector("#input-src-avatar");
const avatarForm = document.forms.editAvatar;
const linkImg = document.querySelector("#input-src");
const ImgName = document.querySelector("#input-text-img");
const cardsForm = document.forms.editCards;

import {
  patchUserInfo,
  patchAvatar,
  getUserInfo,
  getCardsInfo,
  additionCardsByForm,
} from "./components/api.js";
import {
  popupPlace,
  popupAvatar,
  popupProfile,
  openPopup,
  closePopup,
  renderLoading,
} from "./components/modal.js";
import {
  profileName,
  profileStatus,
  profileAvatar,
  renderCard,
} from "./components/card.js";

//функция загрезки карточек
function renderCards() {
  Promise.all([getUserInfo(), getCardsInfo()])
    .then(([info, cards]) => {
      for (let i = cards.length - 1; i >= 0; i--) {
        if (cards[i].owner._id === info._id) {
          renderCard(
            cards[i].link,
            cards[i].name,
            cards[i].likes.length,
            cards[i].likes,
            cards[i]._id,
            true,
            info
          );
        } else {
          renderCard(
            cards[i].link,
            cards[i].name,
            cards[i].likes.length,
            cards[i].likes,
            cards[i]._id,
            false,
            info
          );
        }
      }
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
  renderLoading("add-button-img", true);
  additionCardsByForm(ImgName, linkImg)
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
      renderLoading("add-button-img", false);
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
  renderLoading("add-button-img-avatar", true);
  patchAvatar(avatarInputValue)
    .then((info) => {
      profileAvatar.setAttribute("src", info.avatar);
      avatarForm.reset();
      closePopup(popupAvatar);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      renderLoading("add-button-img-avatar", false);
    });
});
profileForm.addEventListener("submit", function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  renderLoading("add-button-inf", true);
  patchUserInfo(popupInfoName, popupInfoAbout)
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
      renderLoading("add-button-inf", false);
    });
});
