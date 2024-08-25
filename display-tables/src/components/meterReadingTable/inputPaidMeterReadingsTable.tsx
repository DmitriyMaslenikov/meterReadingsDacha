import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  Button,
  TableHead,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { Cell } from '../cell';
import { InputPaidMeterReadingsInterface } from '../../interfaces/inputPaidMeterReadingsInterface';
import { useMainPage } from '../mainPage/mainPageContext';

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
  // const context = useMainPage();

  return (
    <>
      {/* <Button onClick={GetData}>Получить последнии показания с сайта</Button> */}
      <h2>Таблица ввода оплаченных показаний счетчика</h2>
      <Table
        sx={{
          paddingLeft: '80px',
          border: 4,
          borderRadius: 5,
          width: '500px',
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
              <Typography component="h5" variant="h5"></Typography>
            </TableCell>

            <TableCell
              align="center"
              sx={{
                border: 2,
              }}
            >
              <Typography component="h6" variant="h6">
                Показание
              </Typography>
            </TableCell>
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
                День
              </Typography>
            </TableCell>

            <Cell
              initialValue={indicationDay}
              setValue={setIndicationDay}
              colSpan={1}
            />
            <Cell initialValue={rateDay} setValue={setRateDay} colSpan={1} />
          </TableRow>
          <TableRow>
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
          <TableRow>
            <TableCell
              align="center"
              sx={{
                border: 2,
              }}
            >
              <Typography component="h6" variant="h6">
                Сумма оплаты
              </Typography>
            </TableCell>

            <Cell
              initialValue={paymentAmount}
              setValue={setPaymentAmount}
              colSpan={1}
            />
          </TableRow>
          <TableRow></TableRow>
        </TableBody>
      </Table>
    </>
  );
}
