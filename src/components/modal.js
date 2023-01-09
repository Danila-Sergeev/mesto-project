const popupPlace = document.querySelector("#popup-container-place");
const popupAvatar = document.querySelector("#popup-avatar");
const popupProfile = document.querySelector("#popup");

function handleEscape(evt) {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector(".popup_opened");
    closePopup(popupOpened);
  }
}

//функции открытия/закрытия попап
function openPopup(popup) {
  document.addEventListener("keydown", handleEscape);
  popup.classList.add("popup_opened");
}
function closePopup(popup) {
  document.removeEventListener("keydown", handleEscape);
  popup.classList.remove("popup_opened");
}

//функции отображения прогрузки:
function renderLoading(btnId, isLoading) {
  if (isLoading) {
    document.querySelector(`#${btnId}`).textContent = "Сохранение...";
  } else {
    document.querySelector(`#${btnId}`).textContent = "Сохранить";
  }
}

export {
  renderLoading,
  popupPlace,
  popupAvatar,
  popupProfile,
  openPopup,
  closePopup,
};
