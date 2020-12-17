import ViewCreator from './viewCreator';

export default class HeaderView {
  constructor() {
    this.element = ViewCreator.createElement('div', 'header');
    this.title = ViewCreator.createElement('h2');
    this.description = ViewCreator.createElement('div');

    this.element.append(this.title, this.description);
  }

  get() {
    return this.element;
  }

  setContent(title, description) {
    this.title.textContent = title;
    this.description.textContent = description;
  }
}
