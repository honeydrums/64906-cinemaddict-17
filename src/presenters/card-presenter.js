import {render, remove, replace} from '../framework/render';
import FilmCardView from '../view/film-card-view';
import PopupView from '../view/popup-view';
import {isEscapeKey} from '../utils';

export default class CardPresenter {
  #movie = null;
  #updateCards = null;
  #container = null;
  #onChangePopupState = null;
  #isCurrentPopupOpen = false;
  #movieComponent = null;
  #moviePopupComponent = null;
  #pageBody = document.body;

  constructor(movie, updateCards, container, changePopupState) {
    this.#movie = movie;
    this.#updateCards = updateCards;
    this.#container = container;
    this.#onChangePopupState = changePopupState;
  }

  renderMovie = (movie = this.#movie) => {
    this.#movie = movie;

    if(!this.#movieComponent) {
      this.#movieComponent = new FilmCardView(movie);
      this.#moviePopupComponent = new PopupView(movie);
      this.#movieComponent.setMovieCardHandler(this.#onOpenPopup);
      this.#movieComponent.setAddToWatchlistHandler(this.#handleAddToWatchlistClick);
      this.#movieComponent.setMarkAsWatchedHandler(this.#handleMarkAsWatchedClick);
      this.#movieComponent.setMarkAsFavoriteHandler(this.#handleMarkAsFavoriteClick);

      this.#moviePopupComponent.setAddToWatchlistHandler(this.#handleAddToWatchlistClick);
      this.#moviePopupComponent.setMarkAsWatchedHandler(this.#handleMarkAsWatchedClick);
      this.#moviePopupComponent.setMarkAsFavoriteHandler(this.#handleMarkAsFavoriteClick);

      render(this.#movieComponent, this.#container);
    } else {
      const newComponent = new FilmCardView(movie);
      const newPopup = new PopupView(movie);

      newComponent.setMovieCardHandler(this.#onOpenPopup);
      newComponent.setAddToWatchlistHandler(this.#handleAddToWatchlistClick);
      newComponent.setMarkAsWatchedHandler(this.#handleMarkAsWatchedClick);
      newComponent.setMarkAsFavoriteHandler(this.#handleMarkAsFavoriteClick);

      newPopup.setAddToWatchlistHandler(this.#handleAddToWatchlistClick);
      newPopup.setMarkAsWatchedHandler(this.#handleMarkAsWatchedClick);
      newPopup.setMarkAsFavoriteHandler(this.#handleMarkAsFavoriteClick);

      replace(newComponent, this.#movieComponent);
      replace(newPopup, this.#moviePopupComponent);
      this.#movieComponent = newComponent;
      this.#moviePopupComponent = newPopup;
    }
  };

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
    this.#updateCards(this.#movie);
  };

  #handleMarkAsWatchedClick = () => {
    this.#movie.userDetails.alreadyWatched = !this.#movie.userDetails.alreadyWatched;
    this.#updateCards(this.#movie);
  };

  #handleMarkAsFavoriteClick = () => {
    this.#movie.userDetails.favorite = !this.#movie.userDetails.favorite;
    this.#updateCards(this.#movie);
  };
}
