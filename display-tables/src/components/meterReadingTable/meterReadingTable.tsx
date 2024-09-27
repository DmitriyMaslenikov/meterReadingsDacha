import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useEffect } from 'react';

import { IndicationsCalculatedInterface } from '../../interfaces/indicationsCalculatedInterface';
import { useMainPage } from '../mainPage/mainPageContext';
import styles from './table.module.scss';
import { GetIndicatinStart } from '../../functions/getIndicatinStart';
import { InputPaidMeterReadings } from '../../functions/inputPaidMeterReadings';
import { UpdateTable } from '../../functions/updateTable';
import { CalculatedMeterReadings } from '../../functions/calculatedMeterReadings';

export function MeterReadingsTable() {
  const context = useMainPage();

  useEffect(() => {
    (async () => {
      UpdateTable();
      const indicationsStart = await GetIndicatinStart();
      context.setIndication(indicationsStart);
      const indicationsCalculated: IndicationsCalculatedInterface =
        await CalculatedMeterReadings(indicationsStart);

      context.setIndicationsCalculated(indicationsCalculated);
      const inputPaidMeterReadings = await InputPaidMeterReadings();
      context.setInputPaidMeterReadings(inputPaidMeterReadings);
    })();
  }, []);

  return (
    <div className={styles.table}>
      <Table
        sx={{
          paddingLeft: '80px',
          border: 4,
          borderRadius: 5,
          width: '1000px',
        }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow
            sx={{
              borderBottom: 4,
              backgroundColor: '#eeeee7',
            }}
          >
            <TableCell
              className="qqqqq"
              align="center"
              sx={{
                border: 2,
                borderTopColor: 'primary.main',
                width: '600px',
                height: '50px',
              }}
            >
              <Typography component="h5" variant="h5">
                Счётчик
              </Typography>
            </TableCell>
            <TableCell
              className="qqqqq"
              align="center"
              sx={{
                border: 2,
                borderTopColor: 'primary.main',
                width: '600px',
                height: '50px',
              }}
            >
              <Typography component="h5" variant="h5">
                Дата
              </Typography>
            </TableCell>
            <TableCell
              className="qqqqq"
              align="center"
              sx={{
                border: 2,
                borderTopColor: 'primary.main',
                width: '600px',
                height: '50px',
              }}
            >
              <Typography component="h5" variant="h5">
                Время
              </Typography>
            </TableCell>
            <TableCell
              align="center"
              sx={{
                border: 2,
              }}
            >
              <Typography component="h6" variant="h6">
                День
              </Typography>
            </TableCell>
            <TableCell
              align="center"
              sx={{
                border: 2,
              }}
            >
              <Typography component="h6" variant="h6">
                Ночь
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell
              align="center"
              sx={{
                border: 2,
              }}
            >
              <Typography component="h6" variant="h6">
                Последнии показания счетчика
              </Typography>
            </TableCell>
            <TableCell
              align="center"
              sx={{
                border: 2,
              }}
            >
              <Typography component="h6" variant="h6">
                {context.indication.date}
              </Typography>
            </TableCell>
            <TableCell
              align="center"
              sx={{
                border: 2,
              }}
            >
              <Typography component="h6" variant="h6">
                {context.indication.time}
              </Typography>
            </TableCell>
            <TableCell
              align="center"
              sx={{
                border: 2,
              }}
            >
              <Typography component="h6" variant="h6">
                {context.indication.energyMeterReadingsDay}
              </Typography>
            </TableCell>
            <TableCell
              align="center"
              sx={{
                border: 2,
              }}
            >
              <Typography component="h6" variant="h6">
                {context.indication.energyMeterReadingsNight}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              align="center"
              sx={{
                border: 2,
              }}
            >
              <Typography component="h6" variant="h6">
                Расчетные показания счетчика
              </Typography>
            </TableCell>
            <TableCell
              align="center"
              sx={{
                border: 2,
              }}
            >
              <Typography component="h6" variant="h6">
                {context.indicationsCalculated.date}
              </Typography>
            </TableCell>
            <TableCell
              align="center"
              sx={{
                border: 2,
              }}
            >
              <Typography component="h6" variant="h6">
                {context.indicationsCalculated.time}
              </Typography>
            </TableCell>
            <TableCell
              align="center"
              sx={{
                border: 2,
              }}
            >
              <Typography component="h6" variant="h6">
                {Number(context.indication.energyMeterReadingsDay) +
                  Number(context.indicationsCalculated.energyDay)}
              </Typography>
            </TableCell>
            <TableCell
              align="center"
              sx={{
                border: 2,
              }}
            >
              <Typography component="h6" variant="h6">
                {Number(context.indication.energyMeterReadingsNight) +
                  Number(context.indicationsCalculated.energyNight)}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              align="center"
              sx={{
                border: 2,
              }}
            >
              <Typography component="h6" variant="h6">
                Оплаченные показания счетчика
              </Typography>
            </TableCell>
            <TableCell
              align="center"
              sx={{
                border: 2,
              }}
            >
              <Typography component="h6" variant="h6">
                {context.inputPaidMeterReadings.date}
              </Typography>
            </TableCell>
            <TableCell
              align="center"
              sx={{
                border: 2,
              }}
            >
              <Typography component="h6" variant="h6">
                -
              </Typography>
            </TableCell>
            <TableCell
              align="center"
              sx={{
                border: 2,
              }}
            >
              <Typography component="h6" variant="h6">
                {context.inputPaidMeterReadings.paidMeterReadingsDay}
              </Typography>
            </TableCell>
            <TableCell
              align="center"
              sx={{
                border: 2,
              }}
            >
              <Typography component="h6" variant="h6">
                {context.inputPaidMeterReadings.paidMeterReadingsNight}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
