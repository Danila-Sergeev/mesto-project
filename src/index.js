

import '../cards.js';
import '../pages/index.css';
import './components/card.js';
import './components/modal.js';
import './components/utilits.js';
import './components/validate.js';

const buttonClosePopup = document.querySelector('.popup__close-icon');
const formElement = document.querySelector('.popup__edit');
const formElementAvatar = document.querySelector('#popup-img-avatar');
const popupAvatarBtn = document.querySelector('#add-button-img-avatar');
const buttonPopupSave = document.querySelector('#add-button-inf');
const profileButtonAddImg = document.querySelector('#add-button-img');
const avatarClose = document.querySelector('#popup-avatar-close');
const profileButtonAdd = document.querySelector('.profile__add-button');
const buttonPlaceClose = document.querySelector('#popup-close-icon-place');
import {avatar, avatarEdit, popupAvatar, closeBtns, overlay,
  popupPlace, formSubmitHandler, formSubmitAvatar} from './components/modal.js';
import {popupImg} from './components/card.js';
import {openPopup, closePopup} from './components/utilits.js';

//нажате кнопки изменения аватара:
avatar.addEventListener('mouseover', () => {avatarEdit.classList.add('popup_opened'); avatar.classList.add('profile__avatar_opacity')});
avatar.addEventListener('mouseout', () => {avatarEdit.classList.remove('popup_opened');  avatar.classList.remove('profile__avatar_opacity')});
avatarEdit.addEventListener('mouseover', () => {avatarEdit.classList.add('popup_opened');  avatar.classList.add('profile__avatar_opacity')});
avatarEdit.addEventListener('mouseout', () => {avatarEdit.classList.remove('popup_opened'); avatar.classList.remove('profile__avatar_opacity')});

 //закрытие попап кликом на оверлей
 document.addEventListener('keydown', closeBtns);

 popupPlace.addEventListener('click', overlay);
 popup.addEventListener('click', overlay);
 popupImg.addEventListener('click', overlay);
 popupAvatar.addEventListener('click', overlay);

//открыть-закрыт попап

  avatar.addEventListener('click', () => openPopup(popupAvatar));
  avatarEdit.addEventListener('click', () => openPopup(popupAvatar));
  avatarClose.addEventListener('click', () =>  closePopup(popupAvatar));

  profileButtonAdd.addEventListener('click', () => openPopup(popupPlace));
  buttonPlaceClose.addEventListener('click', () => closePopup(popupPlace));
  buttonClosePopup.addEventListener('click', () =>  closePopup(popup));
  popupAvatarBtn.addEventListener('click', () => closePopup(popupAvatar));
  buttonPopupSave.addEventListener('click', () => closePopup(popup));

  profileButtonAddImg.addEventListener('click', () => closePopup(popupPlace));

//отправка формы

  formElementAvatar.addEventListener('submit', formSubmitAvatar);
  formElement.addEventListener('submit', formSubmitHandler);




