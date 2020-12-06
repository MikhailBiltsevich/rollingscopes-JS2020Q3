export default class Controller {
  constructor(view, model) {
    this.view = view;
    this.model = model;

    this.onInitialLoad(this.model.levels);
    this.view.bindCheckAnswer(this.handleCheckAnswer.bind(this));
    this.view.bindLevelSelected(this.handleOnLevelClick.bind(this));
  }

  onInitialLoad(levels) {
    const completedLevels = this.model.getCompletedLevels();
    for (let i = 0; i < levels.length; i += 1) {
      const level = levels[i];
      level.isCompleted = completedLevels.includes(level.id);
    }

    this.view.fillLevelsList(levels);
    const level = this.model.getCurrentLevel();
    this.view.setLevel(level);
  }

  handleCheckAnswer(selector) {
    const level = this.model.getCurrentLevel();
    if (selector === level.selector) {
      this.model.setCompleted(level.id);
      this.view.markAsCompleted(level.id);
    } else {
      this.view.showWrongAnswer();
    }
  }

  handleOnLevelClick(id) {
    this.model.setCurrentLevel(id);
    const level = this.model.getCurrentLevel();
    this.view.setLevel(level);
  }
}
