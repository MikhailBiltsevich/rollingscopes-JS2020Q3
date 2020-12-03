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
  }

  getCurrentLevel() {
    return this.remoteStorage.getCurrentLevel();
  }

  setCurrentLevel(id) {
    this.remoteStorage.setCurrentLevel(id);
  }

  getLevels() {
    return this.levels;
  }
}
