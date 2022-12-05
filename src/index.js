

import './cards.js';
import './pages/index.css';
import './components/card.js';
import './components/modal.js';
import './components/utilits.js';
import './components/validate.js';
import './components/server.js'

const profileForm = document.forms.editProfile;
const buttonOpenCardPopup = document.querySelector('.profile__add-button');
const buttonOpenEditPopup = document.querySelector('.profile__edit');
const avatarEditButton = document.querySelector('.profile__avatar_edit');
const popups = document.querySelectorAll('.popup')

import {profileAvatar, handleAvatarformSubmit, popupAvatar, popupProfile, popupInfoName, popupInfoAbout, profileStatus, profileName, avatarForm} from './components/modal.js';
import {handleProfileFormSubmit, popupPlace} from './components/server.js'
import {openPopup, closePopup} from './components/utilits.js';


////открыть закрыть попап

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close-icon')) {
          closePopup(popup)
        }
    })
})

buttonOpenEditPopup.addEventListener('click', () => {
  openPopup(popupProfile);
  popupInfoName.setAttribute('value', profileName.textContent);
  popupInfoAbout.setAttribute('value', profileStatus.textContent);
});

avatarEditButton.addEventListener('click', () => openPopup(popupAvatar));
profileAvatar.addEventListener('click', () => openPopup(popupAvatar));
buttonOpenCardPopup.addEventListener('click', () => openPopup(popupPlace));

//отправка формы
avatarForm.addEventListener('submit', handleAvatarformSubmit);
profileForm.addEventListener('submit', handleProfileFormSubmit);





