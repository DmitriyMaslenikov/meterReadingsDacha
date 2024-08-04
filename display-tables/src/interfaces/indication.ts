export interface IndicationInterface {
  id: string;
  date: string;
  time: string;
  energyMeterReadingsDay: number;
  energyMeterReadingsNight: number;
  inputCircuitBreakerEnergy: number;
}

export interface ChangeIndicationInterface {
  id: string;
  energyMeterReadingsDay?: number | undefined;
  energyMeterReadingsNight?: number | undefined;
  inputCircuitBreakerEnergy?: number | undefined;
}
