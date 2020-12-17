import ViewCreator from './viewCreator';

export default class ListView {
  constructor() {
    this.element = ViewCreator.createElement('ul', 'levels-list');
    this.items = undefined;
  }

  get() {
    return this.element;
  }

  markItemAsCompleted(id) {
    const item = this.getItemByDataId(id);
    item.classList.add('completed');
  }

  createItems(levels) {
    function createItem(level) {
      const item = ViewCreator.createElement('li', 'levels-list__item');
      if (level.isCompleted) {
        item.classList.add('completed');
      }
      item.dataset.id = level.id;
      item.textContent = level.title;

      return item;
    }

    this.items = levels.map(createItem);
  }

  setItems() {
    this.items.forEach((item) => this.element.append(item));
  }

  setActiveItem(id) {
    const className = 'active';
    const newlistItem = this.getItemByDataId(id);
    const activeItems = this.element.querySelectorAll(`.${className}`);
    activeItems.forEach(item => item.classList.remove(className));
    newlistItem.classList.add(className);
  }

  getItemByDataId(id) {
    return this.element.querySelector(`[data-id='${id}']`);
  }
}
