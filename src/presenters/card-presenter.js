import {render, remove} from '../framework/render';
import FilmCardView from '../view/film-card-view';
import PopupView from '../view/popup-view';
import {isEscapeKey} from '../utils';

export default class CardPresenter {
  #movie = null;
  #container = null;
  #onChangePopupState = null;
  #isCurrentPopupOpen = false;
  #movieComponent = null;
  #moviePopupComponent = null;
  #pageBody = document.body;

  constructor(movie, container, changePopupState) {
    this.#movie = movie;
    this.#container = container;
    this.#onChangePopupState = changePopupState;
    this.#movieComponent = new FilmCardView(this.#movie);
    this.#moviePopupComponent = new PopupView(this.#movie);
  }

  openPopup = () => {
    this.#isCurrentPopupOpen = true;
    this.#pageBody.classList.add('hide-overflow');
    this.#pageBody.appendChild(this.#moviePopupComponent.element);
    this.#moviePopupComponent.setCloseHandler(this.#onClosePopup);
    document.addEventListener('keydown', this.#closeFromKeyboardHandler);
  };

  closePopup = () => {
    if(!this.#isCurrentPopupOpen) {
      return;
    }
    this.#isCurrentPopupOpen = false;
    this.#pageBody.removeAttribute('class');
    remove(this.#moviePopupComponent);
    document.removeEventListener('keydown',this.#closeFromKeyboardHandler);
  };

  #onOpenPopup = () => {
    if(this.#isCurrentPopupOpen) {
      return;
    }
    this.#onChangePopupState(true);
    this.openPopup();
  };

  #onClosePopup = () => {
    this.#onChangePopupState(false);
    this.closePopup();
  };

  #closeFromKeyboardHandler = (evt) => {
    if(isEscapeKey(evt)) {
      evt.preventDefault();
      this.#onClosePopup();
    }
  };

  #handleAddToWatchlistClick = () => {
    this.#movie.userDetails.watchlist = !this.#movie.userDetails.watchlist;
  };

  renderMovie = () => {
    this.#movieComponent.setMovieCardHandler(this.#onOpenPopup);
    this.#movieComponent.setAddToWatchlistHandler(this.#handleAddToWatchlistClick);

    render(this.#movieComponent, this.#container);
  };
}
