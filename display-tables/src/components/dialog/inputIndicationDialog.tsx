import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { EnteringMeterReadingsTable2 } from '../meterReadingTable/inputIndicationTable';
import { IndicationInterface } from '../../interfaces/indication';
import { CreateRowIndication } from '../../functions/createIndication';
import { GetInputCircuitBreakerEnergy } from '../../functions/getInputCircuitBreakerEnergy';

export function InputIndicationDialog({
  visibleDialog,
  setVisibleDialog,
}: {
  visibleDialog: boolean;
  setVisibleDialog: any;
}) {
  const strDate = (value: number) => {
    return value / 10 < 1 ? `0${value}` : `${value}`;
  };
  const CloseDialog = async () => {
    setEnergyMeterReadingsDay(0);
    setEnergyMeterReadingsNight(0);
    setVisibleDialog(false);
  };
  const SaveIndicatin = async () => {
    await CreateRowIndication(indication);
    await GetInputCircuitBreakerEnergy('/energy/dayAndTime', date, time);
    setEnergyMeterReadingsDay(0);
    setEnergyMeterReadingsNight(0);
    setVisibleDialog(false);
  };

  const setDateAndTime = (value: any) => {
    setDate(
      `${value.year()}-${strDate(value.month() + 1)}-${strDate(value.date())}`
    );
    setTime(`${strDate(value.hour())}:${strDate(value.minute())}`);
  };

  const [date, setDate] = React.useState('');
  const [time, setTime] = React.useState('');
  const [energyMeterReadingsDay, setEnergyMeterReadingsDay] = React.useState(0);
  const [energyMeterReadingsNight, setEnergyMeterReadingsNight] =
    React.useState(0);
  const [inputCircuitBreakerEnergy, setInputCircuitBreakerEnergy] =
    React.useState(0);
  const [indication, setIndication] = React.useState({
    id: '',
    date: '',
    time: '',
    energyMeterReadingsDay: 0,
    energyMeterReadingsNight: 0,
    inputCircuitBreakerEnergy: 0,
  });

  React.useEffect(() => {
    const value: IndicationInterface = {
      id: '',
      date: date,
      time: time,
      energyMeterReadingsDay: energyMeterReadingsDay,
      energyMeterReadingsNight: energyMeterReadingsNight,
      inputCircuitBreakerEnergy: inputCircuitBreakerEnergy,
    };
    setIndication(value);
    console.log('value', value);
  }, [energyMeterReadingsDay, energyMeterReadingsNight]);

  if (!visibleDialog) {
    return <></>;
  } else {
    return (
      <Dialog open={visibleDialog} sx={{ border: '50px', color: '#009900' }}>
        <DialogTitle id="alert-dialog-title" sx={{ color: '#000099' }}>
          {'Введите показания счетчика, время и дату.'}
        </DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateTimePicker']}>
              <DateTimePicker
                label="Basic date time picker"
                ampm={false}
                onChange={setDateAndTime}
              />
            </DemoContainer>
          </LocalizationProvider>
          <DialogContentText id="alert-dialog-description">
            <EnteringMeterReadingsTable2
              indicationDay={energyMeterReadingsDay}
              indicationNight={energyMeterReadingsNight}
              setIndicationDay={setEnergyMeterReadingsDay}
              setIndicationNight={setEnergyMeterReadingsNight}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={SaveIndicatin} autoFocus>
            Записать и закрыть
          </Button>
          <Button onClick={CloseDialog}>Закрыть диалог</Button>
        </DialogActions>
      </Dialog>
    );
  }
}
