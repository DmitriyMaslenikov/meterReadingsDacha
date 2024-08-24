import axios from 'axios';
import { InputPaidMeterReadingsInterface } from '../interfaces/inputPaidMeterReadingsInterface';

export function getPaidMeterReadings() {
  // console.log(23, month, year);
  return axios
    .get(`${import.meta.env.VITE_BACKEND_URL}/paidMetersReadings`)

    .then(function (response) {
      // console.log('response789', response);
      return response;
    });
}

export function createRowPaidMeterReadings({
  dataPaidMeterReadings,
}: {
  dataPaidMeterReadings: InputPaidMeterReadingsInterface;
}) {
  return axios
    .post(
      `${import.meta.env.VITE_BACKEND_URL}/paidMetersReadings`,
      dataPaidMeterReadings
    )
    .then((res) => res.data);
}
