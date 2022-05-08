const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generateId = () => {
  let counter = 0;
  return () => ++counter;
};

const getOneRandomArrayElem = (array) => array[getRandomInteger(0, array.length - 1)];

const getSeveralRandomArrayElems = (array) => {
  const getElem = () => getOneRandomArrayElem(array);
  const arrayLength = () => getRandomInteger(1, array.length - 1);
  return Array.from({length: arrayLength()}, getElem);
};

const getRandomBoolean = () => Boolean(getRandomInteger(0, 1));

export { getRandomInteger, generateId, getOneRandomArrayElem, getSeveralRandomArrayElems, getRandomBoolean };
