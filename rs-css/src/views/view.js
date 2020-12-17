import AnswerView from './answerView';
import CodeView from './codeView';
import FooterView from './footerView';
import HeaderView from './headerView';
import LevelView from './levelView';
import ListView from './listView';

export default class View {
  constructor() {
    this.root = document.getElementById('root');

    this.header = new HeaderView();
    this.footer = new FooterView();
    this.answerView = new AnswerView();
    this.levelView = new LevelView();
    this.codeView = new CodeView();
    this.listView = new ListView();

    this.root.append(
      this.header.get(),
      this.answerView.get(),
      this.levelView.get(),
      this.codeView.get(),
      this.listView.get(),
      this.footer.get()
    );
  }

  fillLevelsList(levels) {
    this.listView.createItems(levels);
    this.listView.setItems();
  }

  markAsCompleted(id) {
    this.listView.markItemAsCompleted(id);
  }

  showWrongAnswer() {
    this.answerView.notifyWrongAnswer();
  }

  setLevel(level) {
    this.header.setContent(level.title, level.description);
    this.codeView.text = level.code;
    this.levelView.render(level.code, level.selector);
    this.listView.setActiveItem(level.id);
    this.answerView.clearSelector();
  }

  bindCheckAnswer(handler) {
    const elementHandler = (event) => {
      if (event.type === 'keydown') {
        if (event.code !== 'Enter') {
          return;
        }
      }

      const selector = this.answerView.selector;
      handler(selector);
    };

    this.answerView.addAnswerListener(elementHandler);
  }

  bindLevelSelected(handler) {
    const elementHandler = (event) => {
      const id = +event.target.dataset.id;

      handler(id);
    };

    this.listView.items.forEach(item => item.addEventListener('click', elementHandler));
  }
}
