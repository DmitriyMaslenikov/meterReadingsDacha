export interface InputPaidMeterReadingsInterface {
  id: string;
  date: string;
  paidMeterReadingsDay: number;
  paidMeterReadingsNight: number;
  rateDay: number;
  rateNight: number;
  paymentAmount: number;
}
