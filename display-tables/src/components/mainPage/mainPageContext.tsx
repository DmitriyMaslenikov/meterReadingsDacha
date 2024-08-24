import { createContext, useContext, useState, useRef, useReducer } from 'react';
import { GetIndicatinStart } from '../../functions/getIndicatinStart';
import { IndicationInterface } from '../../interfaces/indication';
import { CalculatedMeterReadings } from '../../functions/calculatedMeterReadings';
import { InputPaidMeterReadings } from '../../functions/inputPaidMeterReadings';
import { InputPaidMeterReadingsInterface } from '../../interfaces/inputPaidMeterReadingsInterface';
import { UpdateTable } from '../../functions/updateTable';
import { getInputCircuitBreakerEnergys } from '../../api/inputCircuitBreakerEnergy';
import { GetMapIndications } from '../../functions/getMapIndications';
import { GetAndData } from '../../functions/getAndData';

await UpdateTable();

const indicationsStart = await GetIndicatinStart();

const inputCircuitBreakerEnergys = await getInputCircuitBreakerEnergys(
  `day||$gte||${indicationsStart.date}`
);
const mapIndications = await GetMapIndications(
  inputCircuitBreakerEnergys,
  indicationsStart.date
);
console.log(
  'getInputCircuitBreakerEnergys01.07',
  inputCircuitBreakerEnergys,
  mapIndications
);
const andData = await GetAndData(mapIndications);
console.log('andData01.07', andData);
const andDay = andData?.day ? andData?.day : '';
const andTime = andData?.time ? andData?.time : '';
const andEnergy = andData?.energy ? andData?.energy : 0;
const indicationsCalculated = await CalculatedMeterReadings(
  inputCircuitBreakerEnergys,
  indicationsStart.date,
  andDay,
  indicationsStart.time,
  andTime,
  indicationsStart.inputCircuitBreakerEnergy,
  andEnergy
);
const inputPaidMeterReadings = await InputPaidMeterReadings();

console.log('start', indicationsStart);
console.log('indicationsCalculated', indicationsCalculated);

const defaultValueContext = {
  visibleDialog: true,
  indication: indicationsStart,
  indicationsCalculated: indicationsCalculated,
  inputPaidMeterReadings: inputPaidMeterReadings,
  estimatedPaymentAmount: 0,
  dayRate: 0,
  nightRate: 0,

  setIndication: (v: IndicationInterface) => {},
  setEstimatedPaymentAmount: (v: number) => {},
  setDayRate: (v: number) => {},
  setNightRate: (v: number) => {},
};
const MainPageContext = createContext(defaultValueContext);

export const useMainPage = () => {
  return useContext(MainPageContext);
};

export const MainPageProvider = ({ children }: { children: any }) => {
  const [indication, setIndication] = useState(indicationsStart);

  const [estimatedPaymentAmount, setEstimatedPaymentAmount] = useState(0);
  const [dayRate, setDayRate] = useState(4.7);
  const [nightRate, setNightRate] = useState(2.35);

  const reducer = (
    state: { visible: boolean; text: string },
    action: { type: string; text: string }
  ) => {
    switch (action.type) {
      case 'show':
        return { ...state, visible: true, text: action.text };
      case 'hide':
        return { ...state, visible: false };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, { visible: false, text: '' });

  const show = (text: string) => dispatch({ type: 'show', text });
  const hide = (text: string) => dispatch({ type: 'hide', text });

  return (
    <MainPageContext.Provider
      value={{
        visibleDialog: state.visible,
        indication,
        indicationsCalculated,
        inputPaidMeterReadings,
        estimatedPaymentAmount,
        dayRate,
        nightRate,

        setIndication,
        setEstimatedPaymentAmount,
        setDayRate,
        setNightRate,
      }}
    >
      {children}
    </MainPageContext.Provider>
  );
};
