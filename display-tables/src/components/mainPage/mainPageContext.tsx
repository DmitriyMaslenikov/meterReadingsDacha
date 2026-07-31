import { createContext, useContext, useState } from 'react';
import { IndicationInterface } from '../../interfaces/indication';
import { IndicationsCalculatedInterface } from '../../interfaces/indicationsCalculatedInterface';
import { IndicationsForPaymentInterface } from '../../interfaces/indicationsForPaymentInterface';
import { InputPaidMeterReadingsInterface } from '../../interfaces/inputPaidMeterReadingsInterface';
import { UpdateTable } from '../../functions/updateTable';
import { CalculatedEnergyConsumptionForPeriod } from '../../functions/calculatedEnergyConsumptionForPeriod';
import { MqttClient } from '../../functions/mqttClient';
// import { GetInputCircuitBreakerEnergy } from '../../functions/getInputCircuitBreakerEnergy';

// MqttClient();
UpdateTable();
// await GetInputCircuitBreakerEnergy('/energy/dayAndTime', '2026-01-08', '17:00');

const indicationsStart: IndicationInterface = {
  date: '2024-01-01',
  energyMeterReadingsDay: 0,
  energyMeterReadingsNight: 0,
  id: '',
  inputCircuitBreakerEnergy: 0,
  time: '00:00:00',
};

const indicationsCalculatedStart: IndicationsCalculatedInterface = {
  date: '2024-01-01',
  energyDay: 0,
  energyNight: 0,
  time: '07:00',
};
const inputPaidMeterReadingsStart: InputPaidMeterReadingsInterface = {
  date: '2024-01-01',
  id: '',
  paidMeterReadingsDay: 0,
  paidMeterReadingsNight: 0,
  paymentAmount: 0,
  rateDay: 0,
  rateNight: 0,
};
const energyConsumptionForPeriodStart = {
  dateStart: '',
  dateEnd: '',
  energyDay: 0,
  energyNight: 0,
  paymentАmount: 0,
};

const defaultValueContext = {
  indication: indicationsStart,
  indicationsCalculated: indicationsCalculatedStart,
  inputPaidMeterReadings: inputPaidMeterReadingsStart,
  estimatedPaymentAmount: 0,
  dayRate: 0,
  nightRate: 0,
  indicationsForPayment: { indicationDay: 0, indicationNight: 0 },
  energyConsumptionForPeriod: energyConsumptionForPeriodStart,

  setIndication: (v: IndicationInterface) => {},
  setEstimatedPaymentAmount: (v: number) => {},
  setDayRate: (v: number) => {},
  setNightRate: (v: number) => {},
  setIndicationsForPayment: (v: IndicationsForPaymentInterface) => {},
  setInputPaidMeterReadings: (v: InputPaidMeterReadingsInterface) => {},
  setIndicationsCalculated: (v: IndicationsCalculatedInterface) => {},
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
  const [indicationsForPayment, setIndicationsForPayment] = useState({
    indicationDay: 0,
    indicationNight: 0,
  });
  const [inputPaidMeterReadings, setInputPaidMeterReadings] = useState(
    inputPaidMeterReadingsStart
  );
  const [indicationsCalculated, setIndicationsCalculated] = useState(
    indicationsCalculatedStart
  );
  const [energyConsumptionForPeriod, setEnergyConsumptionForPeriod] = useState(
    energyConsumptionForPeriodStart
  );

  return (
    <MainPageContext.Provider
      value={{
        indication,
        indicationsCalculated,
        inputPaidMeterReadings,
        estimatedPaymentAmount,
        dayRate,
        nightRate,
        indicationsForPayment,
        energyConsumptionForPeriod,

        setIndication,
        setEstimatedPaymentAmount,
        setDayRate,
        setNightRate,
        setIndicationsForPayment,
        setInputPaidMeterReadings,
        setIndicationsCalculated,
      }}
    >
      {children}
    </MainPageContext.Provider>
  );
};
