import {renderCard} from './card.js';

for (let i = 0; i <= 5; i++){
  fetch('https://nomoreparties.co/v1/plus-cohort-17/cards', {
    headers: {
      authorization: 'c8ce4a71-bdd1-470d-8928-726e47ccdf35',
      'Content-Type' : 'application/json'
    }
  })
    .then(res =>{ return res.json()})
    .then((result) => {
      // Добавление 6-ти основных карточек:
      renderCard(result[i].link, result[i].name);
    });
  }
