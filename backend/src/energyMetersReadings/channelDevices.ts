/**
 * Каналы ответа /energy/responseDayAndTimeAll и устройства, которым они
 * соответствуют в таблице посуточных показаний.
 */
export const CHANNEL_DEVICES: Record<string, string> = {
  energy1: 'inputCircuitBreaker',
  energy2: 'dinSmartRelay',
  energy3: 'smartPlug1Energy',
  energy4: 'smartPlug2Energy',
  energy5: 'smartPlug3Energy',
  energy6: 'bedroomHeatingRelayEnergy',
  energy7: 'kitchenHeatingRelayEnergy',
  energy8: 'heatingRelayTopEnergy',
  energy9: 'hallHeatingRelayEnergy',
};

/** Срезы, по которым считается день и ночь. */
export const SLICE_DAY = '07:00';
export const SLICE_NIGHT = '23:00';
