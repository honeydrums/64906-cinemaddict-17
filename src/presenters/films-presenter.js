import { render, remove } from '../framework/render.js';
import FilmsWrapperView from '../view/films-wrapper-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import TopRatedFilmsView from '../view/top-rated-films-view';
import MostCommentedFilmsView from '../view/most-commented-films-view';
import EmptyListView from '../view/empty-list-view';
import CardPresenter from './card-presenter';

const MOVIES_CHUNK_COUNT = 5;

export default class FilmsPresenter {
  #EXTRA_FILMS_COUNT = 2;

  #isPopupOpen = false;
  #mainContainer = null;
  #moviesModel = null;
  #moviesList = [];
  #moviesPresenters = [];
  #renderedMoviesCount = MOVIES_CHUNK_COUNT;

  #filmsWrapperComponent = new FilmsWrapperView();

  #filmsListComponent = new FilmsListView();
  #filmsListComponentContainer = new FilmsListContainerView();

  #topRatedComponent = new TopRatedFilmsView();
  #topRatedComponentContainer = new FilmsListContainerView();

  #mostCommentedComponent = new MostCommentedFilmsView();
  #mostCommentedComponentContainer = new FilmsListContainerView();

  #showMoreButtonComponent = new ShowMoreButtonView();

  constructor(mainContainer, moviesModel) {
    this.#mainContainer = mainContainer;
    this.#moviesModel = moviesModel;
  }

  #changePopupState = (popupState) => {
    if(this.#isPopupOpen && popupState) {
      this.#moviesPresenters.forEach((presenter) => {
        presenter.closePopup();
      });
      this.#isPopupOpen = popupState;
      return;
    }
    this.#isPopupOpen = popupState;
  };

  #showMoreMovies = () => {
    this.#moviesList
      .slice(this.#renderedMoviesCount, this.#renderedMoviesCount + MOVIES_CHUNK_COUNT)
      .forEach((movie) => this.#renderMovie(movie, this.#filmsListComponentContainer.element));

    this.#renderedMoviesCount += MOVIES_CHUNK_COUNT;

    if(this.#renderedMoviesCount >= this.#moviesList.length) {
      remove(this.#showMoreButtonComponent);
    }
  };

  #renderMoviesListContainers = () => {
    render(this.#filmsWrapperComponent, this.#mainContainer);
    render(this.#filmsListComponent, this.#filmsWrapperComponent.element);
    render(this.#filmsListComponentContainer, this.#filmsListComponent.element);
  };

  #renderMovie = (movie, container) => {
    const moviePresenter = new CardPresenter(movie, container, this.#changePopupState);
    moviePresenter.renderMovie();
    this.#moviesPresenters.push(moviePresenter);
  };

  #renderMovies = () => {
    this.#renderMoviesListContainers();

    if(this.#moviesList.length < 1) {
      return this.#renderEmptyMoviesList();
    }

    for(let i = 0; i < Math.min(this.#moviesList.length, MOVIES_CHUNK_COUNT); i++) {
      this.#renderMovie(this.#moviesList[i], this.#filmsListComponentContainer.element);
    }

    if(this.#moviesList.length > MOVIES_CHUNK_COUNT) {
      render(this.#showMoreButtonComponent, this.#filmsListComponent.element);

      this.#showMoreButtonComponent.setLoadMoreBtnClick(this.#showMoreMovies);
    }

    this.#renderTopRatedMovies();
    this.#renderMostCommentedMovies();
  };

  #renderTopRatedMovies = () => {
    render(this.#topRatedComponent, this.#filmsWrapperComponent.element);
    render(this.#topRatedComponentContainer, this.#topRatedComponent.element);
    for(let i = 0; i < this.#EXTRA_FILMS_COUNT; i++) {
      this.#renderMovie(this.#moviesList[i], this.#topRatedComponentContainer.element);
    }
  };

  #renderMostCommentedMovies = () => {
    render(this.#mostCommentedComponent, this.#filmsWrapperComponent.element);
    render(this.#mostCommentedComponentContainer, this.#mostCommentedComponent.element);
    for(let i = 0; i < this.#EXTRA_FILMS_COUNT; i++) {
      this.#renderMovie(this.#moviesList[i], this.#mostCommentedComponentContainer.element);
    }
  };

  #renderEmptyMoviesList = () => {
    render(new EmptyListView(), this.#filmsListComponentContainer.element);
  };

  init = () => {
    this.#moviesList = this.#moviesModel.movies;
    this.#renderMovies();
  };
}
