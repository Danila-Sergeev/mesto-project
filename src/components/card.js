import { closePopup, openPopup } from "./utilits.js";
import {removeCard, addAndRemoveCardLike, cardLike} from "./api.js";

const popupOpenImg = document.querySelector('.popup_img');
const cardContainer = document.querySelector('.cards-grid');
const popupOpenImgName = document.querySelector('.popup_img_name');
const popupOpenImgPhoto = document.querySelector('.popup_img_photo');
const popupConfirm =  document.querySelector('#popup-confirm');
const confirmDeleteForm = document.forms.confirmDelete;

// функция создания (удаления) новой карточки и открытие изображения на весь экран:
function addCard(photoLink, placeName, placeLikes, cardId){
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardElementImg = cardElement.querySelector('.card__img');
  const cardElementTrash = cardElement.querySelector('.card__trash');



  //передача значений с попапа:
  cardElementImg.setAttribute('src', photoLink);
  cardElement.querySelector('.card__name').textContent = placeName;
  cardElement.querySelector('.card__like-counter').textContent = placeLikes;
  cardElementImg.setAttribute('alt', placeName);

  //лайк:
  cardElement.querySelector('.card__like').addEventListener('mousedown', (evt) => {
    cardTemplate.querySelector('.card').id = cardId;
    addAndRemoveCardLike(placeName, photoLink, cardElement.querySelector('.card__like-counter'), evt, cardTemplate.querySelector('.card').id)
    })
  if (cardElement.querySelector('.card__like-counter').textContent > 0){
    cardLike(cardElement);
  }

  //удаление карточки с сервера:
  cardElementTrash.addEventListener('click', () => {
    openPopup(popupConfirm);
    cardTemplate.querySelector('.card').id = cardId;
    confirmDeleteForm.addEventListener('submit', () =>{
        removeCard(placeName, photoLink, cardElement,  cardTemplate.querySelector('.card').id);
        closePopup(popupConfirm);
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

//Загрузка уже созданной карточки
function addSetCard(photoLink, placeName, placeLikes,cardId){
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardElementImg = cardElement.querySelector('.card__img');

  //передача значений с попапа:
  cardElementImg.setAttribute('src', photoLink);
  cardElement.querySelector('.card__name').textContent = placeName;
  cardElement.querySelector('.card__like-counter').textContent = placeLikes;
  cardElementImg.setAttribute('alt', placeName);

  //лайк:
  cardElement.querySelector('.card__like').addEventListener('mousedown', (evt) => {
    cardTemplate.querySelector('.card').id = cardId;
    addAndRemoveCardLike(placeName, photoLink, cardElement.querySelector('.card__like-counter'), evt, cardTemplate.querySelector('.card').id)
  })

  if (cardElement.querySelector('.card__like-counter').textContent > 0){
    cardLike(cardElement);
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
function renderCard(photoLink, placeName, placeLikes, cardId){
  cardContainer.prepend(addCard(photoLink, placeName, placeLikes, cardId));
}
function renderSetCard(photoLink, placeName, placeLikes, cardId){
  cardContainer.prepend(addSetCard(photoLink, placeName, placeLikes, cardId));
}



export{renderCard,renderSetCard, popupConfirm};

