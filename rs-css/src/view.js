import microlight from 'microlight';

export default class View {
  constructor() {
    this.root = document.getElementById('root');

    this.header = View.createElement('div', 'header');
    this.title = View.createElement('h2');
    this.description = View.createElement('div');

    this.header.append(this.title, this.description);

    this.answerBlock = View.createElement('div', 'answer');

    this.input = View.createElement('input', 'answer__input');
    this.input.placeholder = 'Enter your answer';

    this.submitButton = View.createElement('button', 'answer__submit');
    this.submitButton.textContent = 'Enter';

    this.answerBlock.append(this.input, this.submitButton);

    this.renderedBlock = View.createElement('div', 'level-render');

    this.codeBlock = View.createElement('code', 'code');
    this.codeText = View.createElement('pre');
    this.codeText.classList.add('microlight');
    this.codeBlock.append(this.codeText);

    this.levelsList = View.createElement('ul', 'levels-list');

    const createFooter = () => {
      this.footer = View.createElement('footer', 'footer');

      const courseLink = View.createElement('a', 'course-link');
      const schoolLogo = View.createElement('img');
      schoolLogo.src = './src/assets/img/rs_school_js.svg';
      courseLink.href = 'https://rs.school/js/';
      courseLink.append(schoolLogo);
      courseLink.target = '_blank';

      const gitHubLink = View.createElement('a');
      gitHubLink.textContent = 'Mikhail Biltsevich';
      gitHubLink.href = 'https://github.com/MikhailBiltsevich';
      gitHubLink.target = '_blank';

      const productionYear = View.createElement('div');
      productionYear.textContent = '2020';

      this.footer.append(gitHubLink, productionYear, courseLink);
    };

    createFooter();

    this.root.append(
      this.header,
      this.answerBlock,
      this.renderedBlock,
      this.codeBlock,
      this.levelsList,
      this.footer
    );
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
      if (level.isCompleted) {
        listItem.classList.add('completed');
      }
      listItem.dataset.id = level.id;
      listItem.textContent = `Level ${level.id}`;
      this.levelsList.append(listItem);
    }
  }

  markAsCompleted(id) {
    const listItem = this.levelsList.querySelector(`[data-id='${id}']`);
    listItem.classList.add('completed');
  }

  showWrongAnswer() {
    const className = 'wrong-answer';
    this.answerBlock.classList.add(className);
    setTimeout(() => {
      this.answerBlock.classList.remove(className);
    }, 1000);
  }

  setLevel(level) {
    this.title.textContent = level.title;
    this.description.textContent = level.description;
    this.codeText.textContent = level.code;
    microlight.reset();
    this.renderedBlock.innerHTML = level.code;

    const animationClassName = 'animated';

    this.renderedBlock.querySelectorAll(level.selector)
      .forEach(item => item.classList.add(animationClassName));

    const setLevelAsActive = () => {
      const className = 'active';
      const newlistItem = this.levelsList.querySelector(`[data-id='${level.id}']`);
      const activeItems = this.levelsList.querySelectorAll(`.${className}`);
      activeItems.forEach(item => item.classList.remove(className));
      newlistItem.classList.add(className);
    };

    setLevelAsActive();

    const clearSelector = () => {
      this.input.value = '';
    };

    clearSelector();
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
