import { createElement } from '../render.js';

const createFilmsWrapperTemplate = () => '<section class="films"></section>';

export default class FilmsWrapperView {
  getTemplate() {
    return createFilmsWrapperTemplate();
  }

  getElement() {
    if(!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
