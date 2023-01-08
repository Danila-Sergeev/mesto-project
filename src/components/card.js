import { closePopup, openPopup } from "./modal.js";
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
const closeConfirmPopup = document.querySelector('#popup-confirm-close');
const confirmDeleteForm = document.forms.confirmDelete;

// функция создания (удаления) новой карточки и открытие изображения на весь экран:
function addCard(photoLink, placeName, placeLikesLength, placeLike, cardId, ownCard, info){

  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardElementImg = cardElement.querySelector('.card__img');
  const cardElementTrash = cardElement.querySelector('.card__trash');



  //передача значений с попапа:
  cardElementImg.setAttribute('src', photoLink);
  cardElement.querySelector('.card__name').textContent = placeName;
  cardElement.querySelector('.card__like-counter').textContent = placeLikesLength;
  cardElementImg.setAttribute('alt', placeName);

// Добавление/удаление лайка:

  cardElement.querySelector('.card__like').addEventListener('mousedown', (evt) => {
    if (!evt.target.classList.contains('card__like_status_on') ) {
      console.log(cardElement.querySelector('.card__like-counter').textContent)
      cardElement.querySelector('.card__like-counter').textContent = Number(cardElement.querySelector('.card__like-counter').textContent) + 1;
      evt.target.classList.add('card__like_status_on');
      addCardLike(cardId, info);
    }

    else if (evt.target.classList.contains('card__like_status_on') ) {
      console.log(cardElement.querySelector('.card__like-counter').textContent)
      cardElement.querySelector('.card__like-counter').textContent = Number(cardElement.querySelector('.card__like-counter').textContent) - 1;
      evt.target.classList.remove('card__like_status_on');
      deleteCardLike(cardId, info);

    }

    })
  //Проверка на наличие лайка:
  if (cardElement.querySelector('.card__like-counter').textContent > 0){
        for (let j = 0; j <= JSON.stringify(placeLikesLength); j++)
        if (JSON.stringify(placeLike[j]) === JSON.stringify(info)){
          cardElement.querySelector('.card__like').classList.add('card__like_status_on');
        }
      }


  //удаление карточки с сервера:
  function deletingCard(){
    if (ownCard){
      cardElementTrash.addEventListener('click', () => {
        openPopup(popupConfirm);
        confirmDeleteForm.addEventListener('submit', (evt) =>{
          evt.preventDefault();
          renderLoadingForDeleteCard('confirm-delete-button', true);
          deleteCard(cardId);
          cardElement.remove();
        })
      })
    }
    else{
    cardElement.querySelector('.card__trash').remove();
   }
  }
deletingCard()

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
function renderCard(photoLink, placeName, placeLikesLength, placeLike, cardId, ownCard, info){
  cardContainer.prepend(addCard(photoLink, placeName, placeLikesLength, placeLike, cardId, ownCard, info));
}


function renderCards(){
  Promise.all([getUserInfo(), getCardsInfo()])
    .then(([info, cards]) => {
      for (let i = cards.length -1; i >= 0; i--){
        if (cards[i].owner.name === info.name){
          renderCard(cards[i].link, cards[i].name, cards[i].likes.length, cards[i].likes, cards[i]._id, true, info);
        }
        else{
          renderCard(cards[i].link, cards[i].name, cards[i].likes.length, cards[i].likes, cards[i]._id, false, info);
        }
      }
      profileName.textContent = info.name;
      profileStatus.textContent = info.about;
      profileAvatar.setAttribute('src', info.avatar);
  });
}
renderCards();

export{renderCard, popupConfirm, profileName, profileStatus, profileAvatar};

