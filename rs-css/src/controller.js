export default class Controller {
  constructor(view, model) {
    this.view = view;
    this.model = model;

    this.onInitialLoad(this.model.levels);
    this.view.bindCheckAnswer(this.handleCheckAnswer.bind(this));
  }

  onInitialLoad(levels) {
    this.view.fillLevelsList(levels);
    const level = this.model.getCurrentLevel();
    this.view.setLevel(level);
  }

  handleCheckAnswer(selector) {
    const level = this.model.getCurrentLevel();
    console.log(selector === level.selector);
  }
}
