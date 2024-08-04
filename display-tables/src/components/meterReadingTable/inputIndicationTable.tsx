import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  Button,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { Cell } from '../cell';
import { IndicationInterface } from '../../interfaces/indication';
import { useMainPage } from '../mainPage/mainPageContext';

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
  // const context = useMainPage();

  return (
    <>
      {/* <Button onClick={GetData}>Получить последнии показания с сайта</Button> */}
      <h2>Таблица ввода показаний счетчика</h2>
      <Table
        sx={{
          paddingLeft: '80px',
          border: 4,
          borderRadius: 5,
          width: '500px',
        }}
        aria-label="simple table"
      >
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

            <Cell initialValue={indicationDay} setValue={setIndicationDay} />
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
            />
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
}
