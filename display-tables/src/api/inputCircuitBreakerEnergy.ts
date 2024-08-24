import axios from 'axios';

export function getInputCircuitBreakerEnergysAll() {
  return axios
    .get(`${import.meta.env.VITE_BACKEND_URL}/inputCircuitBreakerEnergy`)

    .then(function (response) {
      console.log('response', response.data);
      return response;
    });
}
export function getInputCircuitBreakerEnergys(filter: string) {
  return axios
    .get(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/inputCircuitBreakerEnergy?filter=${filter}`
    )

    .then(function (response) {
      console.log('filter', filter, import.meta.env.VITE_BACKEND_URL);
      console.log('response', response.data);
      return response;
    });
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

export function updateTable({
  dateStart,
  dateAnd,
  topic,
  device,
}: {
  dateStart: string;
  dateAnd: string;
  topic: string;
  device: string;
}) {
  return axios
    .post(
      `${import.meta.env.VITE_BACKEND_URL}/mqttRequest`,

      {
        topic: topic,
        dateStart: dateStart,
        dateAnd: dateAnd,
        device,
      }
    )
    .then((res) => res.data);
}
