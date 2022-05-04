import { getRandomInteger } from '../utils.js';

const getRandomElement = (values) => {
  const randomIndex = getRandomInteger(0, values.length - 1);
  return values[randomIndex];
};

const commentEmotions = ['smile', 'sleeping', 'puke', 'angry'];
const posters = ['made-for-each-other.png', 'popeye-meets-sinbad.png', 'sagebrush-trail.jpg'];
const titles = ['the great flamarion', 'the dance of life', 'the man with the golden arm'];
const descriptions = [
  'Lorem ipsum dolor sit. Nunc fermentum tortor ac porta dapibus.',
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
  'Aliquam erat volutpat. In rutrum ac purus sit amet tempus.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
];
const comments = [
  {
    id: 1,
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
  {
    id: 3,
    author: 'Helena',
    comment: 'hello',
    date: '2020-05-11T16:12:32.554Z',
    emotion: getRandomElement(commentEmotions),
  },
  {
    id: 4,
    author: 'Oleg',
    comment: 'kek',
    date: '2020-05-11T16:12:32.554Z',
    emotion: getRandomElement(commentEmotions),
  },
  {
    id: 5,
    author: 'Anastasia',
    comment: 'lol',
    date: '2020-05-11T16:12:32.554Z',
    emotion: getRandomElement(commentEmotions),
  },
];

export const generateMovie = () => ({
  id: 0,
  filmInfo: {
    poster: `${getRandomElement(posters)}`,
    title: getRandomElement(titles),
    alternativeTitle: 'Laziness Who Sold Themselves',
    totalRating: getRandomInteger(1, 10) * 0.9,
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
    genres: [
      'Comedy',
    ],
    description: getRandomElement(descriptions),
    ageRating: 0,
  },
  comments: comments.slice(0, getRandomInteger(0, comments.length)),
  userDetails: {
    watchlist: Boolean(getRandomInteger(0, 1)),
    alreadyWatched: Boolean(getRandomInteger(0, 1)),
    watchingDate: '2019-04-12T16:12:32.554Z',
    favorite: Boolean(getRandomInteger(0, 1)),
  },
});
