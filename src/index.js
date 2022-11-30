

import './cards.js';
import './pages/index.css';
import './components/card.js';
import './components/modal.js';
import './components/utilits.js';
import './components/validate.js';

const formElement = document.querySelector('.popup__edit');
const formElementAvatar = document.querySelector('#popup-img-avatar');
const buttonPopupSave = document.querySelector('#add-button-inf');
const SaveBtns = document.querySelectorAll('.popup__save');
const profileButtonAdd = document.querySelector('.profile__add-button');
const bottonEditProfile = document.querySelector('.profile__edit');
const profilePopup = document.querySelector('#popup');
const avatarEdit = document.querySelector('.profile__avatar_edit');
const popupPlace = document.querySelector('#popup-container-place');
const popupAvatar = document.querySelector('#popup-avatar');
const popups = document.querySelectorAll('.popup')

import {avatar, handleProfileFormSubmit, handleAvatarformSubmit, popupInfoName, popupInfoAbout, profileStatus, profileName} from './components/modal.js';
import {renderCard} from './components/card.js';
import {openPopup, closePopup} from './components/utilits.js';
import {initialCards} from './cards.js';

// Добавление 6-ти основных карточек:
initialCards.forEach(item => {
  renderCard(item.link, item.name);
});

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
    popup.addEventListener('submit', () => {
      closePopup(popup);
  })
})

bottonEditProfile.addEventListener('click', () => {
  openPopup(profilePopup);
  popupInfoName.setAttribute('value', profileName.textContent);
  popupInfoAbout.setAttribute('value', profileStatus.textContent);
  SaveBtns.forEach((btn) =>{
    btn.classList.add('popup__save_inactive');
    btn.disabled = true;
  })
});

avatarEdit.addEventListener('click', () => openPopup(popupAvatar));
avatar.addEventListener('click', () => openPopup(popupAvatar));
profileButtonAdd.addEventListener('click', () => openPopup(popupPlace));

//отправка формы
formElementAvatar.addEventListener('submit', handleAvatarformSubmit);
formElement.addEventListener('submit', handleProfileFormSubmit);

