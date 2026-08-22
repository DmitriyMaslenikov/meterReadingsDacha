import {
  getDayAndTimeAllResponse,
  MqttResponseInterface,
} from '../api/mqttResponse';

/**
 * Прибор отвечает по MQTT асинхронно, поэтому после публикации запроса
 * опрашиваем бэкенд, пока не появится ответ свежее предыдущего.
 */
export const WaitForDayAndTimeAllResponse = async (
  previousReceivedAt: number | null,
  timeoutMs = 15000,
  intervalMs = 700
): Promise<MqttResponseInterface | null> => {
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    const current = await getDayAndTimeAllResponse();

    if (current.receivedAt && current.receivedAt !== previousReceivedAt) {
      return current;
    }

    await new Promise((resolve) => setTimeout(resolve, intervalMs));
  }

  return null;
};
