import {renderCard, renderSetCard} from './card.js';
import {profileAvatar, profileName, profileStatus, popupProfile, popupInfoName, popupInfoAbout} from './modal.js'
import {closePopup} from './utilits.js';
const linkImg = document.querySelector('#input-src');
const ImgName = document.querySelector('#input-text-img');
const cardsForm = document.forms.editCards;
const popupPlace = document.querySelector('#popup-container-place');

function deleteCard(cardId){
   return fetch (`https://nomoreparties.co/v1/plus-cohort-17/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: 'c8ce4a71-bdd1-470d-8928-726e47ccdf35',
      'Content-Type': 'application/json'
    }
  })
}

function deleteCardLike(cardLikeId){
   return fetch (`https://nomoreparties.co/v1/plus-cohort-17/cards/likes/${cardLikeId}`, {
    method: 'DELETE',
    headers: {
      authorization: 'c8ce4a71-bdd1-470d-8928-726e47ccdf35',
      'Content-Type': 'application/json'
    }
  })
}

function addCardLike(cardLikeId,someData){
  return fetch(`https://nomoreparties.co/v1/plus-cohort-17/cards/likes/${cardLikeId}`, {
    method: 'PUT',
    headers: {
      authorization: 'c8ce4a71-bdd1-470d-8928-726e47ccdf35',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(someData)
  })
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
  .then(arr => Promise.all(arr.map(res => res.json())))
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
    });
}


// Добавление карточки через форму:
cardsForm.addEventListener('submit', (evt)=>{
  evt.preventDefault();
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
    .then(res => res.json())
    .then((card) => {
      console.log(card._id)
      renderCard(card.link, card.name, card.likes.length, card._id);
      cardsForm.reset();
     });
  closePopup(popupPlace);
});

/* Добавление обязательных карточек, функция смены информации о пользователе,
  функция удаления своих карточек: */
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
.then(arr => Promise.all(arr.map(res => res.json())))
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
});

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
  .then(arr => Promise.all(arr.map(res => res.json())))
  .then(([info, cards]) => {
    for (let i = cards.length -1; i >= 0; i--){
      if (JSON.stringify(cards[i].likes[0]) === JSON.stringify(info)){
        cardElement.querySelector('.card__like').classList.add('card__like_status_on');
      }
    }

  });
}

  // Редактирование профиля через форму:
function handleProfileFormSubmit (evt) {
  evt.preventDefault();
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
  .then(res =>{ return res.json()})
  .then((info) => {
  profileName.textContent = info.name;
  profileStatus.textContent = info.about;
  profileAvatar.setAttribute('src', info.avatar);
  });
  closePopup(popupProfile);
}


function removeCard(placeName, photoLink, cardElement, cardId){
  fetch('https://nomoreparties.co/v1/plus-cohort-17/cards', {
    headers: {
      authorization: 'c8ce4a71-bdd1-470d-8928-726e47ccdf35',
      'Content-Type': 'application/json'
    }
  })
    .then((res) =>  res.json())
    .then((card) => {
    for (let i = card.length -1; i >= 0; i--){
      if (placeName === card[i].name && photoLink === card[i].link && cardId === card[i]._id ){
         deleteCard(card[i]._id);
         cardElement.remove();
      }
    }
    });
}




export {handleProfileFormSubmit, popupPlace, removeCard, addAndRemoveCardLike, cardLike}

