import * as React from 'react';
import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import 'dayjs/locale/ru';
import { GetInputCircuitBreakerEnergy } from '../../functions/getInputCircuitBreakerEnergy';
import { WaitForDayAndTimeAllResponse } from '../../functions/waitForMqttResponse';
import {
  getDayAndTimeAllResponse,
  MqttResponseInterface,
} from '../../api/mqttResponse';
import { FormatNumber } from '../ui/dataCells';

/** Понятные подписи для полей, которые присылает прибор. */
const FIELD_LABELS: Record<string, string> = {
  energy1: 'Вводной автомат',
  energy2: 'Автомат Баня',
  energy3: 'Розетка1',
  energy4: 'Розетка2',
  energy5: 'Розетка 3',
  energy6: 'Реле обогрева спальня',
  energy7: 'Реле обогрева кухня',
  energy8: 'Реле обогрева верх',
  energy9: 'Реле обогрева зал',
  date: 'Дата',
  time: 'Время',
  energy: 'Счётчик ввода, кВт·ч',
  energyDay: 'День, кВт·ч',
  energyNight: 'Ночь, кВт·ч',
  device: 'Устройство',
};

/** Каналы, где прибор отдаёт значение в других единицах (Вт·ч вместо кВт·ч). */
const FIELD_FACTORS: Record<string, number> = {
  energy4: 0.001,
  energy5: 0.001,
};

const AnswerRows = ({ payload }: { payload: any }) => {
  if (payload === null || payload === undefined) {
    return (
      <Typography variant="body2" color="text.secondary">
        Прибор прислал пустой ответ.
      </Typography>
    );
  }

  if (typeof payload !== 'object') {
    return (
      <Typography sx={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
        {String(payload)}
      </Typography>
    );
  }

  return (
    <Stack divider={<Divider flexItem />} spacing={0}>
      {Object.entries(payload).map(([key, value]) => {
        const numericValue = Number(value);
        const isNumeric =
          value !== '' && value !== null && !Number.isNaN(numericValue);

        return (
          <Stack
            key={key}
            direction="row"
            justifyContent="space-between"
            alignItems="baseline"
            spacing={2}
            sx={{ py: 1 }}
          >
            <Typography variant="body2" color="text.secondary">
              {FIELD_LABELS[key] ?? key}
            </Typography>
            <Typography
              sx={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}
            >
              {isNumeric
                ? FormatNumber(numericValue * (FIELD_FACTORS[key] ?? 1))
                : String(value)}
            </Typography>
          </Stack>
        );
      })}
    </Stack>
  );
};

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

  const [date, setDate] = React.useState('');
  const [time, setTime] = React.useState('');
  const [requesting, setRequesting] = React.useState(false);
  const [answer, setAnswer] = React.useState<MqttResponseInterface | null>(
    null
  );
  const [answerError, setAnswerError] = React.useState('');

  const CloseDialog = async () => {
    setVisibleDialog(false);
  };

  const CloseAnswer = () => {
    setAnswer(null);
    setAnswerError('');
  };

  const GetIndicatin = async () => {
    setRequesting(true);
    setAnswer(null);
    setAnswerError('');

    try {
      // Запоминаем предыдущий ответ, чтобы отличить его от нового.
      const previous = await getDayAndTimeAllResponse();

      await GetInputCircuitBreakerEnergy('/energy/dayAndTimeAll', date, time);

      const fresh = await WaitForDayAndTimeAllResponse(previous.receivedAt);

      if (fresh) {
        setAnswer(fresh);
      } else {
        setAnswerError(
          'Прибор не ответил за 15 секунд. Проверьте, доступен ли MQTT-брокер на даче.'
        );
      }
    } catch (error: any) {
      setAnswerError(
        `Не удалось выполнить запрос: ${error?.message ?? 'ошибка сети'}`
      );
    } finally {
      setRequesting(false);
    }
  };

  if (!visibleDialog) {
    return <></>;
  }

  return (
    <>
      <Dialog open={visibleDialog} onClose={CloseDialog} fullWidth maxWidth="xs">
        <DialogTitle>Показания на дату и время</DialogTitle>
        <DialogContent sx={{ pb: 3 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
            Выберите момент времени и запросите показания счётчика.
          </Typography>
          <Stack spacing={2.5}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
              <DateTimePicker
                label="Дата и время"
                ampm={false}
                onChange={(value: any) => {
                  if (!value || !value.isValid || !value.isValid()) {
                    return;
                  }
                  setDate(
                    `${value.year()}-${strDate(value.month() + 1)}-${strDate(
                      value.date()
                    )}`
                  );
                  setTime(
                    `${strDate(value.hour())}:${strDate(value.minute())}`
                  );
                }}
                slotProps={{ textField: { fullWidth: true, size: 'small' } }}
              />
            </LocalizationProvider>
            <Stack direction="row" spacing={1.5}>
              <Button
                variant="outlined"
                onClick={GetIndicatin}
                fullWidth
                disabled={requesting || !date}
                startIcon={
                  requesting ? <CircularProgress size={16} /> : undefined
                }
              >
                {requesting ? 'Запрашиваю…' : 'Получить показания'}
              </Button>
              <Button
                variant="text"
                onClick={CloseDialog}
                disabled={requesting}
              >
                Закрыть
              </Button>
            </Stack>
          </Stack>
        </DialogContent>
      </Dialog>

      <Dialog
        open={Boolean(answer) || Boolean(answerError)}
        onClose={CloseAnswer}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Ответ счётчика</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Запрошено на {date} {time}
          </Typography>

          {answerError ? (
            <Alert severity="warning">{answerError}</Alert>
          ) : (
            <AnswerRows payload={answer?.payload} />
          )}
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={CloseAnswer}>
            Понятно
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
