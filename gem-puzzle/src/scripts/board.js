import { Movement } from './movement';

export const Board = {
  element: null,
  emptyChip: null,
  childrens: [],
  idChips: [],
  sizes: [3, 4, 5, 6, 7, 8],
  targetSize: 4,
  selectedSize: undefined,
  isDragging: false,

  init() {
    this.element = document.createElement('div');
    this.element.addEventListener('click', (event) => {
      if (Board.isDragging) {
        Board.isDragging = false;
        return;
      }
      const targetElement = event.target;
      if (targetElement.classList.contains('board__chip')) {
        if (Movement.canMove(targetElement)) {
          Movement.move(targetElement);
        }
      }
    });

    this.setGrid();
    this.createIdChips();
    this.createElements();
    this.setChips();
  },

  setGrid() {
    this.element.classList.add('board');
    if (this.selectedSize) {
      this.element.classList.remove(`board_size-${this.targetSize}`);
      this.targetSize = this.selectedSize;
      this.selectedSize = undefined;
    }

    this.element.classList.add(`board_size-${this.targetSize}`);
  },

  createIdChips() {
    this.idChips = [...Array(Math.pow(this.targetSize, 2)).keys()];
    this.idChips.push(this.idChips.shift());
  },

  load() {
    this.setGrid();
    this.clear();
    this.createElements();
    this.setChips();
  },

  createElements() {
    this.childrens = [];
    const emptyChipId = 0;
    for (let i = 0; i < this.idChips.length; i += 1) {
      const id = this.idChips[i];
      const chip = document.createElement('div');
      if (id !== emptyChipId) {
        chip.classList.add('board__chip');
        chip.onmousedown = this.drag;
        chip.textContent = id;
        chip.dataset.id = id;
      } else {
        this.emptyChip = chip;
        chip.dataset.id = id;
        this.emptyChip.classList.add('board__empty');
      }

      this.childrens.push(chip);
    }
  },

  drag(event) {
    event.preventDefault();
    const chip = event.currentTarget;
    let shiftX = event.clientX - chip.getBoundingClientRect().left;
    let shiftY = event.clientY - chip.getBoundingClientRect().top;

    function moveAt(pageX, pageY) {
      chip.style.left = pageX - shiftX + 'px';
      chip.style.top = pageY - shiftY + 'px';
    }

    moveAt(event.pageX, event.pageY);
    const cell = document.createElement('div');
    cell.classList.add('base-chip-position');
    chip.before(cell);
    const size = chip.offsetWidth;
    chip.style.width = size + 'px';
    chip.style.height = size + 'px';

    chip.style.position = 'absolute';

    function mouseMove(e) {
      e.preventDefault();
      moveAt(e.pageX, e.pageY);
      Board.isDragging = true;

      chip.style.display = 'none';
      if (Board.emptyChip === document.elementFromPoint(e.clientX, e.clientY)) {
        Board.isDragging = false;
      }
      chip.style.display = null;
    }

    function mouseUp() {
      chip.style.width = null;
      chip.style.height = null;
      chip.style.position = null;
      cell.remove();

      document.onmouseup = null;
      document.onmousemove = null;
    }

    document.onmouseup = mouseUp;
    document.onmousemove = mouseMove;
  },

  mixChips() {
    let maxRandom = this.childrens.length;
    for (let i = 0; i < maxRandom; maxRandom -= 1) {
      const index = Math.floor(Math.random() * maxRandom);
      const value = this.childrens.splice(index, 1)[0];
      this.childrens.push(value);
    }
  },

  hasSolve() {
    const rowEmptyChip = Math.trunc(this.childrens.indexOf(this.emptyChip) / this.targetSize) + 1;
    const chips = this.childrens.filter(chip => chip !== this.emptyChip);
    let sum = 0;

    for (let i = 0; i < chips.length; i += 1) {
      const chipValue = +chips[i].dataset.id;

      for (let j = i + 1; j < chips.length; j += 1) {
        const value = +chips[j].dataset.id;
        if (chipValue > value) {
          sum += 1;
        }
      }
    }

    if ((sum + rowEmptyChip) % 2 !== 0) {
      return false;
    }
    return true;
  },

  clear() {
    this.element.textContent = '';
  },

  setChips() {
    this.childrens.forEach(children => this.element.append(children));
    this.updateIdChipsOrder();
  },

  updateIdChipsOrder() {
    this.idChips = this.childrens.map(children => +children.dataset.id);
  }
};
