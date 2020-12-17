import ViewCreator from './viewCreator';

export default class AnswerView {
  constructor() {
    this.element = ViewCreator.createElement('div', 'answer');

    this.input = ViewCreator.createElement('input', 'answer__input');
    this.input.placeholder = 'Enter your answer';

    this.submitButton = ViewCreator.createElement('button', 'answer__submit');
    this.submitButton.textContent = 'Enter';

    this.element.append(this.input, this.submitButton);
  }

  get() {
    return this.element;
  }

  get selector() {
    return this.input.value;
  }

  addAnswerListener(handler) {
    this.input.addEventListener('keydown', handler);
    this.submitButton.addEventListener('click', handler);
  }

  clearSelector() {
    this.input.value = '';
  }

  notifyWrongAnswer() {
    const className = 'wrong-answer';
    this.element.classList.add(className);
    setTimeout(() => {
      this.element.classList.remove(className);
    }, 1000);
  }
}
