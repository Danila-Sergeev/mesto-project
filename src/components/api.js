import {renderCard, renderSetCard} from './card.js';
import {closePopup} from './utilits.js';
import {cardsForm} from './modal.js';
const linkImg = document.querySelector('#input-src');
const ImgName = document.querySelector('#input-text-img');
const profileAvatar = document.querySelector('.profile__avatar');
const profileName = document.querySelector('.profile__name');
const popupAvatar = document.querySelector('#popup-avatar');
const popupPlace = document.querySelector('#popup-container-place');
const popupInfoName = document.querySelector('#input-name');
const popupInfoAbout = document.querySelector('#input-about');
const profileStatus = document.querySelector('.profile__status');
const avatarInputValue = document.querySelector('#input-src-avatar');
const popupProfile = document.querySelector('#popup');
const avatarForm = document.forms.editAvatar;

//Функция удаления карточки
function deleteCard(cardId){
   return fetch (`https://nomoreparties.co/v1/plus-cohort-17/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: 'c8ce4a71-bdd1-470d-8928-726e47ccdf35',
      'Content-Type': 'application/json'
    }
  })
}

//Функция удаления лайка на карточку
function deleteCardLike(cardLikeId){
   return fetch (`https://nomoreparties.co/v1/plus-cohort-17/cards/likes/${cardLikeId}`, {
    method: 'DELETE',
    headers: {
      authorization: 'c8ce4a71-bdd1-470d-8928-726e47ccdf35',
      'Content-Type': 'application/json'
    }
  })
}

//Функция добавления лайка на карточку
function addCardLike(cardLikeId, someData){
  return fetch(`https://nomoreparties.co/v1/plus-cohort-17/cards/likes/${cardLikeId}`, {
    method: 'PUT',
    headers: {
      authorization: 'c8ce4a71-bdd1-470d-8928-726e47ccdf35',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(someData)
  })
}

//функции отображения прогрузки:
function renderLoading(btnId, isLoading){
  if (isLoading){
    document.querySelector(`#${btnId}`).textContent = 'Сохранение...';
  }
  else{
    document.querySelector(`#${btnId}`).textContent = 'Сохранить';
  }
}
function renderLoadingForDeleteCard(btnId, isLoading){
  if (isLoading){
    document.querySelector(`#${btnId}`).textContent = 'Удаление...';
  }
  else{
    document.querySelector(`#${btnId}`).textContent = 'Да';
  }
}

// Добавление/удаление лайка:
function addAndRemoveCardLike(placeName, photoLink, cardLikeCounter, evt, cardId){
  Promise.all([
    fetch('https://nomoreparties.co/v1/plus-cohort-17/users/me ', {
      headers: {
        authorization: 'c8ce4a71-bdd1-470d-8928-726e47ccdf35',
        'Content-Type': 'application/json'
      },
    }),
    fetch('https://nomoreparties.co/v1/plus-cohort-17/cards', {
    headers: {
      authorization: 'c8ce4a71-bdd1-470d-8928-726e47ccdf35',
      'Content-Type' : 'application/json'
    }
    })
  ])
  .then(arr => Promise.all(arr.map(res => {
    if(!res.ok){
    return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
    })
    ))
  .then(([info, card]) => {
    for (let i = card.length -1; i >= 0; i--){
        if(cardId === card[i]._id && card[i].likes.length >= 0 && placeName === card[i].name && photoLink === card[i].link && !evt.target.classList.contains('card__like_status_on')){
          evt.target.classList.add('card__like_status_on');
          addCardLike(card[i]._id, info);
          cardLikeCounter.textContent = card[i].likes.length + 1;
        }
        else if(cardId === card[i]._id && card[i].likes.length >= 0 && placeName === card[i].name && photoLink === card[i].link && evt.target.classList.contains('card__like_status_on')){
          evt.target.classList.remove('card__like_status_on');
          deleteCardLike(card[i]._id);
          cardLikeCounter.textContent = card[i].likes.length - 1;
      }
    }
    })
    .catch((err) => {
      console.error(err);
    })
}

// Функция добавления карточки через форму:
function additionCardsByForm(){
  renderLoading('add-button-img', true)
  fetch('https://nomoreparties.co/v1/plus-cohort-17/cards', {
    method: 'POST',
    headers: {
      authorization: 'c8ce4a71-bdd1-470d-8928-726e47ccdf35',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: ImgName.value,
      link: linkImg.value,
    })
  })
  .then(res =>{
    if(!res.ok){
     return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  })
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
}

/* Функция добавлени обязательных карточек, функция смены информации о пользователе,
  функция удаления своих карточек: */
function renderingCards(){
  Promise.all([
    fetch('https://nomoreparties.co/v1/plus-cohort-17/users/me ', {
      headers: {
        authorization: 'c8ce4a71-bdd1-470d-8928-726e47ccdf35',
        'Content-Type': 'application/json'
      },
    }),
    fetch('https://nomoreparties.co/v1/plus-cohort-17/cards', {
    headers: {
      authorization: 'c8ce4a71-bdd1-470d-8928-726e47ccdf35',
      'Content-Type' : 'application/json'
    }
    })
  ])
  .then(arr => Promise.all(arr.map(res => {
    if(!res.ok){
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  })
  ))
  .then(([info, cards]) => {
    for (let i = cards.length -1; i >= 0; i--){
      if (cards[i].owner.name === info.name){;
        renderCard(cards[i].link, cards[i].name, cards[i].likes.length, cards[i]._id);
      }
      else{
        renderSetCard(cards[i].link, cards[i].name, cards[i].likes.length, cards[i]._id);
      }
    }
    profileName.textContent = info.name;
    profileStatus.textContent = info.about;
    profileAvatar.setAttribute('src', info.avatar);
  })
  .catch((err) => {
    console.error(err);
  });
}
renderingCards();

//Проверка на наличие лайка:
function cardLike(cardElement){
  Promise.all([
    fetch('https://nomoreparties.co/v1/plus-cohort-17/users/me ', {
      headers: {
        authorization: 'c8ce4a71-bdd1-470d-8928-726e47ccdf35',
        'Content-Type': 'application/json'
      },
    }),
    fetch('https://nomoreparties.co/v1/plus-cohort-17/cards', {
    headers: {
      authorization: 'c8ce4a71-bdd1-470d-8928-726e47ccdf35',
      'Content-Type' : 'application/json'
    }
    })
  ])
  .then(arr => Promise.all(arr.map(res => {
    if(!res.ok){
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
   })
   ))
  .then(([info, cards]) => {
    for (let i = cards.length -1; i >= 0; i--){
      if (JSON.stringify(cards[i].likes[0]) === JSON.stringify(info)){
        cardElement.querySelector('.card__like').classList.add('card__like_status_on');
      }
    }

  })
  .catch((err) => {
    console.error(err);
  })
}

  // Редактирование профиля через форму:
function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  renderLoading('add-button-inf', true);
  fetch('https://nomoreparties.co/v1/plus-cohort-17/users/me ', {
    method: 'PATCH',
    headers: {
      authorization: 'c8ce4a71-bdd1-470d-8928-726e47ccdf35',
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify({
      name: popupInfoName.value,
      about: popupInfoAbout.value
    })
  })
  .then(res =>{
    if(!res.ok){
     return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  })
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

//Редактирование аватара через форму
function handleAvatarformSubmit (evt) {
  evt.preventDefault();
  renderLoading('add-button-img-avatar', true)
  fetch('https://nomoreparties.co/v1/plus-cohort-17/users/me/avatar ', {
    method: 'PATCH',
    headers: {
      authorization: 'c8ce4a71-bdd1-470d-8928-726e47ccdf35',
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify({
      avatar: avatarInputValue.value
    })
  })
  .then(res =>{
    if(!res.ok){
     return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  })
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


function removeCard(placeName, photoLink, cardElement, cardId){
  renderLoadingForDeleteCard('confirm-delete-button', true);
  fetch('https://nomoreparties.co/v1/plus-cohort-17/cards', {
    headers: {
      authorization: 'c8ce4a71-bdd1-470d-8928-726e47ccdf35',
      'Content-Type': 'application/json'
    }
  })
  .then(res =>{
    if(!res.ok){
     return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  })
    .then((card) => {
    for (let i = card.length -1; i >= 0; i--){
      if (placeName === card[i].name && photoLink === card[i].link && cardId === card[i]._id ){
         deleteCard(card[i]._id);
         cardElement.remove();
      }
    }
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      renderLoadingForDeleteCard('confirm-delete-button', false)
    })
}




export {handleProfileFormSubmit,handleAvatarformSubmit, popupPlace, removeCard, addAndRemoveCardLike, cardLike, additionCardsByForm,
  profileAvatar, popupAvatar, popupProfile, popupInfoName,  popupInfoAbout, profileStatus, profileName, avatarForm}

