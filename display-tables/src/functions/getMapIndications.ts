import { AxiosResponse } from 'axios';
import { InputCircuitBreakerEnergyInterface } from '../interfaces/inputCircuitBreakerEnergyInterface';

export const GetMapIndications = async (
  indications: AxiosResponse<any, any>,
  startDay: string
) => {
  const oneDay = 1000 * 60 * 60 * 24;
  const startDayMs = Date.parse(`${startDay} 00:00:00 GMT`);

  const indicationsMap = new Map();

  indications.data.forEach((elem: InputCircuitBreakerEnergyInterface) => {
    const dayMs = Date.parse(`${elem.day} 00:00:00 GMT`);

    const key = (dayMs - startDayMs) / oneDay;

    indicationsMap.set(key, {
      day: elem.day,
      energyDay: elem.energyDay,
      energyNight: elem.energyNight,
    });
  });

  return indicationsMap;
  // startDay: indicationsMap.get(0).day,
  // andtDay: indicationsMap.get(indications.data.length - 1),
};
