import { getRandomInteger } from '../utils.js';

const getRandomElement = (values) => {
  const randomIndex = getRandomInteger(0, values.length - 1);
  return values[randomIndex];
};

const commentEmotions = ['smile', 'sleeping', 'puke', 'angry'];
const posters = ['made-for-each-other.png', 'popeye-meets-sinbad.png', 'sagebrush-trail.jpg'];
const titles = ['the great flamarion', 'the dance of life', 'the man with the golden arm'];
const descriptions = [
  'Lorem ipsum dolor sit.',
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
];
const comments = [
  {
    id: 42,
    author: 'Ilya O\'Reilly',
    comment: 'a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.',
    date: '2019-05-11T16:12:32.554Z',
    emotion: getRandomElement(commentEmotions),
  },
  {
    id: 2,
    author: 'Thomas',
    comment: 'boooooring',
    date: '2020-05-11T16:12:32.554Z',
    emotion: getRandomElement(commentEmotions),
  },
];

export const generateMovie = () => ({
  id: 0,
  filmInfo: {
    poster: `images/posters/${getRandomElement(posters)}`,
    title: getRandomElement(titles),
    alternativeTitle: 'Laziness Who Sold Themselves',
    totalRating: 5.3,
    director: 'Tom Ford',
    writers: [
      'Takeshi Kitano',
    ],
    actors: [
      'Morgan Freeman',
    ],
    release: {
      date: '2019-05-11T00:00:00.000Z',
      releaseCountry: 'Finland',
    },
    runtime: 77,
    genre: [
      'Comedy',
    ],
    description: getRandomElement(descriptions),
    ageRating: 0,
  },
  comments: getRandomElement(comments),
  userDetails: {
    watchlist: false,
    alreadyWatched: true,
    watchingDate: '2019-04-12T16:12:32.554Z',
    favorite: false
  },
});
