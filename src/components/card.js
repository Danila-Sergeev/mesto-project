const popupImg = document.querySelector('.popup_img');
const formElementImg = document.querySelector('#popup-img-cont');
const cardContainer = document.querySelector('.cards-grid');
const formCards = document.forms.editCards;
const popupImgName = document.querySelector('.popup_img_name');

// функция создания (удаления) новой карточки и открытие изображения на весь экран:
function addCard(photoLink, placeName){
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  //передача значений с попапа:
  cardElement.querySelector('.card__img').setAttribute('src', photoLink);
  cardElement.querySelector('.card__name').textContent = placeName;

  //лайк:
  cardElement.querySelector('.card__like').addEventListener('click', evt => evt.target.classList.toggle('card__like_status_on'));

  //удаление карточки:
  cardElement.querySelector('.card__trash').addEventListener('click', () =>{
    cardElement.remove();
});

//открытие попапа с картинкой:
cardElement.querySelector('.card__img').addEventListener('click',(evt)=>{
  evt.preventDefault();
  const popupImgPhoto = document.querySelector('.popup_img_photo');
  popupImg.classList.add('popup_opened');
  popupImgName.textContent = placeName;
  popupImgPhoto.setAttribute('src', photoLink);
});

return (cardElement);
}

function renderCard(photoLink, placeName){
  cardContainer.prepend(addCard(photoLink, placeName));
}



// Добавление карточки через форму:
const linkImg = document.querySelector('#input-src');
const ImgName = document.querySelector('#input-text-img');
formElementImg.addEventListener('submit', (evt)=>{
  evt.preventDefault();
  renderCard(linkImg.value, ImgName.value);
  formCards.reset();
}
);

export{popupImg, addCard, cardContainer, renderCard};

