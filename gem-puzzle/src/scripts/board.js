import { Movement } from "./movement";

export const Board = {
    element: null,
    chips: [],
    emptyChip: null,
    childrens: [],
    sizes: [3, 4, 5, 6, 7, 8],
    targetSize: 4,
    isDragging: false,

    init() {
        this.element = document.createElement("div");
        this._setGrid();

        this.element.addEventListener("click", (event) => {
            if (Board.isDragging) {
                Board.isDragging = false;
                return;
            }
            const targetElement = event.target;
            if (targetElement.classList.contains("board__chip")) {
                if (Movement.canMove(targetElement)) {
                    Movement.move(targetElement);
                }
            }
        });
    },
    
    _setGrid() {
        this.element.classList.add("board");
        this.element.classList.add(`board_size-${this.targetSize}`);
    },

    createElements() {
        for (let i = 1; i <  Math.pow(this.targetSize, 2); i++) {
            const chip = document.createElement("div");
            chip.classList.add("board__chip");
            chip.textContent = chip.dataset.id = i;
            this.chips.push(chip);
            this.childrens.push(chip);

            chip.onmousedown = function(event) {
                event.preventDefault();
                let shiftX = event.clientX - chip.getBoundingClientRect().left;
                let shiftY = event.clientY - chip.getBoundingClientRect().top;
                moveAt(event.pageX, event.pageY);
                const cell = document.createElement("div");
                cell.classList.add("base-chip-position");
                chip.before(cell);
                const size = chip.offsetWidth;
                chip.style.width = chip.style.height = size + 'px';
                chip.style.position = 'absolute';
                document.onmouseup = mouseUp;
                document.onmousemove = mouseMove;

                function moveAt(pageX, pageY) {
                    chip.style.left = pageX - shiftX + 'px';
                    chip.style.top = pageY - shiftY + 'px';
                }

                function mouseMove(e) {
                    e.preventDefault();
                    console.log("onmousemove");
                    moveAt(e.pageX, e.pageY);
                    Board.isDragging = true;

                    chip.style.display = "none";
                    if (Board.emptyChip === document.elementFromPoint(e.clientX, e.clientY)) {
                        Board.isDragging = false;
                    }
                    chip.style.display = null;
                }
    
                function mouseUp() {
                    chip.style.width = chip.style.height = null;
                    chip.style.position = null;
                    cell.remove();
                    document.onmouseup = null;
                    document.onmousemove = null;
                }
            }
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
        const rowEmptyChip = Math.trunc(this.childrens.indexOf(this.emptyChip) / this.targetSize) + 1;
        const chips = this.childrens.filter(chip => chip !== this.emptyChip);
        let sum = 0;

        for (let i = 0; i < chips.length; i++) {
            const chipValue = +chips[i].dataset.id;

            for (let j = i + 1; j < chips.length; j++) {
                const value = +chips[j].dataset.id;
                if (chipValue > value) {
                    sum++;
                }
            }
        }
        
        if ((sum + rowEmptyChip) % 2 !== 0) {
            return false;
        }
        return true;
    },

    setChips() {
        this.childrens.forEach(children => this.element.append(children));
    }
}