import { getDayAndTimeAllResponse } from '../api/mqttResponse';
import { GetInputCircuitBreakerEnergy } from './getInputCircuitBreakerEnergy';
import { WaitForDayAndTimeAllResponse } from './waitForMqttResponse';
import { AddZero } from './addZero';
import { GetDateStr } from './getDateStr';

/** Канал прибора в ответе /energy/responseDayAndTimeAll. */
export const CHANNEL_BANYA = 'energy2';

export const TimeStr = (date: Date) =>
  `${AddZero(date.getHours())}:${AddZero(date.getMinutes())}`;

export const NowDateAndTime = () => {
  const now = new Date();
  return { date: GetDateStr(now), time: TimeStr(now) };
};

/**
 * Спрашивает у openhab показание одного канала на указанный момент.
 * Возвращает null, если прибор не ответил или канала нет в ответе.
 */
export const RequestChannelReading = async (
  date: string,
  time: string,
  channel: string
): Promise<number | null> => {
  const previous = await getDayAndTimeAllResponse();

  await GetInputCircuitBreakerEnergy('/energy/dayAndTimeAll', date, time);

  const fresh = await WaitForDayAndTimeAllResponse(previous.receivedAt);
  if (!fresh) {
    return null;
  }

  const raw = fresh.payload?.[channel];
  if (raw === undefined || raw === null || raw === '') {
    return null;
  }

  const value = Number(raw);
  return Number.isNaN(value) ? null : value;
};
