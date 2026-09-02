/**
 * Потребители, которые ведёт программа. Отсюда строятся вкладки и по этому же
 * списку ищутся пропуски в посуточных показаниях.
 */
export interface DeviceInfo {
  /** Имя устройства в базе и в запросах /energy/days. */
  device: string;
  /** Канал в ответе /energy/responseDayAndTimeAll. */
  channel: string;
  tabLabel: string;
  meterTitle: string;
  meterLabel: string;
  calendarTitle: string;
  /** Множитель единиц: часть счётчиков отдаёт ватт-часы. */
  factor?: number;
}

export const DEVICES: DeviceInfo[] = [
  {
    device: 'dinSmartRelay',
    channel: 'energy2',
    tabLabel: 'Баня',
    meterTitle: 'Счётчик бани',
    meterLabel: 'Автомат Баня',
    calendarTitle: 'Календарь потребления бани',
  },
  {
    device: 'smartPlug1Energy',
    channel: 'energy3',
    tabLabel: 'Розетка 1',
    meterTitle: 'Счётчик розетки 1',
    meterLabel: 'Розетка1',
    calendarTitle: 'Календарь потребления розетки 1',
  },
  {
    device: 'smartPlug2Energy',
    channel: 'energy4',
    tabLabel: 'Розетка 2',
    meterTitle: 'Счётчик розетки 2',
    meterLabel: 'Розетка2',
    calendarTitle: 'Календарь потребления розетки 2',
    factor: 0.001,
  },
  {
    device: 'smartPlug3Energy',
    channel: 'energy5',
    tabLabel: 'Розетка 3',
    meterTitle: 'Счётчик розетки 3',
    meterLabel: 'Розетка 3',
    calendarTitle: 'Календарь потребления розетки 3',
    factor: 0.001,
  },
  {
    device: 'bedroomHeatingRelayEnergy',
    channel: 'energy6',
    tabLabel: 'Спальня',
    meterTitle: 'Обогрев спальни',
    meterLabel: 'Реле обогрева спальня',
    calendarTitle: 'Календарь потребления обогрева спальни',
  },
  {
    device: 'kitchenHeatingRelayEnergy',
    channel: 'energy7',
    tabLabel: 'Кухня',
    meterTitle: 'Обогрев кухни',
    meterLabel: 'Реле обогрева кухня',
    calendarTitle: 'Календарь потребления обогрева кухни',
  },
  {
    device: 'heatingRelayTopEnergy',
    channel: 'energy8',
    tabLabel: 'Верх',
    meterTitle: 'Обогрев верха',
    meterLabel: 'Реле обогрева верх',
    calendarTitle: 'Календарь потребления обогрева верха',
  },
  {
    device: 'hallHeatingRelayEnergy',
    channel: 'energy9',
    tabLabel: 'Зал',
    meterTitle: 'Обогрев зала',
    meterLabel: 'Реле обогрева зал',
    calendarTitle: 'Календарь потребления обогрева зала',
  },
];

/** Вводной автомат живёт на главной вкладке, но в поиске пропусков участвует. */
export const INPUT_CIRCUIT_BREAKER = 'inputCircuitBreaker';

export const ALL_DEVICES = [
  INPUT_CIRCUIT_BREAKER,
  ...DEVICES.map((item) => item.device),
];
