import "./index.css";
import "../components/Card.js";
import "../components/Modal.js";
import "../components/utils/utilits.js";
import "../components/Validate.js";
import "../components/Api.js";
import "../components/Section.js";
import "../components/utils/constants.js";

import { Api } from "../components/Api.js";
import {
  renderLoading,
  PopupWithImage,
  PopupWithForm,
} from "../components/Modal.js";
import {
  settings,
  apiConfig,
  buttonOpenCardPopup,
  buttonOpenEditPopup,
  avatarEditButton,
  popupInfoName,
  popupInfoAbout,
  avatarInputValue,
  linkImg,
  ImgName,
  profileAvatar,
} from "../components/utils/constants.js";
import { Validator } from "../components/Validate.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo";

const api = new Api(apiConfig);
let sec = null;
const userInfo = new UserInfo(
  ".profile__name",
  ".profile__status",
  api,
  (state) => {
    renderLoading("add-button-inf", state, "Сохранить");
  }
);
let info = userInfo.getUserInfo();

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
    .additionCardsByForm(ImgName.value, linkImg.value)
    .then((card) => {
      const newCard = new Card(
        card,
        true,
        info,
        (url, name) => {
          popupImage.open(url, name);
        },
        "#card-template",
        api
      );
      sec.setItem(newCard.generate());
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      renderLoading("add-button-img", false, "Создать");
    });
});

const popupProfile = new PopupWithForm("#popup", (evt) => {
  evt.preventDefault();
  renderLoading("add-button-inf", true, "Сохранить");
  userInfo.setUserInfo(popupInfoName, popupInfoAbout);
});

const popupImage = new PopupWithImage(".popup_img");

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
  Promise.all([api.getUserInfo(), api.getCardsInfo()])
    .then(([info, cards]) => {
      sec = new Section(
        cards.reverse(),
        (item) => {
          return new Card(
            item,
            item.owner._id === info._id,
            info,
            (url, name) => {
              popupImage.open(url, name);
            },
            "#card-template",
            api
          );
        },
        ".cards-grid"
      );

      sec.renderItems();
      profileAvatar.setAttribute("src", info.avatar);
    })
    .catch((err) => {
      console.error(err);
    });
}
renderCards();

buttonOpenEditPopup.addEventListener("click", () => {
  popupProfile.open(
    ["#input-name", "#input-about"],
    [userInfo.getProfileName(), userInfo.getProfileStatus()]
  );
});
avatarEditButton.addEventListener("click", () => popupAvatar.open([], []));
profileAvatar.addEventListener("click", () => popupAvatar.open([], []));
buttonOpenCardPopup.addEventListener("click", () => popupPlace.open([], []));
