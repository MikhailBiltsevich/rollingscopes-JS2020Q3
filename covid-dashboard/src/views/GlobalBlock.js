export default class GlobalBlock {
  constructor() {
    this.DOMElement = document.getElementById('global');
    this.valueElement = this.DOMElement.querySelector('.amount');
  }

  get() {
    return this.DOMElement;
  }

  setData(country) {
    this.valueElement.textContent = country.totalConfirmed.toLocaleString();
  }
}
