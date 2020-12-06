import { Levels } from './levels';
import { LocalStorageWrapper } from './localStorageWrapper';

export default class Model {
  constructor() {
    this.levels = Levels;
    this.remoteStorage = LocalStorageWrapper;
  }

  setCompleted(id) {
    const completedLevelsId = this.remoteStorage.getCompletedLevels() || [];

    const level = this.levels.find(item => item.id === id);
    level.isCompleted = true;
    if (!completedLevelsId.includes(id)) {
      completedLevelsId.push(id);
    }

    this.remoteStorage.setCompletedLevelsId(completedLevelsId);
  }

  getCurrentLevel() {
    const id = this.remoteStorage.getCurrentLevelId();
    if (typeof id === 'number') {
      return this.levels.find(item => item.id === id);
    }

    return this.levels[0];
  }

  getCompletedLevels() {
    return this.remoteStorage.getCompletedLevels() || [];
  }

  setCurrentLevel(id) {
    this.remoteStorage.setCurrentLevel(id);
  }
}
