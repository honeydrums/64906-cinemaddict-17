import {generateMovie} from '../fish/movies.js';

export default class MoviesModel {
  #movies = Array.from({length: 30}, generateMovie);

  get movies() {
    return this.#movies;
  }
}
