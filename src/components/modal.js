import {additionCardsByForm, renderLoading} from './api.js';
import {renderCard} from './card.js';
const cardsForm = document.forms.editCards;
const popupPlace = document.querySelector('#popup-container-place');
const popupAvatar = document.querySelector('#popup-avatar');
const popupProfile = document.querySelector('#popup');
const avatarForm = document.forms.editAvatar;

function handleEscape(evt){
  if (evt.key === 'Escape'){
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

//функции открытия/закрытия попап
function openPopup(popup) {
  document.addEventListener('keydown', handleEscape);
  popup.classList.add('popup_opened');
}
 function closePopup(popup) {
  document.removeEventListener('keydown', handleEscape);
  popup.classList.remove('popup_opened');
}


//Добавление карточки через форму:
cardsForm.addEventListener('submit', (evt)=>{
  evt.preventDefault();
  renderLoading('add-button-img', true)
  additionCardsByForm()
  .then((card) => {
    renderCard(card.link, card.name, card.likes.length, card.likes, card._id, true);
    cardsForm.reset();
    closePopup(popupPlace);
    })
    .catch((err) => {
    console.error(err);
  })
    .finally(() => {
    renderLoading('add-button-img', false);
    })
});

export{cardsForm, avatarForm, popupPlace, popupAvatar, popupProfile, openPopup, closePopup};
