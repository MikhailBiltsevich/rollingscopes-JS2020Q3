export default class View {
  constructor() {
    this.root = document.getElementById('root');

    this.answerBlock = View.createElement('div', 'answer');

    this.input = View.createElement('input', 'answer__input');
    this.input.placeholder = 'Enter your answer';

    this.submitButton = View.createElement('button', 'answer__submit');
    this.submitButton.textContent = 'Enter';

    this.answerBlock.append(this.input, this.submitButton);

    this.renderedBlock = View.createElement('div', 'level-render');

    this.codeBlock = View.createElement('code', 'code');

    this.levelsList = View.createElement('ul', 'levels-list');

    this.root.append(this.answerBlock, this.renderedBlock, this.codeBlock, this.levelsList);
  }

  static createElement(tagName, classToken) {
    const element = document.createElement(tagName);
    if (classToken) {
      element.classList.add(classToken);
    }

    return element;
  }

  fillLevelsList(levels) {
    for (let i = 0; i < levels.length; i += 1) {
      const listItem = View.createElement('li', 'levels-list__item');
      const level = levels[i];
      listItem.dataset.id = level.id;
      listItem.textContent = `Level ${level.id}`;
      this.levelsList.append(listItem);
    }
  }

  markAsCompleted(id) {
    const listItem = this.levelsList.querySelector(`[data-id='${id}']`);
    listItem.classList.add('completed');
  }

  setLevel(level) {
    this.codeBlock.innerText = level.code;
    this.renderedBlock.innerHTML = level.code;

    const setLevelAsActive = () => {
      const className = 'active';
      const newlistItem = this.levelsList.querySelector(`[data-id='${level.id}']`);
      const activeItems = this.levelsList.querySelectorAll(`.${className}`);
      activeItems.forEach(item => item.classList.remove(className));
      newlistItem.classList.add(className);
    };

    setLevelAsActive();
  }

  bindCheckAnswer(handler) {
    const elementHandler = (event) => {
      if (event.type === 'keydown') {
        if (event.code !== 'Enter') {
          return;
        }
      }

      const selector = this.input.value;
      handler(selector);
    };

    this.input.addEventListener('keydown', elementHandler);
    this.submitButton.addEventListener('click', elementHandler);
  }

  bindLevelSelected(handler) {
    const elementHandler = (event) => {
      const id = +event.target.dataset.id;

      handler(id);
    };

    this.levelsList.querySelectorAll('li').forEach(item => item.addEventListener('click', elementHandler));
  }
}
