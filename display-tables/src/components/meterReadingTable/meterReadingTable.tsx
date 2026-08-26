import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useEffect } from 'react';

import { IndicationsCalculatedInterface } from '../../interfaces/indicationsCalculatedInterface';
import { useMainPage } from '../mainPage/mainPageContext';
import { GetIndicatinStart } from '../../functions/getIndicatinStart';
import { InputPaidMeterReadings } from '../../functions/inputPaidMeterReadings';
import { CalculatedMeterReadings } from '../../functions/calculatedMeterReadings';
import { CurrentReadings } from '../../functions/paymentTotals';
import { RowLabelCell, TextCell, ValueCell } from '../ui/dataCells';
import { palette } from '../../theme';

export function MeterReadingsTable() {
  const context = useMainPage();

  useEffect(() => {
    (async () => {
      const indicationsStart = await GetIndicatinStart();
      context.setIndication(indicationsStart);
      const indicationsCalculated: IndicationsCalculatedInterface =
        await CalculatedMeterReadings(indicationsStart);

      context.setIndicationsCalculated(indicationsCalculated);
      const inputPaidMeterReadings = await InputPaidMeterReadings();
      context.setInputPaidMeterReadings(inputPaidMeterReadings);
    })();
  }, [context.dataVersion]);

  const currentReadings = CurrentReadings(
    context.indication,
    context.indicationsCalculated
  );

  const rows = [
    {
      label: 'Последние показания',
      accent: palette.muted,
      date: context.indication.date,
      time: context.indication.time,
      day: context.indication.energyMeterReadingsDay,
      night: context.indication.energyMeterReadingsNight,
      strong: false,
    },
    {
      label: 'Расчётные показания',
      accent: palette.primary,
      date: context.indicationsCalculated.date,
      time: context.indicationsCalculated.time,
      day: currentReadings.day,
      night: currentReadings.night,
      strong: true,
    },
    {
      label: 'Оплаченные показания',
      accent: palette.success,
      date: context.inputPaidMeterReadings.date,
      time: '',
      day: context.inputPaidMeterReadings.paidMeterReadingsDay,
      night: context.inputPaidMeterReadings.paidMeterReadingsNight,
      strong: false,
    },
  ];

  return (
    <Table aria-label="Показания счётчика">
      <TableHead>
        <TableRow>
          <TableCell>Счётчик</TableCell>
          <TableCell align="right">Дата</TableCell>
          <TableCell align="right">Время</TableCell>
          <TableCell align="right">День, кВт·ч</TableCell>
          <TableCell align="right">Ночь, кВт·ч</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.label} hover>
            <RowLabelCell accent={row.accent}>{row.label}</RowLabelCell>
            <TextCell>{row.date}</TextCell>
            <TextCell>{row.time}</TextCell>
            <ValueCell value={row.day} strong={row.strong} />
            <ValueCell value={row.night} strong={row.strong} />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
