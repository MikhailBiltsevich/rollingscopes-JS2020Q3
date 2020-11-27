import { Board } from './board';
import { Game } from './game';
import { Timer } from './timer';

export const Menu = {
  element: null,
  pages: {
    main: {
      element: null,
      header: null,
      container: null,
      items: {
        newGame: null,
        loadGame: null,
        scores: null,
        settings: null
      }
    },

    saves: {
      element: null,

      init() {
        this.element = document.createElement('div');
        this.element.classList.add('saved-games-page');

        const games = JSON.parse(localStorage.getItem('saves'));
        let gameslist = document.createElement('ol');
        gameslist.classList.add('saved-games-page__list');
        for (let i = 0; i < games.length; i += 1) {
          let item = document.createElement('li');
          item.classList.add('saved-games-page__item');
          item.textContent = games[i].info;
          item.addEventListener('click', () => {
            Game.load(games[i]);
          });
          gameslist.append(item);
        }

        this.element.append(gameslist);
        this.element.append(Menu.backButton.element);
      }
    },

    scores: {
      element: null,
      init() {
        this.element = document.createElement('div');
        this.element.classList.add('score-page');

        if (localStorage.getItem('scores')) {
          const scores = JSON.parse(localStorage.getItem('scores'));
          scores.sort((a, b) => a.moves - b.moves);
          let scoresList = document.createElement('ol');
          scoresList.classList.add('score-page__list');
          for (let i = 0; i < scores.length; i += 1) {
            let item = document.createElement('li');
            item.classList.add('score-page__item');
            item.textContent = `${scores[i].date} | ${scores[i].moves} moves | ${scores[i].size}`;
            scoresList.append(item);
            this.element.append(scoresList);
          }
        } else {
          const infoElement = document.createElement('div');
          infoElement.textContent = "You hasn't scores yet";
          infoElement.classList.add('score-page__info');
          this.element.append(infoElement);
        }

        this.element.append(Menu.backButton.element);
      }
    },

    settings: {
      element: null,

      init() {
        this.element = document.createElement('div');
        this.element.classList.add('settings-page');

        let sizesList = document.createElement('select');
        sizesList.classList.add('settings-page__sizes');
        for (let i = 0; i < Board.sizes.length; i += 1) {
          const size = Board.sizes[i];
          const option = document.createElement('option');
          if (size === Board.targetSize) {
            option.selected = true;
          }
          option.value = size;
          option.textContent = `${size}x${size}`;

          sizesList.append(option);
        }

        sizesList.addEventListener('change', () => {
          const index = sizesList.options.selectedIndex;
          Board.selectedSize = +sizesList.options[index].value;
        });

        this.element.append(sizesList);
        this.element.append(Menu.backButton.element);
      }
    }
  },

  button: null,
  backButton: {
    element: null,

    init() {
      this.element = document.createElement('button');
      this.element.classList.add('menu__back-button');
      this.element.textContent = 'Back to menu';
      this.element.addEventListener('click', () => {
        Menu.back();
      });
    }
  },

  init() {
    this.backButton.init();
    this.element = document.createElement('div');
    this.element.classList.add('menu');

    this.pages.main.element = document.createElement('div');
    this.pages.main.element.classList.add('main-page');

    this.button = document.createElement('button');
    this.button.classList.add('menu__button');
    this.button.textContent = 'Menu';
    this.button.addEventListener('click', () => {
      this.show();
    });

    this.pages.main.header = document.createElement('ul');
    this.pages.main.header.classList.add('main-page__header');

    const continueItem = document.createElement('li');
    continueItem.textContent = 'continue';
    continueItem.classList.add('main-page__header-item');
    continueItem.addEventListener('click', () => {
      Game.continue();
    });

    const saveGameItem = document.createElement('li');
    saveGameItem.textContent = 'save game';
    saveGameItem.classList.add('main-page__header-item');
    saveGameItem.addEventListener('click', () => {
      Game.save();
    });

    this.pages.main.header.append(continueItem, saveGameItem);

    this.pages.main.container = document.createElement('ul');
    this.pages.main.container.classList.add('main-page__list');

    this.pages.main.items.newGame = document.createElement('li');
    this.pages.main.items.newGame.textContent = 'New Game';
    this.pages.main.items.newGame.addEventListener('click', () => {
      Game.start();
    });

    this.pages.main.items.loadGame = document.createElement('li');
    this.pages.main.items.loadGame.textContent = 'Load game';
    this.pages.main.items.loadGame.addEventListener('click', () => {
      if (!localStorage.getItem('saves')) {
        return;
      }

      this.pages.saves.init();
      this.element.textContent = '';
      this.element.append(this.pages.saves.element);
    });

    this.pages.main.items.scores = document.createElement('li');
    this.pages.main.items.scores.textContent = 'Best Scores';
    this.pages.main.items.scores.addEventListener('click', () => {
      this.pages.scores.init();
      this.element.textContent = '';
      this.element.append(this.pages.scores.element);
    });

    this.pages.main.items.settings = document.createElement('li');
    this.pages.main.items.settings.textContent = 'Settings';
    this.pages.main.items.settings.addEventListener('click', () => {
      this.pages.settings.init();
      this.element.textContent = '';
      this.element.append(this.pages.settings.element);
    });

    const menuItemKeys = Object.keys(this.pages.main.items);
    for (let i = 0; i < menuItemKeys.length; i += 1) {
      const key = menuItemKeys[i];

      this.pages.main.items[key].classList.add('menu-item');
      this.pages.main.container.append(this.pages.main.items[key]);
    }

    this.pages.main.element.append(this.pages.main.header);
    this.pages.main.element.append(this.pages.main.container);

    this.show();
  },

  show() {
    Timer.pause();
    this.element.textContent = '';
    this.element.append(this.pages.main.element);
    this.pages.main.header.classList.toggle('main-page__header_hidden', !Game.isStarted);
    this.element.classList.toggle('menu__hidden', false);
  },

  close() {
    this.element.textContent = '';
    this.element.append(this.pages.main.element);
    this.element.classList.toggle('menu__hidden', true);
  },

  back() {
    this.element.textContent = '';
    this.element.append(this.pages.main.element);
  }
};
