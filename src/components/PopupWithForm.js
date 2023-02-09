import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._inputList = this._popup.querySelectorAll(".popup__info");
    this._form = this._popup.querySelector(".popup__edit");
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      // тут вставляем в `value` инпута данные из объекта по атрибуту `name` этого инпута
      input.value = data[input.name];
    });
  }

  _getInputValues() {
    // создаём пустой объект
    this._formValues = {};
    // добавляем в этот объект значения всех полей
    this._inputList.forEach(input => {
    this._formValues[input.name] = input.value;
  });

    // возвращаем объект значений
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      this._submitCallback(evt, this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
