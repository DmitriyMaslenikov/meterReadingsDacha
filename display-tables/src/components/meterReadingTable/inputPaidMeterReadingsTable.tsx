import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';

import { Cell } from '../cell';
import { RowLabelCell } from '../ui/dataCells';
import { palette } from '../../theme';

export function InputPaidMeterReadingsTable({
  indicationDay,
  indicationNight,
  setIndicationDay,
  setIndicationNight,
  rateDay,
  rateNight,
  paymentAmount,
  setPaymentAmount,
  setRateDay,
  setRateNight,
}: {
  indicationDay: number;
  indicationNight: number;
  rateDay: number;
  rateNight: number;
  paymentAmount: number;
  setIndicationDay: any;
  setIndicationNight: any;
  setPaymentAmount: any;
  setRateDay: any;
  setRateNight: any;
}) {
  return (
    <Paper
      variant="outlined"
      sx={{ overflow: 'hidden', borderColor: 'divider' }}
    >
      <Table size="small" aria-label="Ввод оплаченных показаний счётчика">
        <TableHead>
          <TableRow>
            <TableCell>Тариф</TableCell>
            <TableCell align="right">Показание</TableCell>
            <TableCell align="right">Цена, ₴</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow hover>
            <RowLabelCell accent={palette.day}>День</RowLabelCell>
            <Cell
              initialValue={indicationDay}
              setValue={setIndicationDay}
              colSpan={1}
            />
            <Cell initialValue={rateDay} setValue={setRateDay} colSpan={1} />
          </TableRow>
          <TableRow hover>
            <RowLabelCell accent={palette.night}>Ночь</RowLabelCell>
            <Cell
              initialValue={indicationNight}
              setValue={setIndicationNight}
              colSpan={1}
            />
            <Cell
              initialValue={rateNight}
              setValue={setRateNight}
              colSpan={1}
            />
          </TableRow>
          <TableRow hover>
            <RowLabelCell accent={palette.primary}>Сумма оплаты</RowLabelCell>
            <Cell
              initialValue={paymentAmount}
              setValue={setPaymentAmount}
              colSpan={2}
              unit="₴"
            />
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
}
