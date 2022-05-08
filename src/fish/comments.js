import {generateId, generateRandomDate, getOneRandomArrayElem} from '../utils.js';
import dayjs from 'dayjs';

const EMOTIONS = ['angry', 'puke', 'sleeping', 'smile'];
const COMMENT_AUTHORS = [
  'Ivan Kek',
  'Monk Fish',
  'Sebastian Lol',
  'Book Worm',
];
const COMMENTS = [
  'a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.',
  'a true masterpiece.',
  'post-credit scene was just amazing omg.',
  'a true masterpiece, post-credit scene was just amazing omg.',
];

const generateCommentId = generateId();
const generateCommentDate = () => dayjs(generateRandomDate()).format('YYYY/MMMM/DD HH:mm');

export const generateComment = () => ({
  id: generateCommentId(),
  author: getOneRandomArrayElem(COMMENT_AUTHORS),
  comment: getOneRandomArrayElem(COMMENTS),
  date: generateCommentDate(),
  emotion: getOneRandomArrayElem(EMOTIONS),
});
