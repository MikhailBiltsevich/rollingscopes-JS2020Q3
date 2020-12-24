export default class TabsBlock {
  constructor(tabs) {
    this.DOMElement = document.querySelector('#country .block__tabs');
    this.tabs = tabs;
    this.DOMElement.append(...tabs.map((tab) => tab.get()));
  }

  static getKeys() {
    return [
      'newConfirmed',
      'totalConfirmed',
      'newDeaths',
      'totalDeaths',
      'newRecovered',
      'totalRecovered',
    ];
  }

  bindOnClickTab(handler) {
    const eventListener = (event) => {
      const tab = this.tabs.find((item) => item.get() === event.currentTarget);
      handler(tab.key);
    };

    this.tabs.forEach((item) => item.get().addEventListener('click', eventListener));
  }

  toggleTabs(key) {
    const activeItem = this.tabs
      .find((item) => item.isActive());

    if (activeItem) {
      activeItem.removeActive();
    }

    const tab = this.tabs.find((item) => item.key === key);
    tab.setActive();
  }
}
