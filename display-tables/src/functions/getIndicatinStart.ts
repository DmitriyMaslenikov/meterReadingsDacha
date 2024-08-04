import { getIndications } from '../api/indications';
import { EnergyMeterReadingsInterface } from '../interfaces/energyMeterReadingsInterface';
import { AddZero } from './addZero';

export const GetIndicatinStart = async () => {
  const date = new Date();

  const dayMs = 24 * 60 * 60 * 1000;

  const dateStr = `${date.getFullYear()}-${AddZero(
    date.getMonth() + 1
  )}-${AddZero(date.getDate())}`;
  const dateMs = Date.parse(`${dateStr} 00:00:00 GMT`);
  const daeStarMs = dateMs - dayMs * 90;
  const dateStart = new Date(daeStarMs);

  const dateStartStr = `${dateStart.getFullYear()}-${AddZero(
    dateStart.getMonth() + 1
  )}-${AddZero(dateStart.getDate())}`;
  const indication = await getIndications(`date||$gt||${dateStartStr}`);

  let energyMeterReadings: EnergyMeterReadingsInterface = {
    id: '',
    date: '',
    time: '',
    energyMeterReadingsDay: 0,
    energyMeterReadingsNight: 0,
    inputCircuitBreakerEnergy: 0,
  };
  let dateMaxMS = daeStarMs;
  if (indication.data.length !== 0) {
    indication.data.forEach((elem: EnergyMeterReadingsInterface) => {
      if (Date.parse(`${elem.date} ${elem.time} GMT`) > dateMaxMS) {
        dateMaxMS = Date.parse(`${elem.date} ${elem.time} GMT`);
        energyMeterReadings = {
          id: elem.id,
          date: elem.date,
          time: elem.time,
          energyMeterReadingsDay: elem.energyMeterReadingsDay,
          energyMeterReadingsNight: elem.energyMeterReadingsNight,
          inputCircuitBreakerEnergy: elem.inputCircuitBreakerEnergy,
        };
      }
    });
  }

  return energyMeterReadings;
};
