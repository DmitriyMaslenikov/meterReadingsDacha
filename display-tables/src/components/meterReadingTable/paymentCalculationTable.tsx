import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useEffect } from 'react';
import { Cell } from '../cell';
import { useMainPage } from '../mainPage/mainPageContext';
import { CalculationOfPaymentIndications } from '../../functions/calculationOfPaymentIndications2';
import { IndicationsForPaymentInterface } from '../../interfaces/indicationsForPaymentInterface';
import { CurrentReadings, PaymentTotals } from '../../functions/paymentTotals';
import { RowLabelCell, TextCell, ValueCell } from '../ui/dataCells';
import { palette } from '../../theme';

export function PaymentCalculationTable() {
  const context = useMainPage();

  useEffect(() => {
    if (Number(context.estimatedPaymentAmount) !== 0) {
      const readings = CurrentReadings(
        context.indication,
        context.indicationsCalculated
      );

      const indications: IndicationsForPaymentInterface =
        CalculationOfPaymentIndications(
          context.estimatedPaymentAmount,
          Math.round(readings.day * 100) / 100,
          Math.round(readings.night * 100) / 100,
          context.dayRate,
          context.nightRate,
          context.inputPaidMeterReadings
        );

      context.setIndicationsForPayment(indications);
    }
  }, [context.estimatedPaymentAmount]);

  const totals = PaymentTotals(
    context.indication,
    context.indicationsCalculated,
    context.inputPaidMeterReadings,
    context.dayRate,
    context.nightRate
  );

  return (
    <Table aria-label="Расчёт оплаты">
      <TableHead>
        <TableRow>
          <TableCell>Показатель</TableCell>
          <TableCell align="right">Дата</TableCell>
          <TableCell align="right">День</TableCell>
          <TableCell align="right">Ночь</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow hover>
          <RowLabelCell accent={palette.muted}>Тариф, ₴/кВт·ч</RowLabelCell>
          <TextCell>{context.indicationsCalculated.date}</TextCell>
          <Cell
            initialValue={context.dayRate}
            setValue={context.setDayRate}
            colSpan={1}
          />
          <Cell
            initialValue={context.nightRate}
            setValue={context.setNightRate}
            colSpan={1}
          />
        </TableRow>

        <TableRow hover>
          <RowLabelCell accent={palette.day}>Расчётная сумма, ₴</RowLabelCell>
          <TextCell>{context.indicationsCalculated.date}</TextCell>
          <ValueCell value={totals.amountDay} />
          <ValueCell value={totals.amountNight} />
        </TableRow>

        <TableRow
          sx={{
            backgroundColor: alpha(palette.primary, 0.06),
            '& td': { borderTop: `1px solid ${palette.line}` },
          }}
        >
          <RowLabelCell accent={palette.primary}>Общая сумма</RowLabelCell>
          <TextCell>{context.indicationsCalculated.date}</TextCell>
          <ValueCell value={totals.amountTotal} unit="₴" strong colSpan={2} />
        </TableRow>

        <TableRow hover>
          <RowLabelCell accent={palette.night}>
            Предполагаемая сумма оплаты
          </RowLabelCell>
          <TextCell>{context.indicationsCalculated.date}</TextCell>
          <Cell
            initialValue={context.estimatedPaymentAmount}
            setValue={context.setEstimatedPaymentAmount}
            colSpan={2}
            unit="₴"
          />
        </TableRow>
      </TableBody>
    </Table>
  );
}
