import { Board } from "./board";
import { Game } from "./game";

export const Movement = {
    moves: 0,
    element: null,

    chipIndex: undefined,
    emptyIndex: undefined,

    init() {
        this.element = document.createElement("div");
        this.update();
    },

    restart() {
        this.moves = 0;
        this.update();
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

        if (Game.isSolved()) {
            Game.end();
        }
    },

    _incrementMoves() {
        this.moves++;
        this.update();
    },

    update () {
        this.element.textContent = `Moves: ${this.moves}`;
    }
}