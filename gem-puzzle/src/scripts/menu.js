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
      },

      init() {
        this.element = document.createElement('div');
        this.element.classList.add('main-page');

        this.container = document.createElement('ul');
        this.container.classList.add('main-page__list');

        this.initHeader();
        this.createItems();
        this.appendItems();
      },

      initHeader() {
        this.header = document.createElement('ul');
        this.header.classList.add('main-page__header');

        const continueItem = Menu.createItem('li', 'continue', () => {
          Game.continue();
        });
        continueItem.classList.add('main-page__header-item');

        const saveGameItem = Menu.createItem('li', 'save game', () => {
          Game.save();
        });
        saveGameItem.classList.add('main-page__header-item');

        this.header.append(continueItem, saveGameItem);
      },

      appendItems() {
        const menuItemKeys = Object.keys(this.items);
        for (let i = 0; i < menuItemKeys.length; i += 1) {
          const key = menuItemKeys[i];

          this.items[key].classList.add('menu-item');
          this.container.append(this.items[key]);
        }

        this.element.append(this.header);
        this.element.append(this.container);
      },

      createItems() {
        this.items.newGame = Menu.createItem('li', 'New Game', () => {
          Game.start();
        });

        this.items.loadGame = Menu.createItem('li', 'Load game', () => {
          if (!localStorage.getItem('saves')) {
            return;
          }

          Menu.pages.saves.init();
          Menu.setPage(Menu.pages.saves.element);
        });

        this.items.scores = Menu.createItem('li', 'Best Scores', () => {
          Menu.pages.scores.init();
          Menu.setPage(Menu.pages.scores.element);
        });

        this.items.settings = Menu.createItem('li', 'Settings', () => {
          Menu.pages.settings.init();
          Menu.setPage(Menu.pages.settings.element);
        });
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
        for (let i = Board.sizes.min; i <= Board.sizes.max; i += 1) {
          const size = i;
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

    this.button = this.createItem('button', 'Menu', () => {
      this.show();
    });
    this.button.classList.add('menu__button');

    this.pages.main.init();

    this.show();
  },

  createItem(tagName, content, handler) {
    const item = document.createElement(tagName);
    item.textContent = content;
    item.addEventListener('click', handler);

    return item;
  },

  show() {
    Timer.pause();
    this.setPage(this.pages.main.element);
    this.pages.main.header.classList.toggle('main-page__header_hidden', !Game.isStarted);
    this.element.classList.toggle('menu__hidden', false);
  },

  close() {
    this.setPage(this.pages.main.element);
    this.element.classList.toggle('menu__hidden', true);
  },

  setPage(pageElement) {
    this.element.textContent = '';
    this.element.append(pageElement);
  },

  back() {
    this.element.textContent = '';
    this.element.append(this.pages.main.element);
  }
};
