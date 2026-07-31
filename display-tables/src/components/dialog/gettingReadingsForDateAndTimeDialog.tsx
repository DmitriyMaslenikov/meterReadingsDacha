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
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import 'dayjs/locale/ru';
import { EnteringMeterReadingsTable2 } from '../meterReadingTable/inputIndicationTable';
import { IndicationInterface } from '../../interfaces/indication';
import { GetInputCircuitBreakerEnergy } from '../../functions/getInputCircuitBreakerEnergy';

export function GettingReadingsForDateAndTimeDialog({
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
    setVisibleDialog(false);
  };
  const SaveIndicatin = async () => {
    setVisibleDialog(false);
  };
  const GetIndicatin = async () => {
    await GetInputCircuitBreakerEnergy('/energy/dayAndTimeAll', date, time);
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
  }, [energyMeterReadingsDay, energyMeterReadingsNight]);

  if (!visibleDialog) {
    return <></>;
  }

  return (
    <Dialog open={visibleDialog} onClose={CloseDialog} fullWidth maxWidth="xs">
      <DialogTitle>Показания на дату и время</DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
          Выберите момент времени и запросите показания счётчика.
        </Typography>
        <Stack spacing={2.5}>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
            <DateTimePicker
              label="Дата и время"
              ampm={false}
              onChange={setDateAndTime}
              slotProps={{ textField: { fullWidth: true, size: 'small' } }}
            />
          </LocalizationProvider>
          <Button variant="outlined" onClick={GetIndicatin} fullWidth>
            Получить показания
          </Button>
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
              Показания счётчика
            </Typography>
            <Box sx={{ mt: 1 }}>
              <EnteringMeterReadingsTable2
                indicationDay={energyMeterReadingsDay}
                indicationNight={energyMeterReadingsNight}
                setIndicationDay={setEnergyMeterReadingsDay}
                setIndicationNight={setEnergyMeterReadingsNight}
              />
            </Box>
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={CloseDialog}>
          Закрыть
        </Button>
        <Button variant="contained" onClick={SaveIndicatin} autoFocus>
          Записать
        </Button>
      </DialogActions>
    </Dialog>
  );
}
