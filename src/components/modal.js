class Popup {
  constructor(popupSelector){
    this._popup = document.querySelector(popupSelector);
    this.setEventListeners();
  }

  open(){
    document.addEventListener("keydown", (evt) => this._handleEscClose(evt));
    this._popup.classList.add("popup_opened");
  }

  close(){
    document.removeEventListener("keydown", (evt) => this._handleEscClose(evt));
    this._popup.classList.remove("popup_opened");
  }
  _handleEscClose(evt){
    if (evt.key === "Escape") {
      this.close();
    }
  }
  setEventListeners(){
    this._popup.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("popup_opened")) {
        this.close();
      }
      if (evt.target.classList.contains("popup__close-icon")) {
        this.close();
      }
    })
  }
}


/* function this__handleEscClose()(evt) {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector(".popup_opened");
    closePopup(popupOpened);
  }
}
 */
//функции открытия/закрытия попап
/* function openPopup(popup) {
  document.addEventListener("keydown", this__handleEscClose());
  popup.classList.add("popup_opened");
}
function closePopup(popup) {
  document.removeEventListener("keydown", this__handleEscClose());
  popup.classList.remove("popup_opened");
}
 */
//функции отображения прогрузки:
function renderLoading(btnId, isLoading, usualText) {
  if (isLoading) {
    document.querySelector(`#${btnId}`).textContent = "Сохранение...";
  } else {
    document.querySelector(`#${btnId}`).textContent = usualText;
  }
}

export {renderLoading, Popup}
