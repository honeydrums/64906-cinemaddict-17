import dayjs from 'dayjs';
import {
  getRandomInteger,
  generateId,
  getOneRandomArrayElem,
  getSeveralRandomArrayElems,
  getRandomBoolean,
  generateRandomDate
} from '../utils.js';

const MIN_MOVIE_SCORE = 1;
const MAX_MOVIE_SCORE = 10;
const MOVIE_RATING_DECIMAL = 0.9;
const MIN_MOVIE_RUNTIME = 30;
const MAX_MOVIE_RUNTIME = 140;

const POSTERS = [
  'made-for-each-other.png',
  'popeye-meets-sinbad.png',
  'sagebrush-trail.jpg',
  'santa-claus-conquers-the-martians.jpg',
  'the-dance-of-life.jpg',
  'the-great-flamarion.jpg',
  'the-man-with-the-golden-arm.jpg',
];
const TITLES = [
  'Made For Each Other',
  'Popeye the Sailor meets Sindbad the Sailor',
  'Sagebrush Trail',
  'Santa Claus Conquers the Martians',
  'The Great Flamarion',
  'The Dance of Life',
  'The Man with the Golden Arm',
];
const ALTERNATIVE_TITLES = [
  'All time classic',
  'Released thru FILM CLASSICS',
  'A Lone Star Western',
  'Great With A Gun',
  'It\'s classic Al Capone.',
  'Glamorous! Gorgeous! Heart Breaking!',
];
const DIRECTORS = [
  'John Cromwell',
  'Otto Preminger',
  'Max Fleischer',
  'Armand Schaefer',
  'Anthony Mann',
];
const WRITERS = [
  'Joe Swerling',
  'Adolph Zukor',
  'Lindsley Parsons',
  'Anne Wiston',
  'Benjamin Glazer',
];
const ACTORS = [
  'James Stewart',
  'Carole Lombard',
  'Charles Coburn',
  'Frank Sinatra',
  'Eleanor Parker',
  'Kim Novak',
  'Erich Von Stroheim',
  'Mary Beth Hughes',
  'Hal Skelly',
  'Nancy Carroll',
];
const COUNTRIES = [
  'Finland',
  'USA',
  'Canada',
  'French',
  'Germany',
  'Australia',
];
const GENRES = [
  'Comedy',
  'Drama',
  'Cartoon',
  'Thriller',
  'Western',
  'Musical',
  'Detective',
];
const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
  'Amet autem fuga tempore!',
  'Amet distinctio error esse hic illum modi nobis nostrum officia perferendis quam quos rem repellat, voluptates?',
  'Beatae delectus incidunt magnam magni perferendis praesentium quas sequi sint?',
  'Accusantium alias assumenda atque autem beatae commodi cumque eaque harum hic id illo laboriosam molestias nostrum.',
];
const AGE_RATINGS = ['6+', '12+', '14+', '16+', '18+'];

const generateMovieId = generateId();
const generateCommentsId = generateId();
const generateMovieRating = () => getRandomInteger(MIN_MOVIE_SCORE, MAX_MOVIE_SCORE) * MOVIE_RATING_DECIMAL;
const generateMovieRuntime = () => getRandomInteger(MIN_MOVIE_RUNTIME, MAX_MOVIE_RUNTIME);
const generateMovieReleaseDate = () => dayjs(generateRandomDate()).format('DD MMMM YYYY');
const generateWatchingDate = () => dayjs(generateRandomDate()).format('YYYY/MMMM/DD HH:mm');

export const generateMovie = () => ({
  id: generateMovieId(),
  filmInfo: {
    poster: getOneRandomArrayElem(POSTERS),
    title: getOneRandomArrayElem(TITLES),
    alternativeTitle: getOneRandomArrayElem(ALTERNATIVE_TITLES),
    totalRating: generateMovieRating(),
    director: getOneRandomArrayElem(DIRECTORS),
    writers: getSeveralRandomArrayElems(WRITERS),
    actors: getSeveralRandomArrayElems(ACTORS),
    release: {
      date: generateMovieReleaseDate(),
      releaseCountry: getOneRandomArrayElem(COUNTRIES),
    },
    runtime: generateMovieRuntime(),
    genres: getSeveralRandomArrayElems(GENRES),
    description: getOneRandomArrayElem(DESCRIPTIONS),
    ageRating: getOneRandomArrayElem(AGE_RATINGS),
  },
  comments: generateCommentsId(),
  userDetails: {
    watchlist: getRandomBoolean(),
    alreadyWatched: getRandomBoolean(),
    watchingDate: generateWatchingDate(),
    favorite: getRandomBoolean(),
  },
});
