import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import {nanoid} from 'nanoid';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generateId = () => nanoid();

const getOneRandomArrayElem = (array) => array[getRandomInteger(0, array.length - 1)];

const getSeveralRandomArrayElems = (array) => {
  const getElem = () => getOneRandomArrayElem(array);
  const arrayLength = () => getRandomInteger(1, array.length - 1);
  return Array.from({length: arrayLength()}, getElem);
};

const getRandomBoolean = () => Boolean(getRandomInteger(0, 1));

const generateRandomDate = () => new Date(
  getRandomInteger(1900, 2020),
  getRandomInteger(1, 12),
  getRandomInteger(1, 28),
  getRandomInteger(1, 23),
  getRandomInteger(1, 59)
);

const isEscapeKey = (evt) => evt.key === 'Escape';

const humanizeRuntime = (runtime) => {
  dayjs.extend(duration);
  dayjs.extend(relativeTime);
  const durationTime = dayjs.duration(runtime, 'minutes').$d;
  return `${durationTime.hours}h ${durationTime.minutes}m`;
};

export {
  getRandomInteger,
  generateId,
  getOneRandomArrayElem,
  getSeveralRandomArrayElems,
  getRandomBoolean,
  generateRandomDate,
  isEscapeKey,
  humanizeRuntime,
};
