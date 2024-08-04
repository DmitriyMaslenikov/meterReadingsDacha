import { getInputCircuitBreakerEnergys } from '../api/inputCircuitBreakerEnergy';
import { InputCircuitBreakerEnergyInterface } from '../interfaces/inputCircuitBreakerEnergyInterface';
import { updateTable } from '../api/inputCircuitBreakerEnergy';
import { AddZero } from '../functions/addZero';

export const UpdateTable = async () => {
  const date = new Date();

  const dayMs = 24 * 60 * 60 * 1000;

  const dateStr = `${date.getFullYear()}-${AddZero(
    date.getMonth() + 1
  )}-${AddZero(date.getDate())}`;
  const dateMs = Date.parse(`${dateStr} 00:00:00 GMT`);
  const daeStarMs = dateMs - dayMs * 30;
  const dateStart = new Date(daeStarMs);

  const dateStartStr = `${dateStart.getFullYear()}-${AddZero(
    dateStart.getMonth() + 1
  )}-${AddZero(dateStart.getDate())}`;

  console.log('dateStartStr02.07', dateStartStr);
  let indications = await getInputCircuitBreakerEnergys(
    `day||$gte||${dateStartStr}`
  );
  //   console.log('getInputCircuitBreakerEnergys02.07', indications);
  let dateStartMs = 0;
  indications.data.forEach((elem: InputCircuitBreakerEnergyInterface) => {
    const dayMs = Date.parse(`${elem.day} 00:12:00 GMT`);
    dateStartMs = dateStartMs < dayMs ? dayMs : dateStartMs;
  });
  const dateUpdateStart = new Date(dateStartMs);
  const dateUpdateAnd = new Date();
  const dateUpdateAndStr = `${dateUpdateAnd.getFullYear()}-${AddZero(
    dateUpdateAnd.getMonth() + 1
  )}-${AddZero(dateUpdateAnd.getDate())}`;
  const dateUpdateStartStr = `${dateUpdateStart.getFullYear()}-${AddZero(
    dateUpdateStart.getMonth() + 1
  )}-${AddZero(dateUpdateStart.getDate())}`;
  //   console.log(
  //     'dateStartMs02.07',
  //     dateStartMs,
  //     dateStart,
  //     dateUpdateAndStr,
  //     dateUpdateStartStr,
  //     dateStartStr
  //   );

  await updateTable({
    topic: '/energy/days',
    dateStart: dateUpdateStartStr,
    dateAnd: dateUpdateAndStr,
    device: 'inputCircuitBreaker',
  });

  return {};
};
