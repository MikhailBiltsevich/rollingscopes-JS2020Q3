import ViewCreator from './viewCreator';

export default class LevelView {
  constructor() {
    this.element = ViewCreator.createElement('div', 'level-render');
  }

  get() {
    return this.element;
  }

  render(code, selector) {
    this.element.innerHTML = code;

    const animationClassName = 'animated';

    this.element.querySelectorAll(selector)
      .forEach(item => item.classList.add(animationClassName));
  }
}
