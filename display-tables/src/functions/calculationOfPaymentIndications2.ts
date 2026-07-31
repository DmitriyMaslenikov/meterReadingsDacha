import { InputPaidMeterReadingsInterface } from '../interfaces/inputPaidMeterReadingsInterface';

export const CalculationOfPaymentIndications = (
  estimatedPaymentAmount: number,
  calculatedMeterReadingsDay: number,
  calculatedMeterReadingsNight: number,
  calculatedPaymentAmountDay: number,
  calculatedPaymentAmountNight: number,
  inputPaidMeterReadings: InputPaidMeterReadingsInterface
) => {
  console.log(
    342,
    estimatedPaymentAmount,
    calculatedMeterReadingsDay,
    calculatedMeterReadingsNight,
    calculatedPaymentAmountDay,
    calculatedPaymentAmountNight,
    inputPaidMeterReadings
  );
  let day = 0;
  let night = 0;
  let debtAmountDay =
    Math.round(
      (calculatedMeterReadingsDay -
        inputPaidMeterReadings.paidMeterReadingsDay) *
        inputPaidMeterReadings.rateDay *
        100
    ) / 100;
  let debtAmountNight =
    Math.round(
      (calculatedMeterReadingsNight -
        inputPaidMeterReadings.paidMeterReadingsNight) *
        inputPaidMeterReadings.rateNight *
        100
    ) / 100;
  // inputPaidMeterReadings.paidMeterReadingsDay = 19000;
  // inputPaidMeterReadings.paidMeterReadingsNight = 14500;
  if (debtAmountDay <= 0 && debtAmountNight <= 0) {
    day = Math.round(
      estimatedPaymentAmount /
        (calculatedPaymentAmountDay + calculatedPaymentAmountNight)
    );
    night = day;
    console.log('min && min', day, night);
  } else if (debtAmountDay <= 0) {
    if (debtAmountNight > estimatedPaymentAmount) {
      night = Math.round(estimatedPaymentAmount / calculatedPaymentAmountNight);
    } else {
      night = Math.round(
        calculatedMeterReadingsNight -
          inputPaidMeterReadings.paidMeterReadingsNight
      );
      const night_ = Math.round(
        (estimatedPaymentAmount - debtAmountNight) /
          (calculatedPaymentAmountDay + calculatedPaymentAmountNight)
      );
      night += night_;

      day = night_;
      console.log('Day00', day, night);
    }
    console.log('Day0', debtAmountDay, day, night);
  } else if (debtAmountNight <= 0) {
    // const debtAmount = debtAmountDay + debtAmountNight;
    if (debtAmountDay > estimatedPaymentAmount) {
      day = Math.round(estimatedPaymentAmount / calculatedPaymentAmountDay);
    } else {
      day = Math.round(
        calculatedMeterReadingsDay - inputPaidMeterReadings.paidMeterReadingsDay
      );
      const day_ = Math.round(
        (estimatedPaymentAmount - debtAmountDay) /
          (calculatedPaymentAmountDay + calculatedPaymentAmountNight)
      );
      day += day_;

      night = day_;
      console.log('Night00', day, night);
    }
    console.log(
      'Night0',
      debtAmountDay,
      day,
      night,
      calculatedMeterReadingsDay,
      inputPaidMeterReadings.paidMeterReadingsDay,
      Math.round(
        calculatedMeterReadingsDay - inputPaidMeterReadings.paidMeterReadingsDay
      )
    );
  } else {
    const debtAmount = debtAmountDay + debtAmountNight;
    const paymentCoefficient = estimatedPaymentAmount / debtAmount;

    const dayNightFactor =
      (calculatedMeterReadingsDay -
        inputPaidMeterReadings.paidMeterReadingsDay) /
      (calculatedMeterReadingsNight -
        inputPaidMeterReadings.paidMeterReadingsNight);
    night = Math.round(
      estimatedPaymentAmount /
        (dayNightFactor * calculatedPaymentAmountDay +
          calculatedPaymentAmountNight)
    );
    day = Math.round(night * dayNightFactor);

    console.log('END', debtAmount, dayNightFactor, day, night);
  }
  // const debtAmount =
  //   Math.round(
  //     (calculatedMeterReadingsDay -
  //       inputPaidMeterReadings.paidMeterReadingsDay) *
  //       inputPaidMeterReadings.rateDay *
  //       100
  //   ) /
  //     100 +
  //   Math.round(
  //     (calculatedMeterReadingsNight -
  //       inputPaidMeterReadings.paidMeterReadingsNight) *
  //       inputPaidMeterReadings.rateNight *
  //       100
  //   ) /
  //     100;

  // const paymentCoefficient = estimatedPaymentAmount / debtAmount;
  const dayNightFactor =
    (calculatedMeterReadingsDay - inputPaidMeterReadings.paidMeterReadingsDay) /
    (calculatedMeterReadingsNight -
      inputPaidMeterReadings.paidMeterReadingsNight);
  // night =
  //   estimatedPaymentAmount /
  //   (dayNightFactor * calculatedPaymentAmountDay +
  //     calculatedPaymentAmountNight);

  let paymentAmount =
    day * calculatedPaymentAmountDay + night * calculatedPaymentAmountNight;
  let differenceInAmounts = estimatedPaymentAmount - paymentAmount;
  console.log('DS', paymentAmount, differenceInAmounts, day);
  if (Math.abs(differenceInAmounts) > calculatedPaymentAmountDay) {
    day += Math.floor(differenceInAmounts / calculatedPaymentAmountDay);
    paymentAmount +=
      Math.floor(differenceInAmounts / calculatedPaymentAmountDay) *
      calculatedPaymentAmountDay;
    differenceInAmounts = estimatedPaymentAmount - paymentAmount;
    console.log('DSN', paymentAmount, differenceInAmounts, day);
  }
  if (Math.abs(differenceInAmounts) > calculatedPaymentAmountNight) {
    night += 1 * Math.sign(differenceInAmounts);
    paymentAmount =
      day * calculatedPaymentAmountDay + night * calculatedPaymentAmountNight;
    differenceInAmounts = estimatedPaymentAmount - paymentAmount;
    console.log('DSN2', paymentAmount, differenceInAmounts, day, night);
  }
  if (
    Math.abs(differenceInAmounts) >= calculatedPaymentAmountNight / 2 &&
    Math.abs(differenceInAmounts) < calculatedPaymentAmountNight
  ) {
    night += 1 * Math.sign(differenceInAmounts);
    paymentAmount =
      day * calculatedPaymentAmountDay + night * calculatedPaymentAmountNight;
    console.log('DSN3', paymentAmount, differenceInAmounts, day, night);
  }
  console.log('DSN4', paymentAmount, differenceInAmounts, day, night);
  const indicationDay = day;
  const indicationNight = night;
  // const paymentAmount =
  //   indicationDay * calculatedPaymentAmountDay +
  //   indicationNight * calculatedPaymentAmountNight;
  // const difference = estimatedPaymentAmount - paymentAmount;

  // indicationNight += Math.round(difference / calculatedPaymentAmountNight);

  console.log('indication2', indicationDay, indicationNight);

  return {
    indicationDay:
      indicationDay + Number(inputPaidMeterReadings.paidMeterReadingsDay),
    indicationNight:
      indicationNight + Number(inputPaidMeterReadings.paidMeterReadingsNight),
  };
};
