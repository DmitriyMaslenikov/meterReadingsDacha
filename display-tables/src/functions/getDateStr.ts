import { AddZero } from './addZero';

export const GetDateStr = (date: Date) => {
  return `${date.getFullYear()}-${AddZero(date.getMonth() + 1)}-${AddZero(
    date.getDate()
  )}`;
};
