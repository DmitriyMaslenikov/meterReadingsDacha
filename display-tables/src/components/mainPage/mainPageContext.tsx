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

  setIndication: (v: IndicationInterface) => {},
};
const MainPageContext = createContext(defaultValueContext);

export const useMainPage = () => {
  return useContext(MainPageContext);
};

export const MainPageProvider = ({ children }: { children: any }) => {
  const [indication, setIndication] = useState(indicationsStart);

  const [saveData, setSaveData] = useState(false);

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
        // dayRate,

        // years,
        // year,
        // yearStart,
        // months,
        // month,
        // monthStart,
        // indicationMonth,
        // indicationPreviousMonth,
        // checkMonth,
        // saveData,
        // dialogText: state.text,
        // visibleErrorDialog: errorDialog,
        // firstOpeningDialogue: firstOpeningDialogue,

        // setYear,
        // setMonth,
        setIndication,
        // setDayRate,

        // setCheckMonth,
        // setSaveData,
        // show,
        // hide,
        // setErrorDialog,
        // setFirstOpeningDialogue,
      }}
    >
      {children}
    </MainPageContext.Provider>
  );
};
