import { GetDateStr } from './getDateStr';

export const GetDateStartStr = (interval: number) => {
  const date = new Date();
  const dayMs = 24 * 60 * 60 * 1000;
  const dateStr = GetDateStr(date);
  const dateMs = Date.parse(`${dateStr} 00:00:00 GMT`);
  const daeStarMs = dateMs - dayMs * interval;
  const dateStart = new Date(daeStarMs);
  const dateStartStr = GetDateStr(dateStart);

  return { dateStartStr, daeStarMs };
};
