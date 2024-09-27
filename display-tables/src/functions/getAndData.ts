import { InputCircuitBreakerEnergyInterface } from '../interfaces/inputCircuitBreakerEnergyInterface';

export const GetAndData = (
  indicationsMap: Map<number, InputCircuitBreakerEnergyInterface>
) => {
  let data: InputCircuitBreakerEnergyInterface | undefined = indicationsMap.get(
    indicationsMap.size - 1
  );

  if (data && Number(data.energyNight) !== 0) {
    return { day: data.day, energy: data.energyNight, time: '23:00' };
  } else if (data && Number(data.energyDay) !== 0) {
    return { day: data.day, energy: data.energyDay, time: '07:00' };
  } else {
    data = indicationsMap.get(indicationsMap.size - 2);
    if (data)
      return {
        day: data.day,
        energy: data.energyNight,
        time: '23:00',
      };
  }
};
