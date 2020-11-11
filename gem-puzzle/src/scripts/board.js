export const Board = {
    element: null,
    chips: [],
    emptyChip: null,
    childrens: [],

    init() {
        this.element = document.createElement("div");
        this._setGrid();
    },
    
    _setGrid() {
        this.element.classList.add("board");
        this.element.classList.add("board_size-4");
    },

    createElements() {
        for (let i = 1; i <  4 * 4; i++) {
            const chip = document.createElement("div");
            chip.classList.add("board__chip");
            chip.textContent = chip.dataset.id = i;
            this.chips.push(chip);
            this.childrens.push(chip);
        }

        this.emptyChip = document.createElement("div");
        this.emptyChip.dataset.id = 0;
        this.emptyChip.classList.add("board__empty");
        this.childrens.push(this.emptyChip);
    },

    mixChips() {
        let maxRandom = this.childrens.length;
        for (let i = 0; i < maxRandom; maxRandom--) {
            const index = Math.floor(Math.random() * maxRandom);
            const value = this.childrens.splice(index, 1)[0];
            this.childrens.push(value);
        }
    },

    hasSolve() {
        const rowEmptyChip = Math.trunc(this.childrens.indexOf(this.emptyChip) / 4) + 1;
        const chips = this.childrens.filter(chip => chip !== this.emptyChip);

        for (let i = 0; i < chips.length; i++) {
            let sum = 0;
            const chipValue = +chips[i].dataset.id;

            for (let j = i + 1; j < chips.length; j++) {
                const value = +chips[j].dataset.id;
                if (chipValue > value) {
                    sum++;
                }
            }

            if ((sum + rowEmptyChip) % 2 !== 0) {
                return false;
            }
        }

        return true;
    },

    setChips() {
        this.childrens.forEach(children => this.element.append(children));
    }
}