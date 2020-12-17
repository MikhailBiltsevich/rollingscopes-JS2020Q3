import microlight from 'microlight';
import ViewCreator from './viewCreator';

export default class CodeView {
  constructor() {
    this.element = ViewCreator.createElement('code', 'code');
    this.textContainer = ViewCreator.createElement('pre');
    this.textContainer.classList.add('microlight');

    this.element.append(this.textContainer);
  }

  get() {
    return this.element;
  }

  set text(value) {
    this.textContainer.textContent = value;
    microlight.reset();
  }
}
