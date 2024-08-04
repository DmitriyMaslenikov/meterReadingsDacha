import { getPaidMeterReadings } from '../api/inputPaidMeterReadings';
import { InputPaidMeterReadingsInterface } from '../interfaces/inputPaidMeterReadingsInterface';

export const InputPaidMeterReadings = async () => {
  const inputPaidMeterReadings = await getPaidMeterReadings();

  let inputPaidMeterReading: InputPaidMeterReadingsInterface = {
    id: '',
    date: '',

    paidMeterReadingsDay: 0,
    paidMeterReadingsNight: 0,
    rateDay: 0,
    rateNight: 0,
    paymentAmount: 0,
  };
  // if (indication.data.length !== 0) {
  //   indication.data.forEach((elem: InputPaidMeterReadingsInterface) => {
  //     if (
  //       energyMeterReadings.energyMeterReadingsDay -
  //         elem.energyMeterReadingsDay <
  //         0 &&
  //       energyMeterReadings.energyMeterReadingsNight -
  //         elem.energyMeterReadingsNight <
  //         0
  //     ) {
  //       energyMeterReadings = {
  //         id: elem.id,
  //         date: elem.date,
  //         time: elem.time,
  //         energyMeterReadingsDay: elem.energyMeterReadingsDay,
  //         energyMeterReadingsNight: elem.energyMeterReadingsNight,
  //         inputCircuitBreakerEnergy: elem.inputCircuitBreakerEnergy,
  //       };
  //     }
  //   });
  // }
  //console.log('inputPaidMeterReadings', inputPaidMeterReadings);
  return inputPaidMeterReadings.data[0];
};
