import {render, remove} from '../framework/render';
import FilmCardView from '../view/film-card-view';
import PopupView from '../view/popup-view';
import {isEscapeKey} from '../utils';

export default class CardPresenter {
  #movie = null;
  #container = null;
  #isPopupOpen = false;
  #movieComponent = null;
  #moviePopupComponent = null;
  #pageBody = document.body;

  constructor(movie, container) {
    this.#movie = movie;
    this.#container = container;
    this.#movieComponent = new FilmCardView(this.#movie);
    this.#moviePopupComponent = new PopupView(this.#movie);
  }

  #openPopup = () => {
    if(this.#isPopupOpen) {
      document.querySelector('.film-details').remove();
    } else {
      this.#isPopupOpen = true;
    }
    this.#pageBody.classList.add('hide-overflow');
    this.#pageBody.appendChild(this.#moviePopupComponent.element);
    document.addEventListener('keydown', this.#closeFromKeyboardHandler);
  };

  #closePopup = () => {
    this.#isPopupOpen = false;
    this.#pageBody.removeAttribute('class');
    remove(this.#moviePopupComponent);
    document.removeEventListener('keydown',this.#closeFromKeyboardHandler);
  };

  #closeFromKeyboardHandler = (evt) => {
    if(isEscapeKey(evt)) {
      evt.preventDefault();
      this.#closePopup();
    }
  };

  renderMovie = () => {
    this.#movieComponent.setMovieCardHandler(this.#openPopup);
    this.#moviePopupComponent.setCloseHandler(this.#closePopup);

    render(this.#movieComponent, this.#container);
  };
}
