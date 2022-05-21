import AbstractView from '../framework/view/abstract-view.js';

const emptyListTemplate = () => '<h2 class="films-list__title">There are no movies in our database</h2>';

export default class EmptyListView extends AbstractView {
  get template() {
    return emptyListTemplate();
  }
}
