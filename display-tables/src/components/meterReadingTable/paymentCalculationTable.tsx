import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Button,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { Cell } from '../cell';
import { IndicationInterface } from '../../interfaces/indication';
import { useMainPage } from '../mainPage/mainPageContext';
//   import { getIndicationDtek } from '../../api/indications';
//   import { IndicationDtekDialog } from '../dialog/indicationDtekDialog';
import { CalculatedMeterReadings } from '../../functions/calculatedMeterReadings';

export function PaymentCalculationTable() {
  console.log('Изменение записи');
  const context = useMainPage();
  console.log('context ', context.visibleDialog, context.indication);
  // const [visibleDialog, setVisibleDialog] = useState(false);
  // const [data, setData] = useState({
  //   date: '',
  //   indicationDay: '',
  //   indicationNight: '',
  // });
  const [dayRate, setDayRate] = useState(0);
  const [nightRate, setNightRate] = useState(0);

  useEffect(() => {
    setEnergyMeterReadingsDay(
      Number(context.indication.energyMeterReadingsDay)
    );
    setEnergyMeterReadingsNight(
      Number(context.indication.energyMeterReadingsNight)
    );
  }, [context.indication]);

  const [energyMeterReadingsDay, setEnergyMeterReadingsDay] = useState(
    context.indication.energyMeterReadingsDay
  );

  const [energyMeterReadingsNight, setEnergyMeterReadingsNight] = useState(
    context.indication.energyMeterReadingsNight
  );

  // useEffect(() => {
  //   const value: number = {
  //     id: context.indication.id,
  //     date: '2024-02-01',
  //     time: '23-00',
  //     energyMeterReadingsDay: energyMeterReadingsDay,
  //     energyMeterReadingsNight: energyMeterReadingsNight,
  //     inputCircuitBreakerEnergy: 0,
  //   };
  //   context.setIndication(value);
  // }, [context.dayRate, energyMeterReadingsNight]);

  // const GetData = async () => {
  //   const data = (await getIndicationDtek()).data;
  //   setData(data);
  //   setVisibleDialog(true);
  // };
  // const CloseDialog = () => {
  //   setVisibleDialog(false);
  // };
  // const SaveIndicatin = () => {
  //   setOrelDay(data.indicationDay);
  //   setOrelNight(data.indicationNight);
  //   setVisibleDialog(false);
  // };

  return (
    <>
      {/* <IndicationDtekDialog
          data={data}
          visibleDialog={visibleDialog}
          CloseDialog={CloseDialog}
          SaveIndicatin={SaveIndicatin}
        /> */}

      {/* <Button onClick={GetData}>Получить последнии показания с сайта</Button> */}

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
                {context.indicationsCalculated.data}
              </Typography>
            </TableCell>

            <Cell initialValue={dayRate} setValue={setDayRate} />
            <Cell initialValue={nightRate} setValue={setNightRate} />
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
                {context.indicationsCalculated.data}
              </Typography>
            </TableCell>

            <TableCell
              align="center"
              sx={{
                border: 2,
              }}
            >
              <Typography component="h6" variant="h6">
                {(Number(context.indication.energyMeterReadingsDay) +
                  Number(context.indicationsCalculated.energyDay) -
                  Number(context.inputPaidMeterReadings.paidMeterReadingsDay)) *
                  dayRate}
              </Typography>
            </TableCell>
            <TableCell
              align="center"
              sx={{
                border: 2,
              }}
            >
              <Typography component="h6" variant="h6">
                {(Number(context.indication.energyMeterReadingsNight) +
                  Number(context.indicationsCalculated.energyNight) -
                  Number(
                    context.inputPaidMeterReadings.paidMeterReadingsNight
                  )) *
                  nightRate}
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
                {context.indicationsCalculated.data}
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
                {context.inputPaidMeterReadings.paidMeterReadingsNight}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
}
