export const CalculationOfPaymentIndications = (
  estimatedPaymentAmount: number,
  calculatedMeterReadingsDay: number,
  calculatedMeterReadingsNight: number,
  calculatedPaymentAmountDay: number,
  calculatedPaymentAmountNight: number
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
  if (difference > calculatedPaymentAmountNight) {
    indicationDay += Math.round(difference / calculatedPaymentAmountDay);
  } else {
    indicationNight += Math.round(difference / calculatedPaymentAmountNight);
  }

  console.log('indications', indicationDay, indicationNight, paymentAmount);
  return { indicationDay, indicationNight };
};
