let popup = document.querySelector('#popup');
let popupCont = document.querySelector('.popup__edit');
let popupImgCont = document.querySelector('#popup-img-cont');
let editButton = document.querySelector('.profile__edit');
let closeButtonPlace = document.querySelector('#popup-close-icon-plce');
let popupPlace = document.querySelector('#popup-container-place')
let AddButton = document.querySelector('.profile__add-button');
let closeButton = document.querySelector('#popup-close-icon');
let profileName = document.querySelector('.profile__name');
let profileStatus = document.querySelector('.profile__status');
let popupInfoName = document.querySelector('#input-name');
let popupInfoAbout = document.querySelector('#input-about');
let SaveButton = document.querySelector('#add-button-inf');
let cardConteiner = document.querySelector('.cards-grid');
let AddButtonImg = document.querySelector('#add-button-img');

// Открытие - закрытие попап:
editButton.addEventListener('click', function popupOpened(){
  popup.classList.add('popup_opened');
  popupCont.classList.add('popup_open-cont');
});

closeButton.addEventListener('click', function popupClosed(){
  popup.classList.remove('popup_opened');
  popupCont.classList.remove('popup_open-cont');
});

AddButton.addEventListener('click', function popupPlaceOpened(){
  popupPlace.classList.add('popup_opened');
  popupImgCont.classList.add('popup_open-cont');
});

closeButtonPlace.addEventListener('click', function popupPlaceClosed(){
  popupPlace.classList.remove('popup_opened');
  popupImgCont.classList.remove('popup_open-cont');
});

// Редактирование профиля через форму:
popupInfoName.setAttribute('value', profileName.textContent);
popupInfoAbout.setAttribute('value', profileStatus.textContent);
function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = popupInfoName.value;
  profileStatus.textContent = popupInfoAbout.value;
}
SaveButton.addEventListener('submit', formSubmitHandler);


let popupImg = document.querySelector('.popup-img')
// функция создания новой карточки и открытие изображения на весь экран:
function addCard(PhotoLink, placeName){
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('#card-img').setAttribute('src', PhotoLink);
  cardElement.querySelector('#card-name').textContent = placeName;
  cardElement.querySelector('#buttonImgCard').addEventListener('click', function popupImgOpening(){
    let popupImgName = document.querySelector('.popup-img__name');
    let popupImgPhoto = document.querySelector('.popup-img__photo');
    let popupImgClose = document.querySelector('#poppup-img-close');

    popupImg.classList.add('popup-img_opened');
    popupImgClose.addEventListener('click',function(){
      popupImg.classList.remove('popup-img_opened');
    })
    popupImgName.textContent = placeName;
    popupImgPhoto.setAttribute('src', PhotoLink);
  });
  cardElement.querySelector('#like').addEventListener('click', function(evt){
    evt.target.classList.toggle('card__like_status_on');

  });
  cardConteiner.prepend(cardElement);
}

// Добавление 6-ти основных карточек:
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
initialCards.forEach(function(item){
  addCard(item.link, item.name);
})

// Добавление карточки через форму:
AddButtonImg.addEventListener('submit', function(){
  const linkImg = document.querySelector('#input-src');
  const ImgName = document.querySelector('#input-text-img');

  addCard(linkImg.value, ImgName.value);
}
)

// Удаление карточки:
const removeButton = document.querySelectorAll('#remove-button');
removeButton.forEach(function (btn) {
    btn.addEventListener('click', function(){
        const card = btn.closest('.card');
        card.parentNode.removeChild(card);
    });
});




