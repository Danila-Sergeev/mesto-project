const popupInfoName = document.querySelector('#input-name');
const popupInfoAbout = document.querySelector('#input-about');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const avatar = document.querySelector('.profile__avatar');
const avatarValue = document.querySelector('#input-src-avatar');
const formAvatar = document.forms.editAvatar;
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


export{avatar, formSubmitHandler, formSubmitAvatar, popupInfoAbout, popupInfoName, profileName ,profileStatus};
