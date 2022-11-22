import {addCard, cardContainer} from './card.js';
function openPopup(popup) {
  popup.classList.add('popup_opened');
}
 function closePopup(popup) {
  popup.classList.remove('popup_opened');
}
function renderCard(photoLink, placeName){
  cardContainer.prepend(addCard(photoLink, placeName));
}

export{openPopup, closePopup, renderCard};

