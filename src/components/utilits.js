function handleEscape(evt){
  if (evt.key === 'Escape'){
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

function openPopup(popup) {
  document.addEventListener('keydown', handleEscape);
  popup.classList.add('popup_opened');
}
 function closePopup(popup) {
  document.removeEventListener('keydown', handleEscape);
  popup.classList.remove('popup_opened');
}


export{openPopup, closePopup};

