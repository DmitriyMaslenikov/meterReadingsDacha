import * as React from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'dayjs/locale/ru';
import { InputPaidMeterReadingsTable } from '../meterReadingTable/inputPaidMeterReadingsTable';
import { InputPaidMeterReadingsInterface } from '../../interfaces/inputPaidMeterReadingsInterface';
import { CreateRowPaidMeterReadings } from '../../functions/createPaidMeterReadings';
import { useMainPage } from '../mainPage/mainPageContext';
import { InputPaidMeterReadings } from '../../functions/inputPaidMeterReadings';

export function InputPaidMeterReadingsDialog({
  visibleDialog,
  setVisibleDialog,
}: {
  visibleDialog: boolean;
  setVisibleDialog: any;
}) {
  const context = useMainPage();
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
    const inputPaidMeterReadings = await InputPaidMeterReadings();
    console.log('inputPaidMeterReadings', inputPaidMeterReadings);
    context.setInputPaidMeterReadings(inputPaidMeterReadings);
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
  }

  return (
    <Dialog open={visibleDialog} onClose={CloseDialog} fullWidth maxWidth="sm">
      <DialogTitle>Оплаченные показания</DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
          Дата оплаты, показания счётчика на момент оплаты, тарифы и сумма.
        </Typography>
        <Stack spacing={2.5}>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
            <DatePicker
              label="Дата оплаты"
              onChange={setDateAndTime}
              slotProps={{ textField: { fullWidth: true, size: 'small' } }}
            />
          </LocalizationProvider>
          <Box>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              Оплаченные показания
            </Typography>
            <Box sx={{ mt: 1 }}>
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
            </Box>
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={CloseDialog}>
          Отмена
        </Button>
        <Button variant="contained" onClick={SaveIndicatin} autoFocus>
          Записать
        </Button>
      </DialogActions>
    </Dialog>
  );
}
