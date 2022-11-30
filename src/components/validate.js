//Валидация форм
const settings = {
  formSelector: '.popup__edit',
  inputSelector: '.popup__info',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_inactive',
  inputErrorClass: 'popup__edit_type_error',
  errorClass: 'popup__error-massage_active',
}

const showInputError = (formElement, inputElement, errorMessage, settings,) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
}

const hideInputError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
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
    showInputError(formElement, inputElement, inputElement.validationMessage, settings);
  } else {
    hideInputError(formElement, inputElement, settings);
  }
};
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return (!inputElement.validity.valid);
  })
};
 const toggleButtonState = (inputList, buttonElement, settings) => {
  if (hasInvalidInput(inputList)){
    buttonElement.disabled = true;
    buttonElement.classList.add(settings.inactiveButtonClass);
  }
  else{
    buttonElement.disabled = false;
    buttonElement.classList.remove(settings.inactiveButtonClass);
  }
}
const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);
  formElement.addEventListener('submit', () => {
    toggleButtonState(inputList, buttonElement, settings);
  });
  toggleButtonState(inputList, buttonElement, settings);
  formElement.addEventListener('reset', () => {
    setTimeout(() => {
      toggleButtonState(inputList, buttonElement, settings);
    }, 0);
  });
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
};
const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement,settings);
  });
};
enableValidation(settings);
export{toggleButtonState}
