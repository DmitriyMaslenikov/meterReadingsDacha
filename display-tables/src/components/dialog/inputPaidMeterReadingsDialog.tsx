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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { InputPaidMeterReadingsTable } from '../meterReadingTable/inputPaidMeterReadingsTable';
import { InputPaidMeterReadingsInterface } from '../../interfaces/inputPaidMeterReadingsInterface';
import { CreateRowPaidMeterReadings } from '../../functions/createPaidMeterReadings';
import { GetInputCircuitBreakerEnergy } from '../../functions/getInputCircuitBreakerEnergy';

export function InputPaidMeterReadingsDialog({
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
    setPaidMeterReadingsDay(0);
    setPaidMeterReadingsNight(0);
    setRateDay(0);
    setRateNight(0);
    setPaymentAmount(0);
    setVisibleDialog(false);
  };
  const SaveIndicatin = async () => {
    await CreateRowPaidMeterReadings(paidMeterReadings);

    setPaidMeterReadingsDay(0);
    setPaidMeterReadingsNight(0);
    setRateDay(0);
    setRateNight(0);
    setPaymentAmount(0);
    setVisibleDialog(false);
  };

  const setDateAndTime = (value: any) => {
    setDate(
      `${value.year()}-${strDate(value.month() + 1)}-${strDate(value.date())}`
    );
    
  };

  const [date, setDate] = React.useState('');

  const [paidMeterReadingsDay, setPaidMeterReadingsDay] = React.useState(0);
  const [paidMeterReadingsNight, setPaidMeterReadingsNight] = React.useState(0);
  const [rateDay, setRateDay] = React.useState(0);
  const [rateNight, setRateNight] = React.useState(0);
  const [paymentAmount, setPaymentAmount] = React.useState(0);
  const [paidMeterReadings, setPaidMeterReadings] = React.useState({
    id: '',
    date: '',
    paidMeterReadingsDay: 0,
    paidMeterReadingsNight: 0,
    rateDay: 0,
    rateNight: 0,
    paymentAmount: 0,
  });

  React.useEffect(() => {
    const value: InputPaidMeterReadingsInterface = {
      id: '',
      date: date,
      paidMeterReadingsDay: paidMeterReadingsDay,
      paidMeterReadingsNight: paidMeterReadingsNight,
      rateDay: rateDay,
      rateNight: rateNight,
      paymentAmount: paymentAmount,
    };
    setPaidMeterReadings(value);
  
  }, [
    paidMeterReadingsDay,
    paidMeterReadingsNight,
    rateDay,
    rateNight,
    paymentAmount,
  ]);

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
              <DatePicker
                label="Basic date time picker"
                onChange={setDateAndTime}
              />
            </DemoContainer>
          </LocalizationProvider>
          <DialogContentText id="alert-dialog-description">
            <InputPaidMeterReadingsTable
              indicationDay={paidMeterReadingsDay}
              indicationNight={paidMeterReadingsNight}
              rateDay={rateDay}
              rateNight={rateNight}
              paymentAmount={paymentAmount}
              setIndicationDay={setPaidMeterReadingsDay}
              setIndicationNight={setPaidMeterReadingsNight}
              setRateDay={setRateDay}
              setRateNight={setRateNight}
              setPaymentAmount={setPaymentAmount}
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
