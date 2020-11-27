import { Board } from './board';
import { Menu } from './menu';
import { Movement } from './movement';
import { Save } from './save';
import { Timer } from './timer';

export const Game = {
  isStarted: false,
  messageElement: null,

  start() {
    this.messageElement.hidden = true;
    this.isStarted = true;
    Menu.close();
    Board.setGrid();
    Board.createIdChips();
    Board.createElements();
    do {
      Board.mixChips();
    } while (!Board.hasSolve());
    Board.clear();
    Board.setChips();

    Timer.restart();
    Movement.restart();
    Timer.start();
  },

  save() {
    let save = new Save(
      { min: Timer.min, sec: Timer.sec },
      Board.targetSize,
      Board.idChips,
      Movement.moves
    );

    let saves = localStorage.getItem('saves');
    if (saves === null) {
      saves = [];
    } else {
      saves = JSON.parse(saves);
    }

    const maxSavesCount = 5;

    if (saves.length === maxSavesCount) {
      saves.shift();
    }
    saves.push(save);
    localStorage.setItem('saves', JSON.stringify(saves));
  },

  load(save) {
    this.messageElement.hidden = true;
    Timer.min = save.timer.min;
    Timer.sec = save.timer.sec;
    Timer.setTime();
    Board.selectedSize = save.size;
    Board.idChips = save.idChips;
    Movement.moves = save.moves;
    Movement.update();

    Board.load();
    this.continue();
  },

  continue() {
    Timer.start();
    Menu.close();
  },

  isSolved() {
    let currentChipsOrder = Board.idChips;
    let solvedOrder = [...Array(Math.pow(Board.targetSize, 2)).keys()];
    solvedOrder.push(solvedOrder.shift());

    for (let i = 0; i < currentChipsOrder.length; i += 1) {
      if (solvedOrder[i] !== currentChipsOrder[i]) {
        return false;
      }
    }

    return true;
  },

  end() {
    this.messageElement.textContent = `Ура! Вы решили головоломку за ${Timer.format(Timer.min)}:${Timer.format(Timer.sec)} и ${Movement.moves} ходов`;
    this.messageElement.hidden = false;
    this.setScore();
  },

  setScore() {
    let scores = localStorage.getItem('scores');
    if (scores === null) {
      scores = [];
    } else {
      scores = JSON.parse(localStorage.getItem('scores'));
    }

    scores.sort((a, b) => a.moves - b.moves);

    const maxScoresCount = 10;

    if (scores.length === maxScoresCount) {
      scores.pop();
    }

    scores.push({
      date: (new Date()).toLocaleDateString(),
      moves: Movement.moves,
      size: `${Board.targetSize}x${Board.targetSize}`
    });

    localStorage.setItem('scores', JSON.stringify(scores));
  }
};
