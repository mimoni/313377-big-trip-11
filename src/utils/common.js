import moment from 'moment';

// const castTimeFormat = (value) => {
//   return value < 10 ? `0${value}` : String(value);
// };
//
// const castTimeMinutesFormat = (value) => {
//   return value < 30 ? `00` : `30`;
// };

export const formatTime = (date) => {
  return moment(date).format(`hh:mm`);
};

export const formatDate = (date) => {
  return moment(date).format(`DD/MM/YY hh:mm`);
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

export const getCapitalizeFirstLetter = (value) => {
  if (typeof value !== `string`) {
    return ``;
  }
  return value[0].toUpperCase() + value.slice(1);
};

export const getDuration = (start, end) => {
  const durationTime = moment(moment(end).diff(start));
  const day = durationTime.format(`DD`);
  const hour = durationTime.format(`HH`);
  const min = durationTime.format(`mm`);
  return `${day}D ${hour}H ${min}M`;
};
