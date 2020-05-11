const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

const castTimeMinutesFormat = (value) => {
  return value < 30 ? `00` : `30`;
};

export const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours() % 24);
  const minutes = castTimeMinutesFormat(date.getMinutes());

  return `${hours}:${minutes}`;
};

export const formatDate = (date) => {
  const dateNow = castTimeFormat(date.getDate());
  const month = castTimeFormat(date.getMonth() + 1);
  const year = castTimeFormat(date.getFullYear()).slice(2);

  return `${dateNow}/${month}/${year}`;
};

export const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);
  return array[randomIndex];
};

export const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

export const shuffleArray = (array) => {
  const result = array.slice();
  result.sort(() => Math.random() - 0.5);
  return result;
};

export const getStartDate = () => new Date();

export const getRandomDate = () => {
  const targetDate = getStartDate();
  const diffValueDate = getRandomIntegerNumber(2, 15);
  const diffValueHours = getRandomIntegerNumber(0, 24);
  const diffValueMinutes = getRandomIntegerNumber(0, 60);
  targetDate.setDate(targetDate.getDate() + diffValueDate);
  targetDate.setHours(targetDate.getHours() + diffValueHours);
  targetDate.setMinutes(targetDate.getMinutes() + diffValueMinutes);

  return targetDate;
};
