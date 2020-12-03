import { Levels } from './levels';
import { LocalStorageWrapper } from './localStorageWrapper';

export default class Model {
  constructor() {
    this.levels = Levels;
    this.remoteStorage = LocalStorageWrapper;
  }

  setCompleted(id) {
    const level = this.levels.find(item => item.id === id);
    level.isCompleted = true;
    this.remoteStorage.setCompletedLevelsId(id);
  }

  getCurrentLevel() {
    const id = this.remoteStorage.getCurrentLevelId();
    if (typeof id === 'number') {
      return this.levels.find(item => item.id === id);
    }

    return this.levels[0];
  }

  setCurrentLevel(id) {
    this.remoteStorage.setCurrentLevel(id);
  }
}
