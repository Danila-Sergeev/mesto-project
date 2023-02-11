export class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  setData(data) {
    this._data = data;
  }

  clear() {
    this._container.innerHTML = "";
  }

  setItem(item) {
    this._container.prepend(item);
  }

  renderItems() {
    this.clear();
    this._data.forEach((element) => {
      const listElement = this._renderer(element);
      this.setItem(listElement);
    });
  }
}
