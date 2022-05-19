import {generateMovie} from '../fish/movies.js';

const MOCK_MOVIES_COUNT = 13;

export default class MoviesModel {
  #movies = Array.from({length: MOCK_MOVIES_COUNT}, generateMovie);

  get movies() {
    return this.#movies;
  }
}
