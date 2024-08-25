import { InputPaidMeterReadingsInterface } from '../interfaces/inputPaidMeterReadingsInterface';

export const CalculationOfPaymentIndications = (
  estimatedPaymentAmount: number,
  calculatedMeterReadingsDay: number,
  calculatedMeterReadingsNight: number,
  calculatedPaymentAmountDay: number,
  calculatedPaymentAmountNight: number,
  inputPaidMeterReadings: InputPaidMeterReadingsInterface
) => {
  let indicationDay = Math.round(
    (calculatedMeterReadingsDay * estimatedPaymentAmount) /
      (calculatedPaymentAmountDay * calculatedMeterReadingsDay +
        calculatedPaymentAmountNight * calculatedMeterReadingsNight)
  );
  let indicationNight = Math.round(
    (calculatedMeterReadingsNight * estimatedPaymentAmount) /
      (calculatedPaymentAmountDay * calculatedMeterReadingsDay +
        calculatedPaymentAmountNight * calculatedMeterReadingsNight)
  );
  const paymentAmount =
    indicationDay * calculatedPaymentAmountDay +
    indicationNight * calculatedPaymentAmountNight;
  const difference = estimatedPaymentAmount - paymentAmount;

  indicationNight += Math.round(difference / calculatedPaymentAmountNight);

  return {
    indicationDay:
      indicationDay + Number(inputPaidMeterReadings.paidMeterReadingsDay),
    indicationNight:
      indicationNight + Number(inputPaidMeterReadings.paidMeterReadingsNight),
  };
};
