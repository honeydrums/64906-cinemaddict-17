import { render } from '../render.js';
import { isEscapeKey } from '../utils.js';
import FilmsWrapperView from '../view/films-wrapper-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import FilmCardView from '../view/film-card-view.js';
import TopRatedFilmsView from '../view/top-rated-films-view';
import MostCommentedFilmsView from '../view/most-commented-films-view';
import PopupView from '../view/popup-view';

export default class FilmsPresenter {
  #EXTRA_FILMS_COUNT = 2;

  #mainContainer = null;
  #moviesModel = null;
  #moviesList = null;

  #filmsWrapperComponent = new FilmsWrapperView();

  #filmsListComponent = new FilmsListView();
  #filmsListComponentContainer = new FilmsListContainerView();

  #topRatedComponent = new TopRatedFilmsView();
  #topRatedComponentContainer = new FilmsListContainerView();

  #mostCommentedComponent = new MostCommentedFilmsView();
  #mostCommentedComponentContainer = new FilmsListContainerView();

  #renderMovie = (movie) => {
    const pageBody = document.body;
    const movieComponent = new FilmCardView(movie);
    const moviePopupComponent = new PopupView(movie);

    const onMovieCardClick = (evt) => {
      evt.preventDefault();
      pageBody.classList.add('hide-overflow');
      pageBody.appendChild(moviePopupComponent.element);
      document.addEventListener('keydown', closeFromKeyboardHandler);
    };

    const onClosePopupClick = () => {
      pageBody.removeAttribute('class');
      pageBody.removeChild(moviePopupComponent.element);
      document.removeEventListener('keydown', closeFromKeyboardHandler);
    };

    function closeFromKeyboardHandler(evt) {
      if(isEscapeKey(evt)) {
        evt.preventDefault();
        onClosePopupClick();
      }
    }

    movieComponent.element.querySelector('.film-card__link').addEventListener('click', onMovieCardClick);
    moviePopupComponent.element.querySelector('.film-details__close-btn').addEventListener('click', onClosePopupClick);

    render(movieComponent, this.#filmsListComponentContainer.element);
  };

  init = (mainContainer, moviesModel) => {
    this.#mainContainer = mainContainer;
    this.#moviesModel = moviesModel;
    this.#moviesList = [...this.#moviesModel.movies];

    render(this.#filmsWrapperComponent, this.#mainContainer);

    render(this.#filmsListComponent, this.#filmsWrapperComponent.element);
    render(this.#filmsListComponentContainer, this.#filmsListComponent.element);
    for(let i = 0; i < this.#moviesList.length; i++) {
      this.#renderMovie(this.#moviesList[i]);
    }
    render(new ShowMoreButtonView(), this.#filmsListComponent.element);

    render(this.#topRatedComponent, this.#filmsWrapperComponent.element);
    render(this.#topRatedComponentContainer, this.#topRatedComponent.element);
    for(let i = 0; i < this.#EXTRA_FILMS_COUNT; i++) {
      render(new FilmCardView(this.#moviesList[i]), this.#topRatedComponentContainer.element);
    }

    render(this.#mostCommentedComponent, this.#filmsWrapperComponent.element);
    render(this.#mostCommentedComponentContainer, this.#mostCommentedComponent.element);
    for(let i = 0; i < this.#EXTRA_FILMS_COUNT; i++) {
      render(new FilmCardView(this.#moviesList[i]), this.#mostCommentedComponentContainer.element);
    }
  };
}
