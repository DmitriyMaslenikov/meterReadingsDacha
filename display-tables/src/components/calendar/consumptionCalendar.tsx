import { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Box,
  CircularProgress,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { SectionCard } from '../ui/sectionCard';
import { FormatNumber } from '../ui/dataCells';
import { useMainPage } from '../mainPage/mainPageContext';
import {
  DailyConsumption,
  DailyConsumptionInterface,
  DateStr,
  EnergyReading,
  FirstWeekdayOfMonth,
  LoadEnergyReadings,
  MonthTotals,
} from '../../functions/dailyConsumption';
import { palette } from '../../theme';

export const MONTHS = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

const WEEKDAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

const ChevronIcon = ({ direction }: { direction: 'left' | 'right' }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden
    style={{
      transform: direction === 'left' ? 'rotate(180deg)' : undefined,
    }}
  >
    <path
      d="m9 5 7 7-7 7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DayTooltip = ({ day }: { day: DailyConsumptionInterface }) => (
  <Box sx={{ py: 0.5 }}>
    <Typography variant="caption" sx={{ fontWeight: 700 }}>
      {day.date}
    </Typography>
    <Typography variant="caption" component="div">
      День 07:00–23:00: {FormatNumber(day.energyDay)} кВт·ч ·{' '}
      {FormatNumber(day.amountDay)} ₴
    </Typography>
    <Typography variant="caption" component="div">
      Ночь 23:00–07:00: {FormatNumber(day.energyNight)} кВт·ч ·{' '}
      {FormatNumber(day.amountNight)} ₴
    </Typography>
    {(!day.hasDay || !day.hasNight) && (
      <Typography variant="caption" component="div" sx={{ opacity: 0.8 }}>
        {!day.hasDay && !day.hasNight
          ? 'Показания за этот день отсутствуют'
          : 'Часть показаний за этот день отсутствует'}
      </Typography>
    )}
  </Box>
);

const DayCell = ({
  day,
  maxEnergy,
  isToday,
}: {
  day: DailyConsumptionInterface;
  maxEnergy: number;
  isToday: boolean;
}) => {
  const hasData = day.hasDay || day.hasNight;
  const intensity = maxEnergy > 0 ? day.energyTotal / maxEnergy : 0;
  const dayShare =
    day.energyTotal > 0 ? (day.energyDay / day.energyTotal) * 100 : 0;

  return (
    <Tooltip title={<DayTooltip day={day} />} placement="top" arrow>
      <Box
        sx={{
          p: 1,
          minHeight: 96,
          borderRadius: 2,
          border: 1,
          borderColor: isToday ? 'primary.main' : 'divider',
          boxShadow: isToday
            ? `0 0 0 1px ${alpha(palette.primary, 0.4)}`
            : 'none',
          backgroundColor: hasData
            ? alpha(palette.primary, 0.04 + intensity * 0.16)
            : 'transparent',
          display: 'flex',
          flexDirection: 'column',
          gap: 0.5,
          transition: 'transform 0.12s ease, box-shadow 0.12s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 10px 20px -12px rgba(15, 23, 42, 0.5)',
          },
        }}
      >
        <Typography
          variant="caption"
          sx={{
            fontWeight: 700,
            color: isToday ? 'primary.main' : 'text.secondary',
            lineHeight: 1,
          }}
        >
          {day.dayOfMonth}
        </Typography>

        {hasData ? (
          <>
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.4 }}>
              <Typography
                sx={{
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  fontVariantNumeric: 'tabular-nums',
                  lineHeight: 1.1,
                }}
              >
                {FormatNumber(day.energyTotal)}
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontSize: '0.62rem' }}
              >
                кВт·ч
              </Typography>
            </Box>

            <Box
              sx={{
                height: 4,
                borderRadius: 2,
                overflow: 'hidden',
                backgroundColor: alpha(palette.night, 0.85),
                display: 'flex',
              }}
            >
              <Box
                sx={{
                  width: `${dayShare}%`,
                  backgroundColor: palette.day,
                }}
              />
            </Box>

            <Typography
              variant="caption"
              sx={{
                fontSize: '0.62rem',
                color: 'text.secondary',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {FormatNumber(day.energyDay)} / {FormatNumber(day.energyNight)}
            </Typography>

            <Typography
              variant="caption"
              sx={{
                mt: 'auto',
                fontWeight: 700,
                color: 'primary.main',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {FormatNumber(day.amountTotal)} ₴
            </Typography>
          </>
        ) : (
          <Typography
            variant="caption"
            color="text.disabled"
            sx={{ mt: 'auto', fontSize: '0.65rem' }}
          >
            нет данных
          </Typography>
        )}
      </Box>
    </Tooltip>
  );
};

export const ConsumptionCalendar = ({
  device = 'inputCircuitBreaker',
  title = 'Календарь потребления',
  subtitle = 'Посуточный расход и стоимость с разбивкой на день и ночь',
  factor = 1,
}: {
  device?: string;
  title?: string;
  subtitle?: string;
  factor?: number;
} = {}) => {
  const context = useMainPage();
  const now = new Date();

  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [readings, setReadings] = useState<Map<string, EnergyReading>>(
    new Map()
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let actual = true;
    setLoading(true);
    setError('');

    LoadEnergyReadings(year, month, device, factor)
      .then((loaded) => {
        if (actual) {
          setReadings(loaded);
        }
      })
      .catch((loadError) => {
        if (actual) {
          setReadings(new Map());
          setError(
            `Не удалось получить показания: ${
              loadError?.message ?? 'ошибка запроса'
            }`
          );
        }
      })
      .finally(() => {
        if (actual) {
          setLoading(false);
        }
      });

    return () => {
      actual = false;
    };
  }, [year, month, device, factor, context.dataVersion]);

  const days = useMemo(
    () =>
      DailyConsumption(
        readings,
        year,
        month,
        context.dayRate,
        context.nightRate
      ),
    [readings, year, month, context.dayRate, context.nightRate]
  );

  const totals = useMemo(() => MonthTotals(days), [days]);
  const maxEnergy = useMemo(
    () => days.reduce((max, day) => Math.max(max, day.energyTotal), 0),
    [days]
  );

  const today = DateStr(now.getFullYear(), now.getMonth() + 1, now.getDate());
  const isCurrentMonth =
    year === now.getFullYear() && month === now.getMonth() + 1;

  const ShiftMonth = (step: number) => {
    const shifted = month + step;
    if (shifted < 1) {
      setYear(year - 1);
      setMonth(12);
    } else if (shifted > 12) {
      setYear(year + 1);
      setMonth(1);
    } else {
      setMonth(shifted);
    }
  };

  return (
    <SectionCard
      title={title}
      subtitle={subtitle}
      actions={
        <Stack direction="row" alignItems="center" spacing={1}>
          <IconButton
            size="small"
            onClick={() => ShiftMonth(-1)}
            aria-label="Предыдущий месяц"
          >
            <ChevronIcon direction="left" />
          </IconButton>
          <Typography
            variant="subtitle1"
            sx={{ minWidth: 150, textAlign: 'center' }}
          >
            {MONTHS[month - 1]} {year}
          </Typography>
          <IconButton
            size="small"
            onClick={() => ShiftMonth(1)}
            disabled={isCurrentMonth}
            aria-label="Следующий месяц"
          >
            <ChevronIcon direction="right" />
          </IconButton>
        </Stack>
      }
      footer={
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 1, sm: 3 }}
          alignItems={{ xs: 'flex-start', sm: 'center' }}
        >
          <Typography variant="body2" color="text.secondary">
            За месяц ({totals.daysWithData} дн.):
          </Typography>
          <Stack direction="row" spacing={0.75} alignItems="center">
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: palette.day,
              }}
            />
            <Typography variant="body2">
              День {FormatNumber(totals.energyDay)} кВт·ч
            </Typography>
          </Stack>
          <Stack direction="row" spacing={0.75} alignItems="center">
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: palette.night,
              }}
            />
            <Typography variant="body2">
              Ночь {FormatNumber(totals.energyNight)} кВт·ч
            </Typography>
          </Stack>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            Всего {FormatNumber(totals.energyTotal)} кВт·ч
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontWeight: 700, color: 'primary.main', ml: { sm: 'auto' } }}
          >
            {FormatNumber(totals.amountTotal)} ₴
          </Typography>
        </Stack>
      }
    >
      <Box sx={{ p: 3 }}>
        {error && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {loading ? (
          <Box sx={{ display: 'grid', placeItems: 'center', minHeight: 320 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
              gap: 1,
              minWidth: 620,
            }}
          >
            {WEEKDAYS.map((weekday) => (
              <Typography
                key={weekday}
                variant="caption"
                align="center"
                sx={{
                  color: 'text.secondary',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  pb: 0.5,
                }}
              >
                {weekday}
              </Typography>
            ))}

            {Array.from({ length: FirstWeekdayOfMonth(year, month) }).map(
              (_, index) => (
                <Box key={`empty-${index}`} />
              )
            )}

            {days.map((day) => (
              <DayCell
                key={day.date}
                day={day}
                maxEnergy={maxEnergy}
                isToday={day.date === today}
              />
            ))}
          </Box>
        )}
      </Box>
    </SectionCard>
  );
};
