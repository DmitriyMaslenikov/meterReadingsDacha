export interface EnergyMeterReadingsInterface {
  id: string;
  date: string;
  time: string;
  energyMeterReadingsDay: number;
  energyMeterReadingsNight: number;
  inputCircuitBreakerEnergy: number;
}
