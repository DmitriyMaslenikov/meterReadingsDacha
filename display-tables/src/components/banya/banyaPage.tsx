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
import { FormatNumber } from '../ui/dataCells';
import { useMainPage } from '../mainPage/mainPageContext';
import {
  DailyConsumption,
  LoadEnergyReadings,
  MonthTotals,
} from '../../functions/dailyConsumption';
import { RowLabelCell, ValueCell, TextCell } from '../ui/dataCells';
import {
  CHANNEL_BANYA,
  NowDateAndTime,
  RequestChannelReading,
} from '../../functions/requestChannelReading';
import { palette } from '../../theme';

const BANYA_DEVICE = 'dinSmartRelay';

const EMPTY_TOTALS = {
  energyDay: 0,
  energyNight: 0,
  energyTotal: 0,
  amountTotal: 0,
  daysWithData: 0,
};

export const BanyaPage = () => {
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
        CHANNEL_BANYA
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
  }, []);

  // Итоги текущего месяца для плиток — те же расчёты, что и в календаре.
  useEffect(() => {
    let actual = true;

    LoadEnergyReadings(year, month, BANYA_DEVICE)
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
  }, [year, month, context.dayRate, context.nightRate, context.dataVersion]);

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
            caption={`Тариф ${FormatNumber(
              context.dayRate
            )} ₴ · ${FormatNumber(amountDay)} ₴`}
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
          title="Счётчик бани"
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
          <Table aria-label="Показание счётчика бани">
            <TableBody>
              <TableRow hover>
                <RowLabelCell accent={palette.primary}>
                  Автомат Баня
                </RowLabelCell>
                <TextCell>{currentAt}</TextCell>
                <ValueCell value={current ?? '—'} unit="кВт·ч" strong />
              </TableRow>
            </TableBody>
          </Table>
        </SectionCard>

        <ConsumptionCalendar
          device="dinSmartRelay"
          title="Календарь потребления бани"
          subtitle="Посуточный расход счётчика бани с разбивкой на день и ночь"
        />
      </Stack>
    </Container>
  );
};
