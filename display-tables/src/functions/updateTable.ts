import { getInputCircuitBreakerEnergysRange } from '../api/inputCircuitBreakerEnergy';
import { InputCircuitBreakerEnergyInterface } from '../interfaces/inputCircuitBreakerEnergyInterface';
import { getInputCircuitBreakerEnergy } from '../api/inputCircuitBreakerEnergy';
import { getDayAndTimeAllResponse } from '../api/mqttResponse';
import { WaitForDayAndTimeAllResponse } from './waitForMqttResponse';
import { GetDateStartStr } from './getDateStartStr';
import { AddZero } from './addZero';
import { ALL_DEVICES } from './devices';

/** Срезы, по которым считаются дневное и ночное потребление. */
const SLICE_DAY = '07:00';
const SLICE_NIGHT = '23:00';

/**
 * Предел, дальше которого назад не заглядываем. Окно само сжимается до
 * последнего заполненного дня, так что при обычной работе проверяется
 * несколько дней, а не весь этот отрезок.
 */
const MAX_LOOKBACK_DAYS = 120;

/** Ограничение на один заход, чтобы после долгого простоя не уйти в сотни запросов. */
const MAX_SLICES_PER_RUN = 20;

/**
 * Столько подряд неотвеченных срезов считаем признаком того, что openhab
 * недоступен, и прекращаем добор: иначе каждая загрузка страницы висела бы
 * на бесполезных запросах до исчерпания квоты.
 */
const MAX_SILENT_SLICES = 2;

const DayStr = (date: Date) =>
  `${date.getFullYear()}-${AddZero(date.getMonth() + 1)}-${AddZero(
    date.getDate()
  )}`;

/**
 * Запрашивает у openhab показания всех счётчиков на один момент. Ответ
 * содержит дату, время и все каналы, поэтому бэкенд раскладывает его по
 * устройствам сам — сопоставлять запрос с ответом не нужно.
 */
const RequestSlice = async (date: string, time: string) => {
  const previous = await getDayAndTimeAllResponse();

  await getInputCircuitBreakerEnergy({
    topic: '/energy/dayAndTimeAll',
    date,
    time,
  });

  return WaitForDayAndTimeAllResponse(previous.receivedAt);
};

export const UpdateTable = async () => {
  const now = new Date();
  const today = DayStr(now);
  const lookbackStart = GetDateStartStr(MAX_LOOKBACK_DAYS).dateStartStr;

  const rows: InputCircuitBreakerEnergyInterface[] =
    await getInputCircuitBreakerEnergysRange(lookbackStart, today, '');

  // day -> устройства, у которых срез уже снят
  const withDay = new Map<string, Set<string>>();
  const withNight = new Map<string, Set<string>>();
  // Устройство учитываем только начиная с его первого дня: до этого
  // показаний просто не существовало, и просить их бессмысленно.
  const firstDay = new Map<string, string>();

  const remember = (map: Map<string, Set<string>>, day: string, device: string) => {
    const set = map.get(day) ?? new Set<string>();
    set.add(device);
    map.set(day, set);
  };

  rows.forEach((row) => {
    const known = firstDay.get(row.device);
    if (!known || row.day < known) {
      firstDay.set(row.device, row.day);
    }
    if (Number(row.energyDay)) {
      remember(withDay, row.day, row.device);
    }
    if (Number(row.energyNight)) {
      remember(withNight, row.day, row.device);
    }
  });

  const expected = (day: string) =>
    ALL_DEVICES.filter((device) => {
      const since = firstDay.get(device);
      return since !== undefined && day >= since;
    });

  // Идём от свежих дней к старым: актуальные показания важнее, а старая
  // дыра, которой у openhab всё равно нет, не должна занимать всю квоту.
  const missing: { date: string; time: string }[] = [];

  for (let back = 0; back <= MAX_LOOKBACK_DAYS; back++) {
    const moment = new Date();
    moment.setDate(now.getDate() - back);
    const date = DayStr(moment);

    const devices = expected(date);
    if (devices.length === 0) {
      continue;
    }

    const slicePassed = (hours: number) => back > 0 || now.getHours() >= hours;

    const hasDay = withDay.get(date) ?? new Set<string>();
    const hasNight = withNight.get(date) ?? new Set<string>();

    if (slicePassed(7) && devices.some((device) => !hasDay.has(device))) {
      missing.push({ date, time: SLICE_DAY });
    }
    if (slicePassed(23) && devices.some((device) => !hasNight.has(device))) {
      missing.push({ date, time: SLICE_NIGHT });
    }

    if (missing.length >= MAX_SLICES_PER_RUN) {
      break;
    }
  }

  // Запросы идут по одному: openhab отвечает на каждый отдельно.
  let silent = 0;

  for (const slice of missing.slice(0, MAX_SLICES_PER_RUN)) {
    const answer = await RequestSlice(slice.date, slice.time);

    if (answer) {
      silent = 0;
      continue;
    }

    silent += 1;

    if (silent >= MAX_SILENT_SLICES) {
      console.warn(
        `openhab не ответил на ${silent} среза подряд — добор прерван, продолжим при следующей загрузке`
      );
      break;
    }
  }

  return {};
};
