export const Timer = {
  min: 0,
  sec: 0,

  element: null,
  interval: null,

  init() {
    this.element = document.createElement('time');
    this.setTime();
  },

  start() {
    this.interval = setInterval(() => {
      this.increment();
      this.setTime();
    }, 1000);
  },

  pause() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  },

  restart() {
    this.min = 0;
    this.sec = 0;
  },

  increment() {
    this.sec = 1;

    if (this.sec === 60) {
      this.min += 1;
      this.sec = 0;
    }
  },

  setTime() {
    this.element.textContent = `${this.format(this.min)}:${this.format(this.sec)}`;
  },

  format(value) {
    return value.toString().padStart(2, '0');
  }
};
