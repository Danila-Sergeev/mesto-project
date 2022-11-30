import { openPopup } from "./utilits";

const popupImg = document.querySelector('.popup_img');
const cardContainer = document.querySelector('.cards-grid');
const formCards = document.forms.editCards;
const popupImgName = document.querySelector('.popup_img_name');
const popupImgPhoto = document.querySelector('.popup_img_photo');

// функция создания (удаления) новой карточки и открытие изображения на весь экран:
function addCard(photoLink, placeName){
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardElementImg = cardElement.querySelector('.card__img');
  //передача значений с попапа:
  cardElementImg.setAttribute('src', photoLink);
  cardElement.querySelector('.card__name').textContent = placeName;
  cardElementImg.setAttribute('alt', placeName);

  //лайк:
  cardElement.querySelector('.card__like').addEventListener('click', evt => evt.target.classList.toggle('card__like_status_on'));

  //удаление карточки:
  cardElement.querySelector('.card__trash').addEventListener('click', () =>{
    cardElement.remove();
});

//открытие попапа с картинкой:
cardElementImg.addEventListener('click',(evt)=>{
  evt.preventDefault();
  openPopup(popupImg);
  popupImgName.textContent = placeName;
  popupImgPhoto.setAttribute('src', photoLink);
  popupImgPhoto.setAttribute('alt', placeName);
});

return (cardElement);
}

function renderCard(photoLink, placeName){
  cardContainer.prepend(addCard(photoLink, placeName));
}

// Добавление карточки через форму:
const linkImg = document.querySelector('#input-src');
const ImgName = document.querySelector('#input-text-img');
formCards.addEventListener('submit', (evt)=>{
  evt.preventDefault();
  renderCard(linkImg.value, ImgName.value);
  formCards.reset();
}
);

export{popupImg, addCard, cardContainer, renderCard};

