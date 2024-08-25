import axios from 'axios';
import { IndicationInterface } from '../interfaces/indication';

export function getIndications(filter: string) {
  return axios
    .get(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/energyMetersReadings?filter=${filter}`
    )

    .then(function (response) {
      return response;
    });
}

export function createRowIndication({
  dataIndication,
}: {
  dataIndication: IndicationInterface;
}) {
  return axios
    .post(
      `${import.meta.env.VITE_BACKEND_URL}/energyMetersReadings`,
      dataIndication
    )
    .then((res) => res.data);
}

export function getInputCircuitBreakerEnergy({
  date,
  time,
  topic,
}: {
  date: string;
  time: string;
  topic: string;
}) {
  return axios
    .post(
      `${import.meta.env.VITE_BACKEND_URL}/mqttRequest`,

      {
        topic: topic,
        date: date,
        time: time,
      }
    )
    .then((res) => res.data);
}
