import {generateMovie} from '../fish/movies.js';

export default class MoviesModel {
  movies = Array.from({length: 3}, generateMovie);
  getMovies = () => this.movies;
}
