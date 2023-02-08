import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._inputList = this._popup.querySelectorAll(".popup__info");
  }
  setInputValues(data) {
    this._inputList.forEach((input) => {
      // тут вставляем в `value` инпута данные из объекта по атрибуту `name` этого инпута
      input.value = data[input.name];
    });
  }

  _getInputValues() {
    const profileName = document.querySelector(".profile__name");
    const profileStatus = document.querySelector(".profile__status");
    this._popup.querySelector("#input-name").value = profileName.textContent;
    this._popup.querySelector("#input-about").value = profileStatus.textContent;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      this._submitCallback(evt);
    });
  }

  close() {
    super.close();
    this._popup.querySelector(".popup__edit").reset();
  }
}
