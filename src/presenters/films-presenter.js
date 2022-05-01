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

  filmsWrapper = new FilmsWrapperView();

  filmsListComponent = new FilmsListView();
  filmsListContainer = new FilmsListContainerView();

  topRatedComponent = new TopRatedFilmsView();
  topRatedContainer = new FilmsListContainerView();

  mostCommentedComponent = new MostCommentedFilmsView();
  mostCommentedContainer = new FilmsListContainerView();

  init = (mainContainer) => {
    this.mainContainer = mainContainer;

    render(this.filmsWrapper, mainContainer);

    render(this.filmsListComponent, this.filmsWrapper.getElement());
    render(this.filmsListContainer, this.filmsListComponent.getElement());
    for(let i = 0; i < this.FILMS_MOCK_COUNT; i++) {
      render(new FilmCardView(), this.filmsListContainer.getElement());
    }
    render(new ShowMoreButtonView(), this.filmsListComponent.getElement());

    render(this.topRatedComponent, this.filmsWrapper.getElement());
    render(this.topRatedContainer, this.topRatedComponent.getElement());
    for(let i = 0; i < this.EXTRA_FILMS_COUNT; i++) {
      render(new FilmCardView(), this.topRatedContainer.getElement());
    }

    render(this.mostCommentedComponent, this.filmsWrapper.getElement());
    render(this.mostCommentedContainer, this.mostCommentedComponent.getElement());
    for(let i = 0; i < this.EXTRA_FILMS_COUNT; i++) {
      render(new FilmCardView(), this.mostCommentedContainer.getElement());
    }
  };
}
