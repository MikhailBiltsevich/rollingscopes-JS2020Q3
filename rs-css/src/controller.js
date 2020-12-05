export default class Controller {
  constructor(view, model) {
    this.view = view;
    this.model = model;

    this.onInitialLoad(this.model.levels);
    this.view.bindCheckAnswer(this.handleCheckAnswer.bind(this));
    this.view.bindLevelSelected(this.handleOnLevelClick.bind(this));
  }

  onInitialLoad(levels) {
    this.view.fillLevelsList(levels);
    const level = this.model.getCurrentLevel();
    this.view.setLevel(level);
  }

  handleCheckAnswer(selector) {
    const level = this.model.getCurrentLevel();
    if (selector === level.selector) {
      this.model.setCompleted(level.id);
      this.view.markAsCompleted(level.id);
    }
  }

  handleOnLevelClick(id) {
    this.model.setCurrentLevel(id);
    const level = this.model.getCurrentLevel();
    this.view.setLevel(level);
  }
}
