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