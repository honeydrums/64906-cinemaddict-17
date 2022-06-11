import AbstractView from '../framework/view/abstract-view.js';

const createFilmCardTemplate = (movie) => {
  const {filmInfo, comments, userDetails} = movie;
  const inWatchList = userDetails.watchlist ? 'film-card__controls-item--active' : '';
  const isAlreadyWatched = userDetails.alreadyWatched ? 'film-card__controls-item--active' : '';
  const isFavorite = userDetails.favorite ? 'film-card__controls-item--active' : '';

  return (
    `<article class="film-card">
    <a class="film-card__link">
      <h3 class="film-card__title">${filmInfo.title}</h3>
      <p class="film-card__rating">${filmInfo.totalRating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${filmInfo.release.date}</span>
        <span class="film-card__duration">${filmInfo.runtime}</span>
        <span class="film-card__genre">${filmInfo.genres.join(', ')}</span>
      </p>
      <img src="./images/posters/${filmInfo.poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${filmInfo.description}</p>
      <span class="film-card__comments">${comments} comments</span>
    </a>
    <div class="film-card__controls">
      <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${inWatchList}" type="button">Add to watchlist</button>
      <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${isAlreadyWatched}" type="button">Mark as watched</button>
      <button class="film-card__controls-item film-card__controls-item--favorite ${isFavorite}" type="button">Mark as favorite</button>
    </div>
   </article>`
  );
};

export default class FilmCardView extends AbstractView {
  #movie = null;

  constructor(movie) {
    super();
    this.#movie = movie;
  }

  get template() {
    return createFilmCardTemplate(this.#movie);
  }

  setMovieCardHandler = (cb) => {
    this._callback.click = cb;
    this.element.querySelector('.film-card__link').addEventListener('click', this.#clickHandler);
  };

  setAddToWatchlistHandler = (cb) => {
    this._callback.watchlistClick = cb;
    this.element.querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this.#addToWatchlistHandler);
  };

  setMarkAsWatchedHandler = (cb) => {
    this._callback.asWatchedClick = cb;
    this.element.querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this.#markAsWatchedHandler);
  };

  setMarkAsFavoriteHandler = (cb) => {
    this._callback.asFavoriteClick = cb;
    this.element.querySelector('.film-card__controls-item--favorite').addEventListener('click', this.#markAsFavoriteHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };

  #addToWatchlistHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchlistClick();
  };

  #markAsWatchedHandler = (evt) => {
    evt.preventDefault();
    this._callback.asWatchedClick();
  };

  #markAsFavoriteHandler = (evt) => {
    evt.preventDefault();
    this._callback.asFavoriteClick();
  };
}
