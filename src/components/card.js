import { closePopup, openPopup } from "./utilits";

const popupOpenImg = document.querySelector('.popup_img');
const cardContainer = document.querySelector('.cards-grid');
const popupOpenImgName = document.querySelector('.popup_img_name');
const popupOpenImgPhoto = document.querySelector('.popup_img_photo');
const popupConfirm =  document.querySelector('#popup-confirm');
const confirmDeleteForm = document.forms.confirmDelete;

// функция создания (удаления) новой карточки и открытие изображения на весь экран:
function addCard(photoLink, placeName, placeLikes){
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
  cardElement.querySelector('.card__like').addEventListener('click', evt => evt.target.classList.toggle('card__like_status_on'));

  //удаление карточки:
  cardElementTrash.addEventListener('click', () => {
    openPopup(popupConfirm)
    confirmDeleteForm.addEventListener('submit', () =>{
      cardElement.remove()
      closePopup(popupConfirm);
    })
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
function addSetCard(photoLink, placeName, placeLikes){
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardElementImg = cardElement.querySelector('.card__img');

  //передача значений с попапа:
  cardElementImg.setAttribute('src', photoLink);
  cardElement.querySelector('.card__name').textContent = placeName;
  cardElement.querySelector('.card__like-counter').textContent = placeLikes;
  cardElementImg.setAttribute('alt', placeName);

  //лайк:
  cardElement.querySelector('.card__like').addEventListener('click', evt => evt.target.classList.toggle('card__like_status_on'));

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
function renderCard(photoLink, placeName, placeLikes){
  cardContainer.prepend(addCard(photoLink, placeName, placeLikes));
}
function renderSetCard(photoLink, placeName, placeLikes){
  cardContainer.prepend(addSetCard(photoLink, placeName, placeLikes));
}



export{renderCard,renderSetCard};

