import { render } from './render.js';
import ProfileView from './view/profile-view.js';
import FooterStatisticsView from './view/footer-statistics-view.js';
import NavigationView from './view/navigation-view.js';
import SortView from './view/sort-view.js';
import FilmsPresenter from './presenters/films-presenter.js';
import PopupView from './view/popup-view.js';
import MoviesModel from './model/movies-model.js';

const pageBody = document.querySelector('.footer');
const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const footerStatisticsElement = document.querySelector('.footer__statistics');
const filmsPresenter = new FilmsPresenter();
const moviesModel = new MoviesModel();

render(new ProfileView(), headerElement);
render(new NavigationView(), mainElement);
render(new SortView(), mainElement);
filmsPresenter.init(mainElement, moviesModel);
render(new FooterStatisticsView(), footerStatisticsElement);
render(new PopupView(), pageBody, 'afterend');
