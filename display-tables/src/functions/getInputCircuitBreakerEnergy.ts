import { getInputCircuitBreakerEnergy } from '../api/indications';

export const GetInputCircuitBreakerEnergy = async (
  topic: string,
  date: string,
  time: string
) => {
  await getInputCircuitBreakerEnergy({
    topic: topic,
    date: date,
    time: time,
  });
};
