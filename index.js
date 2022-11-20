const popup = document.querySelector('#popup');
const content = document.querySelector('.content');
const page = document.querySelector('.page')
const popupEdit = document.querySelector('.popup__edit');
const popupImgCont = document.querySelector('#popup-img-cont');
const bottonEditProfile = document.querySelector('.profile__edit');
const buttonPlaceClose = document.querySelector('#popup-close-icon-place');
const popupPlace = document.querySelector('#popup-container-place');
const popupAvatar = document.querySelector('#popup-avatar');
const popupAvatarBtn = document.querySelector('#add-button-img-avatar');
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
const formElementAvater = document.querySelector('#popup-img-avatar');
const popupImg = document.querySelector('.popup_img');
const popupImgClose = document.querySelector('#popup-img-close');
const popupImgName = document.querySelector('.popup_img_name');
const avatar = document.querySelector('.profile__avatar');
const avatarEdit = document.querySelector('.profile__avatar_edit');
const avatarClose = document.querySelector('#popup-avatar-close');
const avatarValue = document.querySelector('#input-src-avatar');
const formProfile = document.forms.editProfile;
const formCards = document.forms.editCards;
const formAvatar = document.forms.editAvatar;


//нажате кнопки изменения аватара:
avatar.addEventListener('mouseover', () => {avatarEdit.classList.add('popup_opened'); avatar.classList.add('profile__avatar_opacity')});
avatar.addEventListener('mouseout', () => {avatarEdit.classList.remove('popup_opened');  avatar.classList.remove('profile__avatar_opacity')});
avatarEdit.addEventListener('mouseover', () => {avatarEdit.classList.add('popup_opened');  avatar.classList.add('profile__avatar_opacity')});
avatarEdit.addEventListener('mouseout', () => {avatarEdit.classList.remove('popup_opened'); avatar.classList.remove('profile__avatar_opacity')});

//Валидация форм

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__edit_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__error-massage_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__edit_type_error');
  errorElement.classList.remove('popup__error-massage_active');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  }
  else {
    inputElement.setCustomValidity("");
  }
  
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return (!inputElement.validity.valid);
  })
};
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)){
    buttonElement.disabled = true;
    buttonElement.classList.add('popup__save_inactive');
  }
  else{
    buttonElement.disabled = false;
    buttonElement.classList.remove('popup__save_inactive');
  }
}
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__info'));
  const buttonElement = formElement.querySelector('.popup__save');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__edit'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};
enableValidation();






// Открытие - закрытие попап:
function openPopup(popup) {
  popup.classList.add('popup_opened');
}
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}
bottonEditProfile.addEventListener('click', () => {
  openPopup(popup);
  popupInfoName.setAttribute('value', profileName.textContent);
  popupInfoAbout.setAttribute('value', profileStatus.textContent);
});
function closeBtns(evt){
  if (evt.key === 'Escape'){
    closePopup(popup);
    closePopup(popupPlace);
    closePopup(popupImg);
    closePopup(popupAvatar);
  }
}
function overlay(evt){
  if (evt.target == this){
    closePopup(popup);
    closePopup(popupPlace);
    closePopup(popupImg);
    closePopup(popupAvatar);
  }
}
buttonClosePopup.addEventListener('click', () =>  closePopup(popup));

document.addEventListener('keydown', closeBtns);

popupPlace.addEventListener('click', overlay);
popup.addEventListener('click', overlay);
popupImg.addEventListener('click', overlay);
popupAvatar.addEventListener('click', overlay);

avatar.addEventListener('click', () => openPopup(popupAvatar));
avatarEdit.addEventListener('click', () => openPopup(popupAvatar));
avatarClose.addEventListener('click', () =>  closePopup(popupAvatar));

profileButtonAdd.addEventListener('click', () => openPopup(popupPlace));

buttonPlaceClose.addEventListener('click', () => closePopup(popupPlace));


// Редактирование профиля через форму:
function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = popupInfoName.value;
  profileStatus.textContent = popupInfoAbout.value;
}
function formSubmitAvatar (evt) {
  evt.preventDefault();
  avatar.setAttribute('src', avatarValue.value);
  formAvatar.reset();
}

formElementAvater.addEventListener('submit', formSubmitAvatar);
popupAvatarBtn.addEventListener('click', () => closePopup(popupAvatar));
formElement.addEventListener('submit', formSubmitHandler);
buttonPopupSave.addEventListener('click', () => closePopup(popup));

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
function renderCard(photoLink, placeName){
  cardContainer.prepend(addCard(photoLink, placeName));
}

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
profileButtonAddImg.addEventListener('click', () => closePopup(popupPlace));




