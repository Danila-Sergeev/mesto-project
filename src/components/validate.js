export default class Validator {
  constructor(settings, formElement){
    this._settings = settings
    this._formElement = formElement
    this._formList = Array.from(document.querySelectorAll(this._settings.formSelector));
  }

  _setEventListeners = (formElement, settings) => {
    const inputList = Array.from(
      formElement.querySelectorAll(settings.inputSelector)
    );
    const buttonElement = formElement.querySelector(
      settings.submitButtonSelector
    );

    _toggleButtonState(inputList, buttonElement, settings);
    
    formElement.addEventListener("reset", () => {
      setTimeout(() => {
        _toggleButtonState(inputList, buttonElement, settings);
      }, 0);
    });
    
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        _checkInputValidity(formElement, inputElement);
        _toggleButtonState(inputList, buttonElement, settings);
      });
    });
  };
  

  _toggleButtonState = (inputList, buttonElement, settings) => {
    if (_hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
      buttonElement.classList.add(settings.inactiveButtonClass);
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(settings.inactiveButtonClass);
    }
  };

  _checkInputValidity = (formElement, inputElement) => {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
      _showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage,
        settings
      );
    } else {
      _hideInputError(formElement, inputElement, this._settings);
    }
  };

  _showInputError = (formElement, inputElement, errorMessage, settings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorClass);
  };
  
  _hideInputError = (formElement, inputElement, settings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = "";
  };

  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };
  

  enableValidation(){
    this._formList.forEach((formElement) => {
      _setEventListeners(formElement, this._settings);
    });
  };
}
