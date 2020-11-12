import { Board } from "./board";

export const Movement = {
    moves: 0,
    element: null,

    chipIndex: undefined,
    emptyIndex: undefined,

    init() {
        this.element = document.createElement("div");
        this.element.textContent = this.moves;
    },

    canMove(chip) {
        this.chipIndex = Board.childrens.indexOf(chip);
        this.emptyIndex = Board.childrens.indexOf(Board.emptyChip);
        const distance = Math.abs(this.chipIndex - this.emptyIndex);
        
        const rowEmpty = Math.trunc(this.emptyIndex / Board.targetSize) + 1;
        const rowChip = Math.trunc(this.chipIndex / Board.targetSize) + 1;

        if (rowChip === rowEmpty) {
            if (distance === 1) {
                return true;
            }
        } else {
            if (distance === Board.targetSize) {
                return true;
            }
        }

        return false;
    },

    move(chip) {
        if (this.chipIndex !== undefined && this.emptyIndex !== undefined) {
            Board.childrens.splice(this.chipIndex, 1, Board.emptyChip);
            Board.childrens.splice(this.emptyIndex, 1, chip);
            Board.setChips();
        }

        this._incrementMoves();

        this.chipIndex = this.emptyIndex = undefined;
    },

    _incrementMoves() {
        this.moves++;
        this.element.textContent = this.moves;
    }
}