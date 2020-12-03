export const LocalStorageWrapper = {
  keys: {
    currentLevel: 'currentLevel',
    completedLevels: 'completedLevels'
  },

  setCurrentLevel(id) {
    localStorage.setItem(this.keys.currentLevel, JSON.stringify(id));
  },

  getCurrentLevelId() {
    const value = localStorage.getItem(this.keys.currentLevel);
    return JSON.parse(value);
  },

  setCompletedLevelsId(values) {
    localStorage.setItem(this.keys.completedLevels, JSON.stringify(values));
  },

  getCompletedLevels() {
    const values = localStorage.getItem(this.keys.completedLevels);
    return values ? JSON.parse(values) : values;
  }
};
