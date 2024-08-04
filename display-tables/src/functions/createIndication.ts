import { createRowIndication } from '../api/indications';
import { IndicationInterface } from '../interfaces/indication';
import { v4 as uuidv4 } from 'uuid';

export const CreateRowIndication = async (value: IndicationInterface) => {
  const dataIndication: IndicationInterface = {
    id: uuidv4(),
    date: value.date,
    time: value.time,
    energyMeterReadingsDay: value.energyMeterReadingsDay,
    energyMeterReadingsNight: value.energyMeterReadingsNight,
    inputCircuitBreakerEnergy: value.inputCircuitBreakerEnergy,
  };

  await createRowIndication({ dataIndication });
};
