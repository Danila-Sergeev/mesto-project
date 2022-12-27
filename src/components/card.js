import { closePopup, openPopup } from "./utilits.js";
import {addCardLike,renderLoadingForDeleteCard, deleteCardLike, getUserInfo, getCardsInfo, deleteCard} from "./api.js";

const popupOpenImg = document.querySelector('.popup_img');
const cardContainer = document.querySelector('.cards-grid');
const popupOpenImgName = document.querySelector('.popup_img_name');
const popupOpenImgPhoto = document.querySelector('.popup_img_photo');
const popupConfirm =  document.querySelector('#popup-confirm');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const profileAvatar = document.querySelector('.profile__avatar');
const cardTemplate = document.querySelector('#card-template').content;
const confirmDeleteForm = document.forms.confirmDelete;

// функция создания (удаления) новой карточки и открытие изображения на весь экран:
function addCard(photoLink, placeName, placeLikes, cardId){

  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardElementImg = cardElement.querySelector('.card__img');
  const cardElementTrash = cardElement.querySelector('.card__trash');



  //передача значений с попапа:
  cardElementImg.setAttribute('src', photoLink);
  cardElement.querySelector('.card__name').textContent = placeName;
  cardElement.querySelector('.card__like-counter').textContent = placeLikes;
  cardElementImg.setAttribute('alt', placeName);

// Добавление/удаление лайка:
  cardElement.querySelector('.card__like').addEventListener('click', (evt) => {
    Promise.all([getUserInfo(), getCardsInfo()])
    .then(([info, card]) => {
      for (let i = card.length - 1; i >= 0; i--){
          if(cardId === card[i]._id && card[i].likes.length >= 0 && placeName === card[i].name && photoLink === card[i].link && !evt.target.classList.contains('card__like_status_on')){
            evt.target.classList.add('card__like_status_on');
            addCardLike(card[i]._id, info);
            cardElement.querySelector('.card__like-counter').textContent = card[i].likes.length + 1;
          }
          else if(cardId === card[i]._id && card[i].likes.length >= 0 && placeName === card[i].name && photoLink === card[i].link && evt.target.classList.contains('card__like_status_on')){
            evt.target.classList.remove('card__like_status_on');
            deleteCardLike(card[i]._id);
            cardElement.querySelector('.card__like-counter').textContent = card[i].likes.length - 1;
        }
      }
      })
      .catch((err) => {
        console.error(err);
      })
  })
  //Проверка на наличие лайка:
  if (cardElement.querySelector('.card__like-counter').textContent > 0){
    Promise.all([getUserInfo(), getCardsInfo()])
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

  //удаление карточки с сервера:
  cardElementTrash.addEventListener('click', () => {
    openPopup(popupConfirm);

    confirmDeleteForm.addEventListener('submit', () =>{
      renderLoadingForDeleteCard('confirm-delete-button', true);
      getCardsInfo()
      .then((card) => {
        for (let i = card.length -1; i >= 0; i--){
          if (placeName === card[i].name && photoLink === card[i].link && cardId === card[i]._id ){
             deleteCard(card[i]._id);
             cardElement.remove();
             closePopup(popupConfirm);
          }
        }
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          renderLoadingForDeleteCard('confirm-delete-button', false)
        })

      });
  });

//открытие попапа с картинкой:
cardElementImg.addEventListener('click',(evt)=>{
  evt.preventDefault();
  openPopup(popupOpenImg);
  popupOpenImgName.textContent = placeName;
  popupOpenImgPhoto.setAttribute('src', photoLink);
  popupOpenImgPhoto.setAttribute('alt', placeName);
});

return (cardElement);
}
function renderCard(photoLink, placeName, placeLikes, cardId){
  cardContainer.prepend(addCard(photoLink, placeName, placeLikes, cardId));
}



//Загрузка уже созданной карточки
function addSetCard(photoLink, placeName, placeLikes,cardId){
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardElementImg = cardElement.querySelector('.card__img');

  //передача значений с попапа:
  cardElementImg.setAttribute('src', photoLink);
  cardElement.querySelector('.card__name').textContent = placeName;
  cardElement.querySelector('.card__like-counter').textContent = placeLikes;
  cardElementImg.setAttribute('alt', placeName);

  //лайк:
  cardElement.querySelector('.card__like').addEventListener('click', (evt) => {
    Promise.all([getUserInfo(), getCardsInfo()])
    .then(([info, card]) => {
      for (let i = card.length - 1; i >= 0; i--){
          if(cardId === card[i]._id && card[i].likes.length >= 0 && placeName === card[i].name && photoLink === card[i].link && !evt.target.classList.contains('card__like_status_on')){
            evt.target.classList.add('card__like_status_on');
            addCardLike(card[i]._id, info);
            cardElement.querySelector('.card__like-counter').textContent = card[i].likes.length + 1;
          }
          else if(cardId === card[i]._id && card[i].likes.length >= 0 && placeName === card[i].name && photoLink === card[i].link && evt.target.classList.contains('card__like_status_on')){
            evt.target.classList.remove('card__like_status_on');
            deleteCardLike(card[i]._id);
            cardElement.querySelector('.card__like-counter').textContent = card[i].likes.length - 1;
        }
      }
      })
      .catch((err) => {
        console.error(err);
      })
  })

  if (cardElement.querySelector('.card__like-counter').textContent > 0){
    Promise.all([getUserInfo(), getCardsInfo()])
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

  //открытие попапа с картинкой:
  cardElementImg.addEventListener('click',(evt)=>{
  evt.preventDefault();
  openPopup(popupOpenImg);
  popupOpenImgName.textContent = placeName;
  popupOpenImgPhoto.setAttribute('src', photoLink);
  popupOpenImgPhoto.setAttribute('alt', placeName);
});

cardElement.querySelector('.card__trash').remove();

return (cardElement);
}
function renderSetCard(photoLink, placeName, placeLikes, cardId){
  cardContainer.prepend(addSetCard(photoLink, placeName, placeLikes, cardId));
}

function renderCards(){
  Promise.all([getUserInfo(), getCardsInfo()])
    .then(([info, cards]) => {
      for (let i = cards.length -1; i >= 0; i--){
        if (cards[i].owner.name === info.name){
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
}
renderCards();

export{renderCard,renderSetCard, popupConfirm, profileName, profileStatus, profileAvatar};

