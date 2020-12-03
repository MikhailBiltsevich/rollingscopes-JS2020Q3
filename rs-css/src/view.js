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
    const listItem = View.createElement('li', 'levels-list__item');
    for (let i = 0; i < levels.length; i += 1) {
      const level = levels[i];
      listItem.dataset.id = level.id;
      listItem.textContent = `Level ${level.id}`;
      this.levelsList.append(listItem);
    }
  }

  setLevel(code) {
    this.codeBlock.innerText = code;
    this.renderedBlock.innerHTML = code;
  }
}
