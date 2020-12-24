export default class CountryListItem {
  constructor(country) {
    const createElement = (tag, classToken) => {
      const element = document.createElement(tag);
      element.classList.add(classToken);
      return element;
    };

    this.country = country;
    this.DOMElement = createElement('div', 'list__item');
    const countryElement = createElement('div', 'country');
    this.countryValueElement = createElement('span', 'country__sick');
    this.countryNameElement = createElement('span', 'country__name');
    const flagElement = createElement('img', 'country__flag');

    const pathToFlag = `./assets/flags/${country.ISO2.toLowerCase()}.svg`;
    flagElement.src = pathToFlag;
    flagElement.alt = 'flag';

    countryElement.append(this.countryValueElement, this.countryNameElement, flagElement);
    this.DOMElement.append(countryElement);

    this.DOMElement.dataset.countryCode = country.ISO2;
    this.value = country.summaryStat.totalConfirmed;
    this.countryNameElement.textContent = country.title;
  }

  get value() {
    return this.valueNumber;
  }

  set value(value) {
    this.valueNumber = value;
    this.countryValueElement.textContent = value.toLocaleString();
  }

  get title() {
    return this.countryNameElement.textContent;
  }

  get() {
    return this.DOMElement;
  }

  isActive() {
    const className = 'active';
    return this.DOMElement.classList.contains(className);
  }

  setActive() {
    const className = 'active';
    this.DOMElement.classList.add(className);
  }

  removeActive() {
    const className = 'active';
    this.DOMElement.classList.remove(className);
  }
}
