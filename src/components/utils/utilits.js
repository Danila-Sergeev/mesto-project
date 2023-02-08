//функции отображения прогрузки:
export function renderLoading(btnId, isLoading, usualText) {
  if (isLoading) {
    document.querySelector(`#${btnId}`).textContent = "Сохранение...";
  } else {
    document.querySelector(`#${btnId}`).textContent = usualText;
  }
}
