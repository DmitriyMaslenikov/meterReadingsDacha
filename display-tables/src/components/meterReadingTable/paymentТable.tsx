import { useRef } from 'react';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { alpha } from '@mui/material/styles';

import { useMainPage } from '../mainPage/mainPageContext';
import { useReactToPrint } from 'react-to-print';
import { RowLabelCell, TextCell, ValueCell } from '../ui/dataCells';
import { palette } from '../../theme';

const PrinterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M7 9V4h10v5M7 19h10v-5H7v5ZM5 9h14a2 2 0 0 1 2 2v4h-4M5 15H3v-4a2 2 0 0 1 2-2Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function PaymentTable() {
  const context = useMainPage();

  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const quantityConsumedEnergyDay =
    context.indicationsForPayment.indicationDay -
    context.inputPaidMeterReadings.paidMeterReadingsDay;
  const quantityConsumedEnergyNight =
    context.indicationsForPayment.indicationNight -
    context.inputPaidMeterReadings.paidMeterReadingsNight;
  const sumDay =
    Math.round(quantityConsumedEnergyDay * context.dayRate * 100) / 100;
  const sumNight =
    Math.round(quantityConsumedEnergyNight * context.nightRate * 100) / 100;

  const rows = [
    {
      label: 'День',
      accent: palette.day,
      previous: context.inputPaidMeterReadings.paidMeterReadingsDay,
      current: context.indicationsForPayment.indicationDay,
      consumed: quantityConsumedEnergyDay,
      rate: context.dayRate,
      sum: sumDay,
    },
    {
      label: 'Ночь',
      accent: palette.night,
      previous: context.inputPaidMeterReadings.paidMeterReadingsNight,
      current: context.indicationsForPayment.indicationNight,
      consumed: quantityConsumedEnergyNight,
      rate: context.nightRate,
      sum: sumNight,
    },
  ];

  return (
    <Box>
      <Box ref={componentRef} sx={{ '@media print': { p: 3 } }}>
        <Typography
          variant="h6"
          sx={{ display: 'none', mb: 2, '@media print': { display: 'block' } }}
        >
          Показания для оплаты · {context.indicationsCalculated.date}
        </Typography>

        <Table aria-label="Показания для оплаты">
          <TableHead>
            <TableRow>
              <TableCell>Тариф</TableCell>
              <TableCell align="right">Дата</TableCell>
              <TableCell align="right">Предыдущие</TableCell>
              <TableCell align="right">Настоящие</TableCell>
              <TableCell align="right">Использовано, кВт·ч</TableCell>
              <TableCell align="right">Цена, ₴</TableCell>
              <TableCell align="right">К оплате, ₴</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.label} hover>
                <RowLabelCell accent={row.accent}>{row.label}</RowLabelCell>
                <TextCell>{context.indicationsCalculated.date}</TextCell>
                <ValueCell value={row.previous} />
                <ValueCell value={row.current} />
                <ValueCell value={row.consumed} />
                <ValueCell value={row.rate} />
                <ValueCell value={row.sum} strong />
              </TableRow>
            ))}
            <TableRow
              sx={{
                backgroundColor: alpha(palette.primary, 0.06),
                '& td': { borderTop: `1px solid ${palette.line}` },
              }}
            >
              <RowLabelCell accent={palette.primary} colSpan={2}>
                Общая сумма
              </RowLabelCell>
              <ValueCell
                value={Math.round((sumDay + sumNight) * 100) / 100}
                unit="₴"
                strong
                colSpan={5}
              />
            </TableRow>
          </TableBody>
        </Table>
      </Box>

      <Box
        sx={{
          px: 3,
          py: 2,
          borderTop: 1,
          borderColor: 'divider',
          display: 'flex',
          justifyContent: 'flex-end',
          '@media print': { display: 'none' },
        }}
      >
        <Button
          variant="outlined"
          onClick={handlePrint}
          startIcon={<PrinterIcon />}
        >
          Печать таблицы
        </Button>
      </Box>
    </Box>
  );
}
