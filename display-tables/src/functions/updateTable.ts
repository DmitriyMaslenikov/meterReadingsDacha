import { getInputCircuitBreakerEnergys } from '../api/inputCircuitBreakerEnergy';
import { InputCircuitBreakerEnergyInterface } from '../interfaces/inputCircuitBreakerEnergyInterface';
import { updateTable } from '../api/inputCircuitBreakerEnergy';
import { GetDateStartStr } from './getDateStartStr';
import { GetDateStr } from './getDateStr';

export const UpdateTable = async () => {
  const dateStartStr = GetDateStartStr(30).dateStartStr;
  // console.log('dateStartStr', dateStartStr);

  let indications = await getInputCircuitBreakerEnergys(
    `day||$gte||${dateStartStr}`
  );
  // console.log('indications', indications);
  let dateStartMs = 0;

  indications.data.forEach((elem: InputCircuitBreakerEnergyInterface) => {
    // console.log('elem', elem);

    const dayMs = Date.parse(`${elem.day}T00:01:00`);
    dateStartMs = dateStartMs < dayMs ? dayMs : dateStartMs;
  });
  //  const aa = 24 * 60 * 60 * 1000;

  const dateUpdateStart = new Date(dateStartMs);
  // console.log('dateUpdateStart', dateUpdateStart);

  const dateUpdateStartStr = GetDateStr(dateUpdateStart);

  const dateUpdateAndStr = GetDateStartStr(0).dateStartStr;
  // console.log('dateUpdateAndStr', dateUpdateAndStr, dateUpdateStartStr);

  await updateTable({
    topic: '/energy/days',
    dateStart: dateUpdateStartStr,
    dateAnd: dateUpdateAndStr,
    device: 'inputCircuitBreaker',
  });

  return {};
};
