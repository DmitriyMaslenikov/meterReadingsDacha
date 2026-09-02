export interface InputCircuitBreakerEnergyInterface {
  id: string;
  day: string;
  /** Устройство, к которому относится строка. */
  device: string;
  energyDay: number;
  energyNight: number;
}
