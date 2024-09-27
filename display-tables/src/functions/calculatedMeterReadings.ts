import { InputCircuitBreakerEnergyInterface } from '../interfaces/inputCircuitBreakerEnergyInterface';
import { GetMapIndications } from './getMapIndications';
import { GetAndData } from './getAndData';
import { EnergyMeterReadingsInterface } from '../interfaces/energyMeterReadingsInterface';
import { getInputCircuitBreakerEnergys } from '../api/inputCircuitBreakerEnergy';

export const CalculatedMeterReadings = async (
  indications: EnergyMeterReadingsInterface
) => {
  const startDay: string = indications.date;
  const startTime: string = indications.time;
  const startEnergy: number = indications.inputCircuitBreakerEnergy;
  const inputCircuitBreakerEnergys = await getInputCircuitBreakerEnergys(
    `day||$gte||${indications.date}`
  );
  const mapIndications = GetMapIndications(
    inputCircuitBreakerEnergys,
    indications.date
  );
  const andData = GetAndData(mapIndications);

  const andDay = andData?.day ? andData?.day : '';
  const andTime = andData?.time ? andData?.time : '';
  const andEnergy = andData?.energy ? andData?.energy : 0;

  const periodOfTime = (startTime: string) => {
    let ret = '';
    const minute = (time: string) => {
      return Number(time.split(':')[0]) * 60 + Number(time.split(':')[1]);
    };
    if (minute(startTime) - 7 * 60 < 0) {
      ret = 'night1';
    } else if (minute(startTime) - 23 * 60 >= 0) {
      ret = 'night2';
    } else {
      ret = 'day';
    }
    return ret;
  };

  const oneDay = 1000 * 60 * 60 * 24;
  const startDayMs = Date.parse(`${startDay} 00:00:00 GMT`);
  const andDayMs = Date.parse(`${andDay} 00:00:00 GMT`);
  const keyAnd = (andDayMs - startDayMs) / oneDay;
  const indicationsMap = new Map();
  let energyDay = 0;
  let energyNight = 0;

  //console.log('dateTime', dateTime);

  //console.log('getInputCircuitBreakerEnergysAll', indications);

  inputCircuitBreakerEnergys.data.forEach(
    (elem: InputCircuitBreakerEnergyInterface) => {
      const dayMs = Date.parse(`${elem.day} 00:00:00 GMT`);

      const key = (dayMs - startDayMs) / oneDay;
      if (key >= 0 && key <= keyAnd) {
        // console.log('elem', elem.day, key);
        indicationsMap.set(key, {
          day: elem.day,
          energyDay: elem.energyDay,
          energyNight: elem.energyNight,
        });
      }
    }
  );

  // console.log('indicationsMap.size', indicationsMap, startDay);
  if (indicationsMap.size === 1) {
    // console.log('periodOfTime', periodOfTime(startTime), periodOfTime(andTime));
    const a = `${periodOfTime(startTime)}-${periodOfTime(andTime)}`;
    switch (a) {
      case 'night1-night1':
        // console.log('Старт до 7 утра, конец до 7 утра', a);
        energyNight = andEnergy - startEnergy;
        break;
      case 'night1-day':
        // console.log('Старт до 7 утра, конец с 7 утра до 23', a);
        energyNight = indicationsMap.get(0).energyDay - startEnergy;
        energyDay = andEnergy - indicationsMap.get(0).energyDay;
        break;
      case 'night1-night2':
        // console.log('Старт до 7 утра, после 23', a);
        energyNight = indicationsMap.get(0).energyDay - startEnergy;
        energyDay =
          indicationsMap.get(0).energyNight - indicationsMap.get(0).energyDay;
        energyNight += andEnergy - indicationsMap.get(0).energyNight;
        break;
      case 'day-day':
        // console.log('Старт  с 7 утра до 23, конец с 7 утра до 23', a);
        energyDay = andEnergy - startEnergy;
        break;
      case 'day-night2':
        // console.log('Старт  с 7 утра до 23, конец после 23', a);
        energyDay = indicationsMap.get(0).energyNight - startEnergy;
        energyNight = andEnergy - indicationsMap.get(0).energyNight;
        break;
      case 'night2-night2':
        // console.log('Старт после 23, конец после 23', a);
        energyNight = andEnergy - startEnergy;
        break;
    }
  } else {
    switch (periodOfTime(startTime)) {
      case 'night1':
        // console.log('Старт  до 7 утра', periodOfTime(startTime));
        energyNight = indicationsMap.get(0).energyDay - startEnergy;
        energyDay =
          indicationsMap.get(0).energyNight - indicationsMap.get(0).energyDay;

        break;
      case 'day':
        //console.log('Старт   с 7 утра до 23', periodOfTime(startTime));
        energyDay = indicationsMap.get(0).energyNight - startEnergy;
        // console.log(
        //   'Day1-1',
        //   energyDay,
        //   indicationsMap.get(0).energyNight,
        //   startEnergy
        // );
        break;
      case 'night2':
        // console.log('Старт  после 23', periodOfTime(startTime));
        energyNight = indicationsMap.get(0).energyNight - startEnergy;

        break;
    }
    // console.log('Day1', energyDay, energyNight);
    if (indicationsMap.size > 2) {
      for (let i = 1; i < indicationsMap.size - 1; i++) {
        const element = indicationsMap.get(i);

        energyDay += element.energyNight - element.energyDay;

        energyNight +=
          element.energyDay - indicationsMap.get(i - 1).energyNight;
      }
    }
    switch (periodOfTime(andTime)) {
      case 'night1':
        // console.log('Конец до 7 утра', periodOfTime(startTime));
        energyNight +=
          andEnergy - indicationsMap.get(indicationsMap.size - 2).energyNight;

        break;
      case 'day':
        // console.log('Конец  с 7 утра до 23', periodOfTime(startTime));
        energyNight +=
          indicationsMap.get(indicationsMap.size - 1).energyDay -
          indicationsMap.get(indicationsMap.size - 2).energyNight;

        energyDay +=
          andEnergy - indicationsMap.get(indicationsMap.size - 1).energyDay;
        break;
      case 'night2':
        // console.log('Конец после 23', periodOfTime(startTime));
        energyNight +=
          indicationsMap.get(indicationsMap.size - 1).energyDay -
          indicationsMap.get(indicationsMap.size - 2).energyNight;

        energyDay +=
          indicationsMap.get(indicationsMap.size - 1).energyNight -
          indicationsMap.get(indicationsMap.size - 1).energyDay;
        energyNight +=
          andEnergy - indicationsMap.get(indicationsMap.size - 1).energyNight;

        break;
    }
  }
  // console.log('indicationsMap', indicationsMap, energyDay, energyNight, andDay);
  return {
    date: andDay,
    time: andTime,
    energyDay: energyDay,
    energyNight: energyNight,
  };
};
