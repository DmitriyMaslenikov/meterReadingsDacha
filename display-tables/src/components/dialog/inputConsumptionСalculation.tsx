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
import { alpha } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'dayjs/locale/ru';

import { IndicationInterface } from '../../interfaces/indication';

import { useMainPage } from '../mainPage/mainPageContext';
import { palette } from '../../theme';
import { FormatNumber } from '../ui/dataCells';
// import { CalculatedEnergyConsumptionForPeriod } from '../../functions/calculatedEnergyConsumptionForPeriod';

export function InputConsumptionСalculationDialog({
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
    setEnergyMeterReadingsDay(0);
    setEnergyMeterReadingsNight(0);
    setVisibleDialog(false);
  };

  const setDate1 = (value: any) => {
    setDateStart(
      `${value.year()}-${strDate(value.month() + 1)}-${strDate(value.date())}`
    );
  };
  const setDate2 = (value: any) => {
    setDateEnd(
      `${value.year()}-${strDate(value.month() + 1)}-${strDate(value.date())}`
    );
  };
  let fs =
    Math.round(
      (Number(context.indication.energyMeterReadingsNight) +
        Number(context.indicationsCalculated.energyNight) -
        Number(context.inputPaidMeterReadings.paidMeterReadingsNight)) *
        context.nightRate *
        100
    ) / 100;
  const [dateStart, setDateStart] = React.useState('');
  const [dateEnd, setDateEnd] = React.useState('');
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
      date: 'date',
      time: 'time',
      energyMeterReadingsDay: energyMeterReadingsDay,
      energyMeterReadingsNight: energyMeterReadingsNight,
      inputCircuitBreakerEnergy: inputCircuitBreakerEnergy,
    };
    setIndication(value);
  }, [energyMeterReadingsDay, energyMeterReadingsNight]);

  if (!visibleDialog) {
    return <></>;
  }

  return (
    <Dialog open={visibleDialog} onClose={CloseDialog} fullWidth maxWidth="sm">
      <DialogTitle>Расход за период</DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
          Период считается с 7:00 первой даты по 7:00 второй.
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <DatePicker
              label="с"
              onChange={setDate1}
              slotProps={{ textField: { fullWidth: true, size: 'small' } }}
            />
            <DatePicker
              label="по"
              onChange={setDate2}
              slotProps={{ textField: { fullWidth: true, size: 'small' } }}
            />
          </Stack>
        </LocalizationProvider>

        <Box
          sx={{
            mt: 3,
            p: 2.5,
            borderRadius: 3,
            border: 1,
            borderColor: 'divider',
            backgroundColor: alpha(palette.primary, 0.06),
          }}
        >
          <Typography variant="caption" color="text.secondary">
            Сумма оплаты с 7:00 {dateStart || '—'} по 7:00 {dateEnd || '—'}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.75 }}>
            <Typography
              variant="h4"
              sx={{ fontVariantNumeric: 'tabular-nums' }}
            >
              {FormatNumber(fs)}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              ₴
            </Typography>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={CloseDialog}>
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  );
}
