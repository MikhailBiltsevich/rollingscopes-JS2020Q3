export default class ViewCreator {
  static createElement(tagName, classToken) {
    const element = document.createElement(tagName);
    if (classToken) {
      element.classList.add(classToken);
    }

    return element;
  }
}
