import { render } from '../framework/render.js';
import { isEscapeKey } from '../utils.js';
import FilmsWrapperView from '../view/films-wrapper-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import FilmCardView from '../view/film-card-view.js';
import TopRatedFilmsView from '../view/top-rated-films-view';
import MostCommentedFilmsView from '../view/most-commented-films-view';
import PopupView from '../view/popup-view';
import EmptyListView from '../view/empty-list-view';

const MOVIES_CHUNK_COUNT = 5;

export default class FilmsPresenter {
  #EXTRA_FILMS_COUNT = 2;

  #mainContainer = null;
  #moviesModel = null;
  #moviesList = null;
  #renderedMoviesCount = MOVIES_CHUNK_COUNT;

  #filmsWrapperComponent = new FilmsWrapperView();

  #filmsListComponent = new FilmsListView();
  #filmsListComponentContainer = new FilmsListContainerView();

  #topRatedComponent = new TopRatedFilmsView();
  #topRatedComponentContainer = new FilmsListContainerView();

  #mostCommentedComponent = new MostCommentedFilmsView();
  #mostCommentedComponentContainer = new FilmsListContainerView();

  #isPopupOpen = false;

  #showMoreButtonComponent = new ShowMoreButtonView();

  #renderMovie = (movie) => {
    const pageBody = document.body;
    const movieComponent = new FilmCardView(movie);
    const moviePopupComponent = new PopupView(movie);

    const onMovieCardClick = () => {
      if(this.#isPopupOpen) {
        document.querySelector('.film-details').remove();
      } else {
        this.#isPopupOpen = true;
      }
      pageBody.classList.add('hide-overflow');
      pageBody.appendChild(moviePopupComponent.element);
      document.addEventListener('keydown', closeFromKeyboardHandler);
    };

    const onClosePopupClick = () => {
      this.#isPopupOpen = false;
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

    movieComponent.setMovieCardHandler(onMovieCardClick);
    moviePopupComponent.setMoviePopupHandler(onClosePopupClick);

    render(movieComponent, this.#filmsListComponentContainer.element);
  };

  #showMoreMovies = () => {
    this.#moviesList
      .slice(this.#renderedMoviesCount, this.#renderedMoviesCount + MOVIES_CHUNK_COUNT)
      .forEach((movie) => this.#renderMovie(movie));

    this.#renderedMoviesCount += MOVIES_CHUNK_COUNT;

    if(this.#renderedMoviesCount >= this.#moviesList.length) {
      this.#showMoreButtonComponent.element.remove();
      this.#showMoreButtonComponent.removeElement();
    }
  };

  init = (mainContainer, moviesModel) => {
    this.#mainContainer = mainContainer;
    this.#moviesModel = moviesModel;
    this.#moviesList = [...this.#moviesModel.movies];

    render(this.#filmsWrapperComponent, this.#mainContainer);

    render(this.#filmsListComponent, this.#filmsWrapperComponent.element);
    render(this.#filmsListComponentContainer, this.#filmsListComponent.element);

    if(this.#moviesList.length < 1) {
      return render(new EmptyListView(), this.#filmsListComponentContainer.element);
    }

    for(let i = 0; i < Math.min(this.#moviesList.length, MOVIES_CHUNK_COUNT); i++) {
      this.#renderMovie(this.#moviesList[i]);
    }

    if(this.#moviesList.length > MOVIES_CHUNK_COUNT) {
      render(this.#showMoreButtonComponent, this.#filmsListComponent.element);

      this.#showMoreButtonComponent.setLoadMoreBtnClick(this.#showMoreMovies);
    }

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
