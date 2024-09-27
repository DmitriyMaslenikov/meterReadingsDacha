import { getInputCircuitBreakerEnergys } from '../api/inputCircuitBreakerEnergy';
import { InputCircuitBreakerEnergyInterface } from '../interfaces/inputCircuitBreakerEnergyInterface';
import { updateTable } from '../api/inputCircuitBreakerEnergy';
import { GetDateStartStr } from './getDateStartStr';
import { GetDateStr } from './getDateStr';

export const UpdateTable = async () => {
  const dateStartStr = GetDateStartStr(30).dateStartStr;

  let indications = await getInputCircuitBreakerEnergys(
    `day||$gte||${dateStartStr}`
  );

  let dateStartMs = 0;

  indications.data.forEach((elem: InputCircuitBreakerEnergyInterface) => {
    const dayMs = Date.parse(`${elem.day}T00:01:00`);
    dateStartMs = dateStartMs < dayMs ? dayMs : dateStartMs;
  });
  const dateUpdateStart = new Date(dateStartMs);

  const dateUpdateStartStr = GetDateStr(dateUpdateStart);

  const dateUpdateAndStr = GetDateStartStr(0).dateStartStr;

  await updateTable({
    topic: '/energy/days',
    dateStart: dateUpdateStartStr,
    dateAnd: dateUpdateAndStr,
    device: 'inputCircuitBreaker',
  });

  return {};
};
