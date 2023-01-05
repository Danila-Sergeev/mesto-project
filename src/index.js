

import './cards.js';
import './pages/index.css';
import './components/card.js';
import './components/modal.js';
import './components/utilits.js';
import './components/validate.js';
import './components/api.js'

const profileForm = document.forms.editProfile;
const buttonOpenCardPopup = document.querySelector('.profile__add-button');
const buttonOpenEditPopup = document.querySelector('.profile__edit');
const avatarEditButton = document.querySelector('.profile__avatar_edit');
const popups = document.querySelectorAll('.popup');


import {popupInfoName, popupInfoAbout, renderLoading, patchUserInfo, patchAvatar} from './components/api.js';
import {popupPlace, popupAvatar, popupProfile, avatarForm, openPopup, closePopup} from './components/modal.js';
import {profileName, profileStatus, profileAvatar} from './components/card.js';

////открыть закрыть попап:
popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close-icon')) {
          closePopup(popup);
        }
    })
})

buttonOpenEditPopup.addEventListener('click', () => {
  openPopup(popupProfile);
  popupInfoName.value = profileName.textContent;
  popupInfoAbout.value = profileStatus.textContent;
});

avatarEditButton.addEventListener('click', () => openPopup(popupAvatar));
profileAvatar.addEventListener('click', () => openPopup(popupAvatar));
buttonOpenCardPopup.addEventListener('click', () => openPopup(popupPlace));

//отправка формы:
avatarForm.addEventListener('submit', function handleAvatarformSubmit (evt) {
  evt.preventDefault();
  renderLoading('add-button-img-avatar', true)
  patchAvatar()
  .then((info) => {
  evt.preventDefault();
  profileAvatar.setAttribute('src', info.avatar);
  avatarForm.reset();
  closePopup(popupAvatar);
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    renderLoading('add-button-img-avatar', false);
  })
});
profileForm.addEventListener('submit', function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  renderLoading('add-button-inf', true);
  patchUserInfo()
  .then((info) => {
  profileName.textContent = info.name;
  profileStatus.textContent = info.about;
  profileAvatar.setAttribute('src', info.avatar);
  closePopup(popupProfile);
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    renderLoading('add-button-inf', false);
  })
});





