export const Timer = {
    min: 0,
    sec: 0,

    element: null,
    interval: null,

    init() {
        this.element = document.createElement("time");
        this.setTime();
    },
    
    start() {
        this.interval = setInterval(() => {
            this._increment();
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
        this.min = this.sec = 0
    },

    _increment() {
        this.sec++;

        if (this.sec === 60) {
            this.min++;
            this.sec = 0;
        }
    },

    setTime() {
        this.element.textContent = `${this._format(this.min)}:${this._format(this.sec)}`;
    },

    _format(value) {
        if (value < 10) {
            return `0${value}`;
        }

        return value.toString();
    }
}