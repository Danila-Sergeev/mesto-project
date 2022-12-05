import {closePopup} from './utilits.js';
const popupInfoName = document.querySelector('#input-name');
const popupInfoAbout = document.querySelector('#input-about');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const profileAvatar = document.querySelector('.profile__avatar');
const avatarInputValue = document.querySelector('#input-src-avatar');
const popupAvatar = document.querySelector('#popup-avatar');
const popupProfile = document.querySelector('#popup');
const avatarForm = document.forms.editAvatar;
// Редактирование профиля через форму:

function handleAvatarformSubmit (evt) {
  evt.preventDefault();
  profileAvatar.setAttribute('src', avatarInputValue.value);
  avatarForm.reset();
  closePopup(popupAvatar);
}


export{profileAvatar,popupAvatar, popupProfile,  handleAvatarformSubmit, popupInfoAbout, popupInfoName, profileName ,profileStatus, avatarForm};
