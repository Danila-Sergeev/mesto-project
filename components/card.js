const popupImgName = document.querySelector('.popup_img_name');
const popupImgClose = document.querySelector('#popup-img-close');
const popupImg = document.querySelector('.popup_img');
const formElementImg = document.querySelector('#popup-img-cont');
const cardContainer = document.querySelector('.cards-grid');
const formCards = document.forms.editCards;
import {closePopup, openPopup, renderCard} from './utilits.js';


// функция создания (удаления) новой карточки и открытие изображения на весь экран:
function addCard(photoLink, placeName){
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  //передача значений с попапа:
  cardElement.querySelector('.card__img').setAttribute('src', photoLink);
  cardElement.querySelector('.card__name').textContent = placeName;

  //открытие попапа с картинкой:
  cardElement.querySelector('.card__img').addEventListener('click',(evt)=>{
    evt.preventDefault();
    const popupImgPhoto = document.querySelector('.popup_img_photo');
    openPopup(popupImg);
    popupImgName.textContent = placeName;
    popupImgPhoto.setAttribute('src', photoLink);
  });

  //лайк:
  cardElement.querySelector('.card__like').addEventListener('click', evt => evt.target.classList.toggle('card__like_status_on'));

  //удаление карточки:
  cardElement.querySelector('.card__trash').addEventListener('click', () =>{
    cardElement.remove();
});

return (cardElement);
}
popupImgClose.addEventListener('click',() => closePopup(popupImg));


// Добавление 6-ти основных карточек:
initialCards.forEach(item => {
  renderCard(item.link, item.name);
});

// Добавление карточки через форму:
const linkImg = document.querySelector('#input-src');
const ImgName = document.querySelector('#input-text-img');
formElementImg.addEventListener('submit', (evt)=>{
  evt.preventDefault();
  renderCard(linkImg.value, ImgName.value);
  formCards.reset();
}
);

export{popupImg, addCard, cardContainer};

