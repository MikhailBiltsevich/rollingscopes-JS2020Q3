export default class GlobalBlockController {
  constructor(view, model) {
    this.view = view;
    this.model = model;

    this.update();
    this.model.bindTargetCountryChanged(this.update.bind(this));
  }

  update() {
    const stat = this.model.targetCountry
      ? this.model.targetCountry.summaryStat
      : this.model.globalStat;
    this.view.setData(stat);
  }
}
