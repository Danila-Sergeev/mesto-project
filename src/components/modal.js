import {additionCardsByForm ,patchUserInfo, patchAvatar, renderLoading} from './api.js';
import {closePopup} from './utilits.js';
import {profileName, profileStatus, profileAvatar, renderCard} from './card.js';
const cardsForm = document.forms.editCards;
const popupPlace = document.querySelector('#popup-container-place');
const popupAvatar = document.querySelector('#popup-avatar');
const popupProfile = document.querySelector('#popup');
const avatarForm = document.forms.editAvatar;

//Добавление карточки через форму:
cardsForm.addEventListener('submit', (evt)=>{
  evt.preventDefault();
  renderLoading('add-button-img', true)
  additionCardsByForm()
  .then((card) => {
    renderCard(card.link, card.name, card.likes.length, card._id);
    cardsForm.reset();
    })
    .catch((err) => {
    console.error(err);
  })
    .finally(() => {
    renderLoading('add-button-img', false);
    })
  closePopup(popupPlace);
});
  // Редактирование аватара через форму:
function handleAvatarformSubmit (evt) {
  evt.preventDefault();
  renderLoading('add-button-img-avatar', true)
  patchAvatar()
  .then((info) => {
  evt.preventDefault();
  profileAvatar.setAttribute('src', info.avatar);
  avatarForm.reset();
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    renderLoading('add-button-img-avatar', false);
  })
  closePopup(popupAvatar);
}
 // Редактирование профиля через форму:
function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  renderLoading('add-button-inf', true);
  patchUserInfo()
  .then((info) => {
  profileName.textContent = info.name;
  profileStatus.textContent = info.about;
  profileAvatar.setAttribute('src', info.avatar);
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    renderLoading('add-button-inf', false);
  })
  closePopup(popupProfile);
}


export{cardsForm, avatarForm, handleProfileFormSubmit, handleAvatarformSubmit, popupPlace, popupAvatar, popupProfile};
