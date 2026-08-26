import { getInputCircuitBreakerEnergysRange } from '../api/inputCircuitBreakerEnergy';
import { InputCircuitBreakerEnergyInterface } from '../interfaces/inputCircuitBreakerEnergyInterface';
import { AddZero } from './addZero';

/**
 * Показания счетчика ввода на границах тарифных зон:
 * energyDay — показание в 07:00, energyNight — показание в 23:00 того же дня.
 */
export interface EnergyReading {
  energyDay: number;
  energyNight: number;
}

export interface DailyConsumptionInterface {
  date: string;
  dayOfMonth: number;
  /** Потребление с 07:00 до 23:00. */
  energyDay: number;
  /** Потребление с 23:00 до 07:00 следующего дня. */
  energyNight: number;
  energyTotal: number;
  amountDay: number;
  amountNight: number;
  amountTotal: number;
  /** Нет строки в базе или счетчик не передал показания. */
  hasDay: boolean;
  hasNight: boolean;
}

const Round2 = (value: number) => Math.round(value * 100) / 100;

export const DateStr = (year: number, month: number, day: number) =>
  `${year}-${AddZero(month)}-${AddZero(day)}`;

export const DaysInMonth = (year: number, month: number) =>
  new Date(year, month, 0).getDate();

/** День недели с понедельника: 0 — Пн, 6 — Вс. */
export const FirstWeekdayOfMonth = (year: number, month: number) =>
  (new Date(year, month - 1, 1).getDay() + 6) % 7;

/**
 * Показания за месяц плюс первое число следующего — оно нужно,
 * чтобы закрыть ночь последнего дня месяца.
 */
export const LoadEnergyReadings = async (
  year: number,
  month: number,
  device = 'inputCircuitBreaker'
) => {
  const dayStart = DateStr(year, month, 1);
  const nextMonth = month === 12 ? 1 : month + 1;
  const nextYear = month === 12 ? year + 1 : year;
  const dayEnd = DateStr(nextYear, nextMonth, 1);

  const rows: InputCircuitBreakerEnergyInterface[] =
    await getInputCircuitBreakerEnergysRange(dayStart, dayEnd, device);

  const readings = new Map<string, EnergyReading>();
  rows.forEach((row) => {
    readings.set(row.day, {
      energyDay: Number(row.energyDay),
      energyNight: Number(row.energyNight),
    });
  });

  return readings;
};

export const DailyConsumption = (
  readings: Map<string, EnergyReading>,
  year: number,
  month: number,
  dayRate: number,
  nightRate: number
): DailyConsumptionInterface[] => {
  const days: DailyConsumptionInterface[] = [];

  for (let dayOfMonth = 1; dayOfMonth <= DaysInMonth(year, month); dayOfMonth++) {
    const date = DateStr(year, month, dayOfMonth);
    const current = readings.get(date);
    const next =
      dayOfMonth < DaysInMonth(year, month)
        ? readings.get(DateStr(year, month, dayOfMonth + 1))
        : readings.get(
            DateStr(
              month === 12 ? year + 1 : year,
              month === 12 ? 1 : month + 1,
              1
            )
          );

    // Нулевое показание означает, что счетчик за этот срез ничего не передал.
    const hasDay = Boolean(current && current.energyDay && current.energyNight);
    const hasNight = Boolean(current && current.energyNight && next?.energyDay);

    const energyDay = hasDay
      ? Math.max(0, Round2(current!.energyNight - current!.energyDay))
      : 0;
    const energyNight = hasNight
      ? Math.max(0, Round2(next!.energyDay - current!.energyNight))
      : 0;

    const amountDay = Round2(energyDay * dayRate);
    const amountNight = Round2(energyNight * nightRate);

    days.push({
      date,
      dayOfMonth,
      energyDay,
      energyNight,
      energyTotal: Round2(energyDay + energyNight),
      amountDay,
      amountNight,
      amountTotal: Round2(amountDay + amountNight),
      hasDay,
      hasNight,
    });
  }

  return days;
};

export const MonthTotals = (days: DailyConsumptionInterface[]) => {
  const totals = days.reduce(
    (acc, day) => ({
      energyDay: acc.energyDay + day.energyDay,
      energyNight: acc.energyNight + day.energyNight,
      amountTotal: acc.amountTotal + day.amountTotal,
      daysWithData: acc.daysWithData + (day.hasDay || day.hasNight ? 1 : 0),
    }),
    { energyDay: 0, energyNight: 0, amountTotal: 0, daysWithData: 0 }
  );

  return {
    energyDay: Round2(totals.energyDay),
    energyNight: Round2(totals.energyNight),
    energyTotal: Round2(totals.energyDay + totals.energyNight),
    amountTotal: Round2(totals.amountTotal),
    daysWithData: totals.daysWithData,
  };
};
