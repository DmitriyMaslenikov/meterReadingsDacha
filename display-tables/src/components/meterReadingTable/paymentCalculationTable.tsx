import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useEffect } from 'react';
import { Cell } from '../cell';
import { useMainPage } from '../mainPage/mainPageContext';
import { CalculationOfPaymentIndications } from '../../functions/calculationOfPaymentIndications';
import { IndicationsForPaymentInterface } from '../../interfaces/indicationsForPaymentInterface';
import styles from './table.module.scss';

export function PaymentCalculationTable() {
  const context = useMainPage();

  useEffect(() => {
    if (Number(context.estimatedPaymentAmount) !== 0) {
      const indications: IndicationsForPaymentInterface =
        CalculationOfPaymentIndications(
          context.estimatedPaymentAmount,
          Math.round(
            Number(
              context.indicationsCalculated.energyDay +
                context.inputPaidMeterReadings.paidMeterReadingsDay
            ) * 100
          ) / 100,
          Math.round(
            Number(
              context.indicationsCalculated.energyNight +
                context.inputPaidMeterReadings.paidMeterReadingsNight
            ) * 100
          ) / 100,
          context.dayRate,
          context.nightRate,
          context.inputPaidMeterReadings
        );
      console.log('indications888888', indications);

      context.setIndicationsForPayment(indications);
    }
  }, [context.estimatedPaymentAmount]);

  const calculatedPaymentAmountDay =
    Math.round(
      (Number(context.indication.energyMeterReadingsDay) +
        Number(context.indicationsCalculated.energyDay) -
        Number(context.inputPaidMeterReadings.paidMeterReadingsDay)) *
        context.dayRate *
        100
    ) / 100;
  const calculatedPaymentAmountNight =
    Math.round(
      (Number(context.indication.energyMeterReadingsNight) +
        Number(context.indicationsCalculated.energyNight) -
        Number(context.inputPaidMeterReadings.paidMeterReadingsNight)) *
        context.nightRate *
        100
    ) / 100;
  const calculatedPaymentAmount =
    Math.round(
      (calculatedPaymentAmountDay + calculatedPaymentAmountNight) * 100
    ) / 100;

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
                .
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
                Тариф
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
          <TableRow>
            <TableCell
              align="center"
              sx={{
                border: 2,
              }}
            >
              <Typography component="h6" variant="h6">
                Расчетная сумма оплаты
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
                {calculatedPaymentAmountDay}
              </Typography>
            </TableCell>
            <TableCell
              align="center"
              sx={{
                border: 2,
              }}
            >
              <Typography component="h6" variant="h6">
                {calculatedPaymentAmountNight}
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
                Общая сумма
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
              colSpan={2}
              align="center"
              sx={{
                border: 2,
              }}
            >
              <Typography component="h6" variant="h6">
                {calculatedPaymentAmount}
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
                Предполагаемая сумма оплаты
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

            <Cell
              initialValue={context.estimatedPaymentAmount}
              setValue={context.setEstimatedPaymentAmount}
              colSpan={2}
            />
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
