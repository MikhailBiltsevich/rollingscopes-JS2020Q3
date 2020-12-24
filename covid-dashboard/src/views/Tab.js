export default class Tab {
  constructor(key) {
    this.key = key;
    this.DOMElement = document.createElement('button');
    this.DOMElement.classList.add('block__tab');

    function getTabName(value) {
      let text;
      switch (value) {
        case 'newConfirmed':
          text = 'New Confirmed';
          break;
        case 'totalConfirmed':
          text = 'Confirmed';
          break;
        case 'newDeaths':
          text = 'New Deaths';
          break;
        case 'totalDeaths':
          text = 'Deaths';
          break;
        case 'newRecovered':
          text = 'New Recovered';
          break;
        case 'totalRecovered':
          text = 'Recovered';
          break;
        default:
          break;
      }

      return text;
    }
    this.DOMElement.textContent = getTabName(key);
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
