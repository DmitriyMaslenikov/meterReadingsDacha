import { IndicationInterface } from '../interfaces/indication';
import { IndicationsCalculatedInterface } from '../interfaces/indicationsCalculatedInterface';
import { InputPaidMeterReadingsInterface } from '../interfaces/inputPaidMeterReadingsInterface';

const Round2 = (value: number) => Math.round(value * 100) / 100;

/** Текущие (расчетные) показания счетчика: последние показания + добор по счетчику ввода. */
export function CurrentReadings(
  indication: IndicationInterface,
  indicationsCalculated: IndicationsCalculatedInterface
) {
  return {
    day:
      Number(indication.energyMeterReadingsDay) +
      Number(indicationsCalculated.energyDay),
    night:
      Number(indication.energyMeterReadingsNight) +
      Number(indicationsCalculated.energyNight),
  };
}

/** Сумма к оплате по текущим показаниям с учетом уже оплаченных. */
export function PaymentTotals(
  indication: IndicationInterface,
  indicationsCalculated: IndicationsCalculatedInterface,
  inputPaidMeterReadings: InputPaidMeterReadingsInterface,
  dayRate: number,
  nightRate: number
) {
  const readings = CurrentReadings(indication, indicationsCalculated);

  const amountDay = Round2(
    (readings.day - Number(inputPaidMeterReadings.paidMeterReadingsDay)) *
      dayRate
  );
  const amountNight = Round2(
    (readings.night - Number(inputPaidMeterReadings.paidMeterReadingsNight)) *
      nightRate
  );

  return {
    readingDay: readings.day,
    readingNight: readings.night,
    consumedDay: Round2(
      readings.day - Number(inputPaidMeterReadings.paidMeterReadingsDay)
    ),
    consumedNight: Round2(
      readings.night - Number(inputPaidMeterReadings.paidMeterReadingsNight)
    ),
    amountDay,
    amountNight,
    amountTotal: Round2(amountDay + amountNight),
  };
}
