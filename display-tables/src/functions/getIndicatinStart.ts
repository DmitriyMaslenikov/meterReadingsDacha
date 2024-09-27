import { getIndications } from '../api/indications';
import { EnergyMeterReadingsInterface } from '../interfaces/energyMeterReadingsInterface';
import { GetDateStartStr } from './getDateStartStr';

export const GetIndicatinStart = async () => {
  const dateStart = GetDateStartStr(100);

  const indication = await getIndications(
    `date||$gt||${dateStart.dateStartStr}`
  );

  let energyMeterReadings: EnergyMeterReadingsInterface = {
    id: '',
    date: '',
    time: '',
    energyMeterReadingsDay: 0,
    energyMeterReadingsNight: 0,
    inputCircuitBreakerEnergy: 0,
  };
  let dateMaxMS = dateStart.daeStarMs;
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
