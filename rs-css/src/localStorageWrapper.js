export const LocalStorageWrapper = {
  keys: {
    currentLevel: 'currentLevel',
    completedLevels: 'completedLevels'
  },

  setCurrentLevel(id) {
    localStorage.setItem(this.keys.currentLevel, JSON.stringify(id));
  },

  getCurrentLevel() {
    const value = localStorage.getItem(this.keys.currentLevel);
    return value ? JSON.parse(value) : value;
  },

  setCompletedLevelsId(values) {
    localStorage.setItem(this.keys.completedLevels, JSON.stringify(values));
  },

  getCompletedLevels() {
    const values = localStorage.getItem(this.keys.completedLevels);
    return values ? JSON.parse(values) : values;
  }
};
