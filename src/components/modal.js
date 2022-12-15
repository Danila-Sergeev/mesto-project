import {handleProfileFormSubmit, handleAvatarformSubmit, additionCardsByForm} from './api.js';
const cardsForm = document.forms.editCards;

//Добавление карточки через форму:
cardsForm.addEventListener('submit', (evt)=>{
  evt.preventDefault();
  additionCardsByForm();
});
handleProfileFormSubmit;
handleAvatarformSubmit;

export{handleProfileFormSubmit, handleAvatarformSubmit, cardsForm};
