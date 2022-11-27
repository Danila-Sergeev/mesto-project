

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
const bottonEditProfile = document.querySelector('.profile__edit');
const popup = document.querySelector('#popup');
const avatarEdit = document.querySelector('.profile__avatar_edit');
const popupPlace = document.querySelector('#popup-container-place');
const popupAvatar = document.querySelector('#popup-avatar');
const popupImgClose = document.querySelector('#popup-img-close');

import {avatar, formSubmitHandler, formSubmitAvatar, popupInfoName, popupInfoAbout, profileStatus, profileName} from './components/modal.js';
import {popupImg, renderCard} from './components/card.js';
import {openPopup, closePopup} from './components/utilits.js';
import {initialCards} from '../cards.js';
//нажате кнопки изменения аватара:
avatar.addEventListener('mouseover', () => {avatarEdit.classList.add('popup_opened'); avatar.classList.add('profile__avatar_opacity')});
avatar.addEventListener('mouseout', () => {avatarEdit.classList.remove('popup_opened');  avatar.classList.remove('profile__avatar_opacity')});
avatarEdit.addEventListener('mouseover', () => {avatarEdit.classList.add('popup_opened');  avatar.classList.add('profile__avatar_opacity')});
avatarEdit.addEventListener('mouseout', () => {avatarEdit.classList.remove('popup_opened'); avatar.classList.remove('profile__avatar_opacity')});

// Добавление 6-ти основных карточек:
initialCards.forEach(item => {
  renderCard(item.link, item.name);
});

// Открытие - закрытие попап:
bottonEditProfile.addEventListener('click', () => {
  openPopup(popup);
  popupInfoName.setAttribute('value', profileName.textContent);
  popupInfoAbout.setAttribute('value', profileStatus.textContent);
  buttonPopupSave.disabled = true;
});

function closeBtns(evt){
  if (evt.key === 'Escape'){
    closePopup(popup);
    closePopup(popupPlace);
    closePopup(popupImg);
    closePopup(popupAvatar);
  }
}
function overlay(evt){
  if (evt.target == this){
    closePopup(popup);
    closePopup(popupPlace);
    closePopup(popupImg);
    closePopup(popupAvatar);
  }
}

//закрытие попап кликом на оверлей
document.addEventListener('keydown', closeBtns);

popupPlace.addEventListener('click', overlay);
popup.addEventListener('click', overlay);
popupImg.addEventListener('click', overlay);
popupAvatar.addEventListener('click', overlay);

//открыть-закрыт попап
avatar.addEventListener('click', () =>() => {
  openPopup(popupAvatar)
  popupAvatarBtn.disabled = true;
});
avatarEdit.addEventListener('click', () => {
  openPopup(popupAvatar)
  popupAvatarBtn.disabled = true;
});
avatarClose.addEventListener('click', () => {
  closePopup(popupAvatar)
});

profileButtonAdd.addEventListener('click', () => {
  openPopup(popupPlace);
  profileButtonAddImg.disabled = true;
});
buttonPlaceClose.addEventListener('click', () => closePopup(popupPlace));
buttonClosePopup.addEventListener('click', () => closePopup(popup));
popupAvatarBtn.addEventListener('click', () => {
  closePopup(popupAvatar)
  popupAvatarBtn.classList.add('popup__save_inactive');
});
buttonPopupSave.addEventListener('click', () =>{
  closePopup(popup);
  buttonPopupSave.classList.add('popup__save_inactive');
});
profileButtonAddImg.addEventListener('click', () =>{
  closePopup(popupPlace);
  profileButtonAddImg.classList.add('popup__save_inactive');
});

//отправка формы
formElementAvatar.addEventListener('submit', formSubmitAvatar);
formElement.addEventListener('submit', formSubmitHandler);


popupImgClose.addEventListener('click',() => closePopup(popupImg));




