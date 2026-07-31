// import { InputCircuitBreakerEnergyInterface } from '../interfaces/inputCircuitBreakerEnergyInterface';
import { getInputCircuitBreakerEnergys } from '../api/inputCircuitBreakerEnergy';
import { GetMapIndications } from './getMapIndications';
import { GetAndData } from './getAndData';
import { AddZero } from './addZero';

export const CalculatedEnergyConsumptionForPeriod = async (
  dayRate: number,
  nightRate: number
) => {
  const month = new Date().getMonth() + 1;
  const startDay: string = `2025-${AddZero(month)}-01`;

  const inputCircuitBreakerEnergys = await getInputCircuitBreakerEnergys(
    `day||$gte||${startDay}`
  );

  const indicationsMap = GetMapIndications(
    inputCircuitBreakerEnergys,
    startDay
  );
  const andData = GetAndData(indicationsMap);

  const andDay = andData?.day ? andData?.day : '';

  let energyDay: number = 0;
  let energyNight: number = 0;

  // console.log('inputCircuitBreakerEnergys', indicationsMap);
  if (indicationsMap.size > 1) {
    for (let i = 0; i < indicationsMap.size - 1; i++) {
      energyDay +=
        indicationsMap.get(i).energyNight - indicationsMap.get(i).energyDay;
      energyNight +=
        indicationsMap.get(i + 1).energyDay - indicationsMap.get(i).energyNight;
    }
  }
  const roundedEnergyDay = Math.round(energyDay * 100) / 100;
  const roundedEnergyNight = Math.round(energyNight * 100) / 100;
  const roundedPaymentАmount =
    Math.round(
      (roundedEnergyDay * dayRate + roundedEnergyNight * nightRate) * 100
    ) / 100;

  // console.log(
  //   'indicationsMap',
  //   indicationsMap,
  //   roundedEnergyDay,
  //   roundedEnergyNight,
  //   roundedPaymentАmount,
  //   andDay,
  //   dayRate,
  //   startDay
  // );
  return {
    dateStart: startDay,
    dateEnd: andDay,
    energyDay: roundedEnergyDay,
    energyNight: roundedEnergyNight,
    paymentАmount: roundedPaymentАmount,
  };
};
