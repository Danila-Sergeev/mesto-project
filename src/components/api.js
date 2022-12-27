const linkImg = document.querySelector('#input-src');
const ImgName = document.querySelector('#input-text-img');
const popupInfoName = document.querySelector('#input-name');
const popupInfoAbout = document.querySelector('#input-about');
const avatarInputValue = document.querySelector('#input-src-avatar');

function getUserInfo(){
  return fetch ('https://nomoreparties.co/v1/plus-cohort-17/users/me ', {
   headers: apiConfig.headers
 })
 .then(res => validation(res))
}
function getCardsInfo(){
  return fetch('https://nomoreparties.co/v1/plus-cohort-17/cards', {
    headers: apiConfig.headers
  })
  .then(res => validation(res))
}

function patchUserInfo(){
  return fetch('https://nomoreparties.co/v1/plus-cohort-17/users/me ', {
    method: 'PATCH',
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: popupInfoName.value,
      about: popupInfoAbout.value
    })
  })
  .then(res => validation(res))
}

function patchAvatar(){
  return fetch('https://nomoreparties.co/v1/plus-cohort-17/users/me/avatar ', {
    method: 'PATCH',
    headers: {
      authorization: 'c8ce4a71-bdd1-470d-8928-726e47ccdf35',
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify({
      avatar: avatarInputValue.value
    })
  })
  .then(res => validation(res))
}

const apiConfig = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-17',
  headers: {
    authorization: 'c8ce4a71-bdd1-470d-8928-726e47ccdf35',
    'Content-Type': 'application/json'
  }
}

function validation(res){
  if(!res.ok){
    return Promise.reject(`Ошибка: ${res.status}`);
    }
  return res.json();
}
//Функция удаления карточки
function deleteCard(cardId){
   return fetch (`https://nomoreparties.co/v1/plus-cohort-17/cards/${cardId}`, {
    method: 'DELETE',
    headers: apiConfig.headers
  })
  .then((res) => validation(res))
}

//Функция удаления лайка на карточку
function deleteCardLike(cardLikeId){
   return fetch (`https://nomoreparties.co/v1/plus-cohort-17/cards/likes/${cardLikeId}`, {
    method: 'DELETE',
    headers: apiConfig.headers
  })
}

//Функция добавления лайка на карточку
function addCardLike(cardLikeId, someData){
  return fetch(`https://nomoreparties.co/v1/plus-cohort-17/cards/likes/${cardLikeId}`, {
    method: 'PUT',
    headers: apiConfig.headers,
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

// Функция добавления карточки через форму:
function additionCardsByForm(){
  renderLoading('add-button-img', true)
    return fetch ('https://nomoreparties.co/v1/plus-cohort-17/cards', {
    method: 'POST',
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: ImgName.value,
      link: linkImg.value,
    })
  })
  .then(res => validation(res))
}






export {additionCardsByForm, addCardLike, deleteCardLike ,getUserInfo, getCardsInfo, renderLoading,
   renderLoadingForDeleteCard, deleteCard, patchUserInfo, patchAvatar, popupInfoName, popupInfoAbout}

