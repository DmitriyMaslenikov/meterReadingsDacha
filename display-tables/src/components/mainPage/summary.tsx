import { Stack } from '@mui/material';
import { StatTile } from '../ui/statTile';
import { FormatNumber } from '../ui/dataCells';
import { useMainPage } from './mainPageContext';
import { PaymentTotals } from '../../functions/paymentTotals';
import { palette } from '../../theme';

export const Summary = () => {
  const context = useMainPage();

  const totals = PaymentTotals(
    context.indication,
    context.indicationsCalculated,
    context.inputPaidMeterReadings,
    context.dayRate,
    context.nightRate
  );

  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      spacing={2.5}
      sx={{ '@media print': { display: 'none' } }}
    >
      <StatTile
        label="К оплате"
        value={totals.amountTotal}
        unit="₴"
        caption={`Оплачено по ${context.inputPaidMeterReadings.date}`}
        accent={palette.primary}
      />
      <StatTile
        label="День"
        value={totals.consumedDay}
        unit="кВт·ч"
        caption={`Тариф ${FormatNumber(context.dayRate)} ₴ · ${FormatNumber(
          totals.amountDay
        )} ₴`}
        accent={palette.day}
      />
      <StatTile
        label="Ночь"
        value={totals.consumedNight}
        unit="кВт·ч"
        caption={`Тариф ${FormatNumber(context.nightRate)} ₴ · ${FormatNumber(
          totals.amountNight
        )} ₴`}
        accent={palette.night}
      />
    </Stack>
  );
};
