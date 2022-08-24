export default class Section {
  constructor({items, renderer}, elementSelector) {
    this._items = items;
    this._renderer = renderer;
    this._element = document.querySelector(elementSelector);
  }

  renderItems() {
    this._items.forEach((data) => {
      this._renderer(data);
    });
  }

  addItem(item) {
    this._element.prepend(item);
  }
}
