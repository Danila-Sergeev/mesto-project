export class Section {
    constructor( data, renderer, containerSelector) {
        this._data = data 
        this._renderer = renderer
        this._container = document.querySelector(containerSelector)
    }

    clear() {
        this._container.innerHTML = ""
    }

    setItem(item) {
        this._container.append(item)
    }

    renderItems() {
        this.clear()
        
        this._data.forEach((element) => {
            const el = this._renderer(element)
            const listElement = el.generate()
            this.setItem(listElement)
        });
    }
}