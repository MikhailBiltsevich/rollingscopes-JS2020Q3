export default class CountryList {
  constructor(...items) {
    this.DOMElement = document.querySelector('#country .list');
    this.items = items;
    this.sortItems();
    this.appendItems(this.items);
  }

  appendItems(items) {
    this.DOMElement.innerHTML = '';
    this.DOMElement.append(...items.map((item) => item.get()));
  }

  get() {
    return this.DOMElement;
  }

  filter(value) {
    const filtered = this.items.filter(
      (item) => item.title.toLowerCase().startsWith(value.toLowerCase()),
    );

    this.appendItems(filtered);
  }

  bindOnClickItem(handler) {
    const eventListener = (event) => {
      const listItem = this.items.find((item) => item.get() === event.currentTarget);
      handler(listItem.country);
    };

    this.items.forEach((item) => item.get().addEventListener('click', eventListener));
  }

  toggleActiveItem(country) {
    const activeItem = this.items
      .find((item) => item.isActive());

    if (activeItem) {
      activeItem.removeActive();
    }

    const listItem = this.items.find((item) => item.country === country);
    listItem.setActive();
  }

  changeValues(key) {
    for (let i = 0; i < this.items.length; i += 1) {
      const item = this.items[i];
      item.value = item.country.summaryStat[key];
    }

    this.sortItems();
  }

  sortItems() {
    this.items.sort((a, b) => b.value - a.value);
  }
}
