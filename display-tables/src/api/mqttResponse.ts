import axios from 'axios';

export interface MqttResponseInterface {
  /** Метка времени сервера. null — прибор ещё ни разу не отвечал. */
  receivedAt: number | null;
  payload: any;
}

export function getDayAndTimeAllResponse(): Promise<MqttResponseInterface> {
  return axios
    .get(`${import.meta.env.VITE_BACKEND_URL}/mqttResponse/dayAndTimeAll`)
    .then((response) => response.data);
}
