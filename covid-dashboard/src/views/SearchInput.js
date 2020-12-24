export default class SearchInput {
  constructor() {
    this.DOMElement = document.querySelector('#country .block__search');
  }

  get value() {
    return this.DOMElement.value;
  }

  get() {
    return this.DOMElement;
  }

  bindOnInput(handler) {
    const eventListener = () => {
      handler(this.value);
    };

    this.DOMElement.addEventListener('input', eventListener);
  }
}
