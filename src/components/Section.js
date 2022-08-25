export default class Section {
  constructor({renderer}, elementSelector) {
    this._renderer = renderer;
    this._element = document.querySelector(elementSelector);
  }

  renderItems(items) {
    this._items = items;
    this._items.forEach((data) => {
      this.addItem(this._renderer(data));
    });
  }

  addItem(item) {
    this._element.prepend(item);
  }
}
