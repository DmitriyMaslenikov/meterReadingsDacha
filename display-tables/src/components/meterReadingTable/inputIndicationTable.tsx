import { Paper, Table, TableBody, TableRow } from '@mui/material';

import { Cell } from '../cell';
import { RowLabelCell } from '../ui/dataCells';
import { palette } from '../../theme';

export function EnteringMeterReadingsTable2({
  indicationDay,
  indicationNight,
  setIndicationDay,
  setIndicationNight,
}: {
  indicationDay: number;
  indicationNight: number;
  setIndicationDay: any;
  setIndicationNight: any;
}) {
  return (
    <Paper
      variant="outlined"
      sx={{ overflow: 'hidden', borderColor: 'divider' }}
    >
      <Table size="small" aria-label="Ввод показаний счётчика">
        <TableBody>
          <TableRow hover>
            <RowLabelCell accent={palette.day}>День</RowLabelCell>
            <Cell
              initialValue={indicationDay}
              setValue={setIndicationDay}
              colSpan={1}
              unit="кВт·ч"
            />
          </TableRow>
          <TableRow hover>
            <RowLabelCell accent={palette.night}>Ночь</RowLabelCell>
            <Cell
              initialValue={indicationNight}
              setValue={setIndicationNight}
              colSpan={1}
              unit="кВт·ч"
            />
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
}
