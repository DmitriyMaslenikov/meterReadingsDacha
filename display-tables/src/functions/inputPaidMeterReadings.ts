import { getPaidMeterReadings } from '../api/inputPaidMeterReadings';
import { InputPaidMeterReadingsInterface } from '../interfaces/inputPaidMeterReadingsInterface';
import { GetDateStartStr } from './getDateStartStr';

export const InputPaidMeterReadings = async () => {
  const dateStart = GetDateStartStr(250);
  const inputPaidMeterReadings = await getPaidMeterReadings(
    `date||$gt||${dateStart.dateStartStr}`
  );

  let inputPaidMeterReading: InputPaidMeterReadingsInterface = {
    id: '',
    date: '',

    paidMeterReadingsDay: 0,
    paidMeterReadingsNight: 0,
    rateDay: 0,
    rateNight: 0,
    paymentAmount: 0,
  };
  let dateMaxMS = dateStart.daeStarMs;
  if (inputPaidMeterReadings.data.length !== 0) {
    inputPaidMeterReadings.data.forEach(
      (elem: InputPaidMeterReadingsInterface) => {
        if (Date.parse(`${elem.date} 00:00:00 GMT`) > dateMaxMS) {
          dateMaxMS = Date.parse(`${elem.date} 00:00:00 GMT`);
          inputPaidMeterReading = {
            id: elem.id,
            date: elem.date,
            paidMeterReadingsDay: elem.paidMeterReadingsDay,
            paidMeterReadingsNight: elem.paidMeterReadingsNight,
            rateDay: elem.rateDay,
            rateNight: elem.rateNight,
            paymentAmount: elem.paymentAmount,
          };
        }
      }
    );
  }

  return inputPaidMeterReading;
};
