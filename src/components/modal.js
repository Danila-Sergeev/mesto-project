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
function renderLoading(btnId, isLoading, usualText) {
  if (isLoading) {
    document.querySelector(`#${btnId}`).textContent = "Сохранение...";
  } else {
    document.querySelector(`#${btnId}`).textContent = usualText;
  }
}

export { renderLoading, openPopup, closePopup };
