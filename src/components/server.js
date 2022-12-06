import {renderCard, renderSetCard} from './card.js';
import {profileAvatar, profileName, profileStatus, popupProfile, popupInfoName, popupInfoAbout} from './modal.js'
import {closePopup} from './utilits.js';
const linkImg = document.querySelector('#input-src');
const ImgName = document.querySelector('#input-text-img');
const cardsForm = document.forms.editCards;
const popupPlace = document.querySelector('#popup-container-place');


// Добавление карточки через форму:
cardsForm.addEventListener('submit', (evt)=>{
  evt.preventDefault();
  fetch('https://nomoreparties.co/v1/plus-cohort-17/cards', {
    method: 'POST',
    headers: {
      authorization: 'c8ce4a71-bdd1-470d-8928-726e47ccdf35',
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      name: ImgName.value,
      link: linkImg.value,
    })
  })
    .then(res => res.json())
    .then((card) => {
      renderCard(card.link, card.name, card.likes.length);
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
  for (let i = cards.length -1; i > 0; i--){
    if (cards[i].owner.name === info.name){
      renderCard(cards[i].link, cards[i].name, cards[i].likes.length);
    }
    else{
      renderSetCard(cards[i].link, cards[i].name, cards[i].likes.length);
    }
  }
  profileName.textContent = info.name;
  profileStatus.textContent = info.about;
  profileAvatar.setAttribute('src', info.avatar);
});

  // Редактирование профиля через форму:
function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  fetch('https://nomoreparties.co/v1/plus-cohort-17/users/me ', {
    method: 'PATCH',
    headers: {
      authorization: 'c8ce4a71-bdd1-470d-8928-726e47ccdf35',
      'Content-Type': 'application/json'
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



export {handleProfileFormSubmit, popupPlace}

