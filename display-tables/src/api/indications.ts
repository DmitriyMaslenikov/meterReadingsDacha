import axios from 'axios';
import {
  ChangeIndicationInterface,
  IndicationInterface,
} from '../interfaces/indication';

export function getIndications(filter: string) {
  // console.log(23, month, year);
  return axios
    .get(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/energyMetersReadings?filter=${filter}`
    )

    .then(function (response) {
      console.log('response789', response.data);
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

// export function getIndicationDtek() {
//   return axios
//     .get(
//       `${
//         import.meta.env.VITE_BACKEND_URL
//       }/parsings?company=Orel&dataSupplier=Dtek`
//     )
//     .then(function (response) {
//       return response;
//     });
// }
