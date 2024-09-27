import axios from 'axios';
import { InputPaidMeterReadingsInterface } from '../interfaces/inputPaidMeterReadingsInterface';

export function getPaidMeterReadings(filter: string) {
  return axios
    .get(
      `${import.meta.env.VITE_BACKEND_URL}/paidMetersReadings?filter=${filter}`
    )

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
