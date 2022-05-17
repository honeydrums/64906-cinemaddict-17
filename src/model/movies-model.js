import {generateMovie} from '../fish/movies.js';

export default class MoviesModel {
  #movies = Array.from({length: 18}, generateMovie);

  get movies() {
    return this.#movies;
  }
}
