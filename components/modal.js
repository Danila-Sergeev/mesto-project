import {openPopup, closePopup} from './utilits.js';
import {popupImg} from './card.js';
const bottonEditProfile = document.querySelector('.profile__edit');
const popupInfoName = document.querySelector('#input-name');
const popupInfoAbout = document.querySelector('#input-about');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const popupPlace = document.querySelector('#popup-container-place');
const popupAvatar = document.querySelector('#popup-avatar');
const popup = document.querySelector('#popup');
const avatar = document.querySelector('.profile__avatar');
const avatarValue = document.querySelector('#input-src-avatar');
const avatarEdit = document.querySelector('.profile__avatar_edit');
const formAvatar = document.forms.editAvatar;

 // Открытие - закрытие попап:

bottonEditProfile.addEventListener('click', () => {
  openPopup(popup);
  popupInfoName.setAttribute('value', profileName.textContent);
  popupInfoAbout.setAttribute('value', profileStatus.textContent);
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

// Редактирование профиля через форму:

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = popupInfoName.value;
  profileStatus.textContent = popupInfoAbout.value;
}
function formSubmitAvatar (evt) {
  evt.preventDefault();
  avatar.setAttribute('src', avatarValue.value);
  formAvatar.reset();
}


export{avatar, avatarEdit, popupAvatar, closeBtns, overlay, popupPlace, formSubmitHandler, formSubmitAvatar}
