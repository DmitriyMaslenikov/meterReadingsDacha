import { getInputCircuitBreakerEnergys } from '../api/inputCircuitBreakerEnergy';
import { InputCircuitBreakerEnergyInterface } from '../interfaces/inputCircuitBreakerEnergyInterface';
import { updateTable } from '../api/inputCircuitBreakerEnergy';
import { GetDateStartStr } from './getDateStartStr';
import { GetDateStr } from './getDateStr';
import { getDaysResponse } from '../api/mqttResponse';
import { WaitForDaysResponse } from './waitForMqttResponse';

/** Устройства, посуточную историю которых добираем у openhab. */
export const TRACKED_DEVICES = [
  'inputCircuitBreaker',
  'dinSmartRelay',
  'smartPlug1Energy',
  'smartPlug2Energy',
  'smartPlug3Energy',
  'bedroomHeatingRelayEnergy',
  'kitchenHeatingRelayEnergy',
];

/**
 * Ответ openhab не содержит имени устройства — бэкенд привязывает пришедшие дни
 * к последнему запрошенному. Поэтому следующий запрос уходит только после того,
 * как пришёл ответ на предыдущий, иначе серии перемешаются.
 */

const UpdateDevice = async (device: string) => {
  const dateStartStr = GetDateStartStr(30).dateStartStr;

  const indications = await getInputCircuitBreakerEnergys(
    `day||$gte||${dateStartStr}`,
    device
  );

  let dateStartMs = 0;

  indications.data.forEach((elem: InputCircuitBreakerEnergyInterface) => {
    const dayMs = Date.parse(`${elem.day}T00:01:00`);
    dateStartMs = dateStartMs < dayMs ? dayMs : dateStartMs;
  });

  // Если за последний месяц строк нет, начинаем с начала окна, а не с 1970 года.
  const dateUpdateStartStr =
    dateStartMs === 0 ? dateStartStr : GetDateStr(new Date(dateStartMs));

  // Конец диапазона не может быть в будущем — openhab такой запрос отклоняет.
  const dateUpdateAndStr = GetDateStartStr(0).dateStartStr;

  // Запоминаем предыдущий ответ, чтобы дождаться именно нового.
  const previous = await getDaysResponse();

  await updateTable({
    topic: '/energy/days',
    dateStart: dateUpdateStartStr,
    dateAnd: dateUpdateAndStr,
    device,
  });

  // openhab отвечает не всегда (например, если данных за период нет),
  // поэтому ожидание ограничено таймаутом внутри WaitForDaysResponse.
  return WaitForDaysResponse(previous.receivedAt);
};

export const UpdateTable = async () => {
  for (const device of TRACKED_DEVICES) {
    await UpdateDevice(device);
  }

  return {};
};
