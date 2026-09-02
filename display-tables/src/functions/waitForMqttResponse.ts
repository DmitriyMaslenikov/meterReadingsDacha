import {
  getDayAndTimeAllResponse,
  getDaysResponse,
  MqttResponseInterface,
} from '../api/mqttResponse';

/** Опрашивает бэкенд, пока не появится ответ свежее предыдущего. */
const WaitForFreshResponse = async (
  read: () => Promise<MqttResponseInterface>,
  previousReceivedAt: number | null,
  timeoutMs: number,
  intervalMs: number
): Promise<MqttResponseInterface | null> => {
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    const current = await read();

    if (current.receivedAt && current.receivedAt !== previousReceivedAt) {
      return current;
    }

    await new Promise((resolve) => setTimeout(resolve, intervalMs));
  }

  return null;
};

/** Ответ openhab на запрос диапазона дней (/energy/days). */
export const WaitForDaysResponse = (
  previousReceivedAt: number | null,
  // Ждём заметно дольше, чем отвечает openhab: опоздавший ответ бэкенд
  // отбросит, то есть цена долгого ожидания — пропуск дня, а не порча серии.
  timeoutMs = 45000,
  intervalMs = 700
) =>
  WaitForFreshResponse(
    getDaysResponse,
    previousReceivedAt,
    timeoutMs,
    intervalMs
  );

/**
 * Прибор отвечает по MQTT асинхронно, поэтому после публикации запроса
 * опрашиваем бэкенд, пока не появится ответ свежее предыдущего.
 */
export const WaitForDayAndTimeAllResponse = (
  previousReceivedAt: number | null,
  timeoutMs = 15000,
  intervalMs = 700
) =>
  WaitForFreshResponse(
    getDayAndTimeAllResponse,
    previousReceivedAt,
    timeoutMs,
    intervalMs
  );
