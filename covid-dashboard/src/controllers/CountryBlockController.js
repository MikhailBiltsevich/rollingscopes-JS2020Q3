export default class CountryBlockController {
  constructor(view, model) {
    this.view = view;
    this.model = model;

    this.view.input.bindOnInput(this.search.bind(this));
    this.view.list.bindOnClickItem(this.changeCountry.bind(this));
    this.view.tabsBlock.bindOnClickTab(this.changeStatus.bind(this));
    this.model.bindTargetCountryChanged(this.setActiveCountry.bind(this));
    this.changeStatus();
  }

  search(value) {
    this.view.list.filter(value);
  }

  changeCountry(country) {
    this.model.targetCountry = country;
    this.view.list.toggleActiveItem(country);
  }

  setActiveCountry() {
    this.view.list.toggleActiveItem(this.model.targetCountry);
  }

  changeStatus(statusKey = 'totalConfirmed') {
    this.view.list.changeValues(statusKey);
    this.search(this.view.input.value);
    this.view.tabsBlock.toggleTabs(statusKey);
  }
}
