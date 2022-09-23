const popup = document.querySelector('#popup');
const popupEdit = document.querySelector('.popup__edit');
const popupImgCont = document.querySelector('#popup-img-cont');
const bottonEditProfile = document.querySelector('.profile__edit');
const buttonPlaceClose = document.querySelector('#popup-close-icon-place');
const popupPlace = document.querySelector('#popup-container-place')
const profileButtonAdd = document.querySelector('.profile__add-button');
const buttonClosePopup = document.querySelector('.popup__close-icon');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const popupInfoName = document.querySelector('#input-name');
const popupInfoAbout = document.querySelector('#input-about');
const buttonPopupSave = document.querySelector('#add-button-inf');
const cardContainer = document.querySelector('.cards-grid');
const formElementImg = document.querySelector('#popup-img-cont');
const profileButtonAddImg = document.querySelector('#add-button-img');
const formElement = document.querySelector('.popup__edit');
const popupImg = document.querySelector('.popup_img');
const popupImgClose = document.querySelector('#popup-img-close');
const popupImgName = document.querySelector('.popup_img_name');


// Открытие - закрытие попап:
function closePopup(popup, popupClass){
  popup.classList.remove(popupClass);
}
bottonEditProfile.addEventListener('click', () => {
  popup.classList.add('popup_opened') ;
  popupInfoName.setAttribute('value', profileName.textContent);
  popupInfoAbout.setAttribute('value', profileStatus.textContent);
});

buttonClosePopup.addEventListener('click', () => closePopup(popup,'popup_opened'));

profileButtonAdd.addEventListener('click', () =>  popupPlace.classList.add('popup_opened'));

buttonPlaceClose.addEventListener('click', () => closePopup(popupPlace,'popup_opened'));

// Редактирование профиля через форму:
function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = popupInfoName.value;
  profileStatus.textContent = popupInfoAbout.value;

}
formElement.addEventListener('submit', formSubmitHandler);
buttonPopupSave.addEventListener('click', () => closePopup(popup,'popup_opened'));

// функция создания (удаления) новой карточки и открытие изображения на весь экран:
function addCard(photoLink, placeName){
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__img').setAttribute('src', photoLink);
  cardElement.querySelector('.card__name').textContent = placeName;
  cardElement.querySelector('.card__click-img').addEventListener('click',(evt)=>{
    evt.preventDefault();
    const popupImgPhoto = document.querySelector('.popup_img_photo');

    popupImg.classList.add('popup_opened')
    popupImgName.textContent = placeName;
    popupImgPhoto.setAttribute('src', photoLink);

  });
  popupImgClose.addEventListener('click',() => closePopup(popupImg, 'popup_opened'));
  cardElement.querySelector('.card__like').addEventListener('click', evt => evt.target.classList.toggle('card__like_status_on'));
  cardElement.querySelectorAll('.card__trash').forEach( btn => {
    btn.addEventListener('click', () =>{
        const card = btn.closest('.card');
        card.remove();
    });
});
return (cardElement);
}
function renderCard(photoLink, placeName){
  cardContainer.prepend(addCard(photoLink, placeName));
}


// Добавление 6-ти основных карточек:
initialCards.forEach(item => {
  renderCard(item.link, item.name);
});

// Добавление карточки через форму:
formElementImg.addEventListener('submit', (evt)=>{
  evt.preventDefault();
  const linkImg = document.querySelector('#input-src');
  const ImgName = document.querySelector('#input-text-img');

  renderCard(linkImg.value, ImgName.value);
  linkImg.value = '';
  ImgName.value = '';
}
)
profileButtonAddImg.addEventListener('click', () => closePopup(popupPlace,'popup_opened'));




