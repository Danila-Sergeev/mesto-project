const popup = document.querySelector('#popup');
const popupCont = document.querySelector('.popup__edit');
const popupImgCont = document.querySelector('#popup-img-cont');
const editButton = document.querySelector('.profile__edit');
const closeButtonPlace = document.querySelector('#popup-close-icon-plce');
const popupPlace = document.querySelector('#popup-container-place')
const AddButton = document.querySelector('.profile__add-button');
const closeButton = document.querySelector('#popup-close-icon');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const popupInfoName = document.querySelector('#input-name');
const popupInfoAbout = document.querySelector('#input-about');
const SaveButton = document.querySelector('#add-button-inf');
const cardConteiner = document.querySelector('.cards-grid');
const AddButtonImg = document.querySelector('#add-button-img');

// Открытие - закрытие попап:
function openPopup(popup, popupClass, popupCont, popupContClass){
  popup.classList.add(popupClass);
  popupCont.classList.add(popupContClass);
}
function closePopup(popup, popupClass, popupCont, popupContClass){
  popup.classList.remove(popupClass);
  popupCont.classList.remove(popupContClass);
}
editButton.addEventListener('click', () => openPopup(popup,'popup_opened',popupCont,'popup_open-cont'));

closeButton.addEventListener('click', () => closePopup(popup,'popup_opened',popupCont,'popup_open-cont'));

AddButton.addEventListener('click', () => openPopup(popupPlace,'popup_opened',popupImgCont,'popup_open-cont'));

closeButtonPlace.addEventListener('click', () => closePopup(popupPlace,'popup_opened',popupImgCont,'popup_open-cont'));

// Редактирование профиля через форму:
popupInfoName.setAttribute('value', profileName.textContent);
popupInfoAbout.setAttribute('value', profileStatus.textContent);
function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = popupInfoName.value;
  profileStatus.textContent = popupInfoAbout.value;
}
SaveButton.addEventListener('submit', formSubmitHandler);


const popupImg = document.querySelector('.popup-img')
// функция создания новой карточки и открытие изображения на весь экран:
function addCard(PhotoLink, placeName){
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('#card-img').setAttribute('src', PhotoLink);
  cardElement.querySelector('#card-name').textContent = placeName;
  cardElement.querySelector('#buttonImgCard').addEventListener('click',()=>{
    const popupImgName = document.querySelector('.popup-img__name');
    const popupImgPhoto = document.querySelector('.popup-img__photo');
    const popupImgClose = document.querySelector('#poppup-img-close');

    popupImg.classList.add('popup-img_opened');
    popupImgClose.addEventListener('click',() => popupImg.classList.remove('popup-img_opened'))
    popupImgName.textContent = placeName;
    popupImgPhoto.setAttribute('src', PhotoLink);
  });
  cardElement.querySelector('#like').addEventListener('click', evt => evt.target.classList.toggle('card__like_status_on'));

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
initialCards.forEach(item => addCard(item.link, item.name));

// Добавление карточки через форму:
AddButtonImg.addEventListener('submit', ()=>{
  const linkImg = document.querySelector('#input-src');
  const ImgName = document.querySelector('#input-text-img');

  addCard(linkImg.value, ImgName.value);
}
)

// Удаление карточки:
const removeButton = document.querySelectorAll('#remove-button');
removeButton.forEach( btn => {
    btn.addEventListener('click', () =>{
        const card = btn.closest('.card');
        card.parentNode.removeChild(card);
    });
});




