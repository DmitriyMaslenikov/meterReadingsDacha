import { createRowPaidMeterReadings } from '../api/inputPaidMeterReadings';
import { InputPaidMeterReadingsInterface } from '../interfaces/inputPaidMeterReadingsInterface';
import { v4 as uuidv4 } from 'uuid';

export const CreateRowPaidMeterReadings = async (
  value: InputPaidMeterReadingsInterface
) => {
  const dataPaidMeterReadings: InputPaidMeterReadingsInterface = {
    id: uuidv4(),
    date: value.date,
    paidMeterReadingsDay: value.paidMeterReadingsDay,
    paidMeterReadingsNight: value.paidMeterReadingsNight,
    rateDay: value.rateDay,
    rateNight: value.rateNight,
    paymentAmount: value.paymentAmount,
  };
  console.log('dataPaidMeterReadings', dataPaidMeterReadings);
  await createRowPaidMeterReadings({ dataPaidMeterReadings });
};
