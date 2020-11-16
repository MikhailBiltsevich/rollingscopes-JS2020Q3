import '../style.scss';
import { Timer } from './timer';
import { Board } from "./board";
import { Movement } from './movement';
import { Menu } from './menu';
import { Game } from './game';

function init() {
    const container = document.createElement("div");
    container.classList.add("game-container");
    Game.messageElement = document.createElement("h3");

    Timer.init();
    Movement.init();
    Board.init();
    Menu.init();

    container.append(Game.messageElement);
    container.append(Timer.element);
    container.append(Movement.element);
    container.append(Menu.button);
    container.append(Board.element);
    container.append(Menu.element);

    document.body.append(container);
}

init();