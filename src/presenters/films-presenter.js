import {render} from '../render.js';
import FilmsWrapperView from '../view/films-wrapper-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import FilmCardView from '../view/film-card-view.js';
import TopRatedFilmsView from '../view/top-rated-films-view';
import MostCommentedFilmsView from '../view/most-commented-films-view';

export default class FilmsPresenter {
  FILMS_MOCK_COUNT = 5;
  EXTRA_FILMS_COUNT = 2;

  filmsWrapperComponent = new FilmsWrapperView();

  filmsListComponent = new FilmsListView();
  filmsListComponentContainer = new FilmsListContainerView();

  topRatedComponent = new TopRatedFilmsView();
  topRatedComponentContainer = new FilmsListContainerView();

  mostCommentedComponent = new MostCommentedFilmsView();
  mostCommentedComponentContainer = new FilmsListContainerView();

  init = (mainContainer, moviesModel) => {
    this.mainContainer = mainContainer;
    this.moviesModel = moviesModel;
    this.moviesList = [...this.moviesModel.getMovies()];

    render(this.filmsWrapperComponent, mainContainer);

    render(this.filmsListComponent, this.filmsWrapperComponent.getElement());
    render(this.filmsListComponentContainer, this.filmsListComponent.getElement());
    for(let i = 0; i < this.moviesList.length; i++) {
      render(new FilmCardView(this.moviesList[i]), this.filmsListComponentContainer.getElement());
    }
    render(new ShowMoreButtonView(), this.filmsListComponent.getElement());

    // render(this.topRatedComponent, this.filmsWrapperComponent.getElement());
    // render(this.topRatedComponentContainer, this.topRatedComponent.getElement());
    // for(let i = 0; i < this.EXTRA_FILMS_COUNT; i++) {
    //   render(new FilmCardView(), this.topRatedComponentContainer.getElement());
    // }
    //
    // render(this.mostCommentedComponent, this.filmsWrapperComponent.getElement());
    // render(this.mostCommentedComponentContainer, this.mostCommentedComponent.getElement());
    // for(let i = 0; i < this.EXTRA_FILMS_COUNT; i++) {
    //   render(new FilmCardView(), this.mostCommentedComponentContainer.getElement());
    // }
  };
}
