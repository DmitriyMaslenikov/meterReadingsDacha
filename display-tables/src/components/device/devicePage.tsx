import { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  CircularProgress,
  Container,
  Stack,
  Table,
  TableBody,
  TableRow,
} from '@mui/material';
import { SectionCard } from '../ui/sectionCard';
import { ConsumptionCalendar, MONTHS } from '../calendar/consumptionCalendar';
import { StatTile } from '../ui/statTile';
import {
  FormatNumber,
  RowLabelCell,
  TextCell,
  ValueCell,
} from '../ui/dataCells';
import { useMainPage } from '../mainPage/mainPageContext';
import {
  DailyConsumption,
  LoadEnergyReadings,
  MonthTotals,
} from '../../functions/dailyConsumption';
import {
  NowDateAndTime,
  RequestChannelReading,
} from '../../functions/requestChannelReading';
import { palette } from '../../theme';

const EMPTY_TOTALS = {
  energyDay: 0,
  energyNight: 0,
  energyTotal: 0,
  amountTotal: 0,
  daysWithData: 0,
};

/**
 * Страница одного потребителя: итоги месяца, текущее показание по запросу
 * к openhab и посуточный календарь. Отличаются только устройство, канал
 * в ответе прибора и подписи.
 */
export const DevicePage = ({
  device,
  channel,
  meterTitle,
  meterLabel,
  calendarTitle,
}: {
  /** Имя устройства для /energy/days и фильтра в базе. */
  device: string;
  /** Ключ канала в ответе /energy/responseDayAndTimeAll. */
  channel: string;
  meterTitle: string;
  meterLabel: string;
  calendarTitle: string;
}) => {
  const context = useMainPage();
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  const [totals, setTotals] = useState(EMPTY_TOTALS);
  const [current, setCurrent] = useState<number | null>(null);
  const [currentAt, setCurrentAt] = useState('');
  const [loadingCurrent, setLoadingCurrent] = useState(false);
  const [error, setError] = useState('');

  const LoadCurrent = async () => {
    setLoadingCurrent(true);
    setError('');
    const moment = NowDateAndTime();

    try {
      const value = await RequestChannelReading(
        moment.date,
        moment.time,
        channel
      );
      if (value === null) {
        setError('Прибор не ответил на запрос текущего показания.');
      } else {
        setCurrent(value);
        setCurrentAt(`${moment.date} ${moment.time}`);
      }
    } catch (requestError: any) {
      setError(
        `Не удалось получить показание: ${
          requestError?.message ?? 'ошибка сети'
        }`
      );
    } finally {
      setLoadingCurrent(false);
    }
  };

  useEffect(() => {
    LoadCurrent();
  }, [device]);

  // Итоги текущего месяца для плиток — те же расчёты, что и в календаре.
  useEffect(() => {
    let actual = true;

    LoadEnergyReadings(year, month, device)
      .then((readings) => {
        if (!actual) {
          return;
        }
        const days = DailyConsumption(
          readings,
          year,
          month,
          context.dayRate,
          context.nightRate
        );
        setTotals(MonthTotals(days));
      })
      .catch(() => {
        if (actual) {
          setTotals(EMPTY_TOTALS);
        }
      });

    return () => {
      actual = false;
    };
  }, [
    device,
    year,
    month,
    context.dayRate,
    context.nightRate,
    context.dataVersion,
  ]);

  const amountDay = Math.round(totals.energyDay * context.dayRate * 100) / 100;
  const amountNight =
    Math.round(totals.energyNight * context.nightRate * 100) / 100;

  return (
    <Container maxWidth="lg" sx={{ pt: 4 }}>
      <Stack spacing={3.5}>
        {error && <Alert severity="warning">{error}</Alert>}

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2.5}>
          <StatTile
            label={`День · ${MONTHS[month - 1]}`}
            value={totals.energyDay}
            unit="кВт·ч"
            caption={`Тариф ${FormatNumber(context.dayRate)} ₴ · ${FormatNumber(
              amountDay
            )} ₴`}
            accent={palette.day}
          />
          <StatTile
            label={`Ночь · ${MONTHS[month - 1]}`}
            value={totals.energyNight}
            unit="кВт·ч"
            caption={`Тариф ${FormatNumber(
              context.nightRate
            )} ₴ · ${FormatNumber(amountNight)} ₴`}
            accent={palette.night}
          />
          <StatTile
            label="Всего за месяц"
            value={totals.amountTotal}
            unit="₴"
            caption={`${FormatNumber(totals.energyTotal)} кВт·ч · ${
              totals.daysWithData
            } дн.`}
            accent={palette.primary}
          />
        </Stack>

        <SectionCard
          title={meterTitle}
          subtitle="Показание запрашивается у openhab по MQTT"
          actions={
            <Button
              variant="outlined"
              onClick={LoadCurrent}
              disabled={loadingCurrent}
              startIcon={
                loadingCurrent ? <CircularProgress size={16} /> : undefined
              }
            >
              {loadingCurrent ? 'Запрашиваю…' : 'Обновить'}
            </Button>
          }
        >
          <Table aria-label={meterTitle}>
            <TableBody>
              <TableRow hover>
                <RowLabelCell accent={palette.primary}>
                  {meterLabel}
                </RowLabelCell>
                <TextCell>{currentAt}</TextCell>
                <ValueCell value={current ?? '—'} unit="кВт·ч" strong />
              </TableRow>
            </TableBody>
          </Table>
        </SectionCard>

        <ConsumptionCalendar
          device={device}
          title={calendarTitle}
          subtitle="Посуточный расход с разбивкой на день и ночь"
        />
      </Stack>
    </Container>
  );
};
