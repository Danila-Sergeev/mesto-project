//Валидация форм
const settings = {
  formSelector: ".popup__edit",
  inputSelector: ".popup__info",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_inactive",
  inputErrorClass: "popup__edit_type_error",
  errorClass: "popup__error-massage_active",
};

const apiConfig = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-17",
  headers: {
    authorization: "c8ce4a71-bdd1-470d-8928-726e47ccdf35",
    "Content-Type": "application/json",
  },
};

const buttonOpenCardPopup = document.querySelector(".profile__add-button");
const buttonOpenEditPopup = document.querySelector(".profile__edit");
const avatarEditButton = document.querySelector(".profile__avatar_edit");
const popupInfoName = document.querySelector("#input-name");
const popupInfoAbout = document.querySelector("#input-about");
const profileAvatar = document.querySelector(".profile__avatar");

export {
  settings,
  apiConfig,
  buttonOpenCardPopup,
  buttonOpenEditPopup,
  avatarEditButton,
  popupInfoName,
  popupInfoAbout,
  profileAvatar
};
