import {
  Typography,
  Container,
  Button,
  Paper,
  TableContainer,
  Divider,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { MeterReadingsTable } from '../meterReadingTable/meterReadingTable';
import { InputIndicationDialog } from '../dialog/inputIndicationDialog';
import { InputPaidMeterReadingsDialog } from '../dialog/inputPaidMeterReadingsDialog';
import { PaymentCalculationTable } from '../meterReadingTable/paymentCalculationTable';
import { PaymentTable } from '../meterReadingTable/paymentТable';

export const Page = () => {
  const [visibleDialogIndication, setVisibleDialogIndication] = useState(false);
  const [
    visibleDialogInputPaidMeterReadings,
    setVisibleDialogInputPaidMeterReadings,
  ] = useState(false);

  const OpenDialogIndication = () => {
    setVisibleDialogIndication(true);
  };
  const OpenDialogInputPaidMeterReadings = () => {
    setVisibleDialogInputPaidMeterReadings(true);
  };
  const [indicationsForPayment, setIndicationsForPayment] = useState({
    indicationDay: 0,
    indicationNight: 0,
  });

  return (
    <Container sx={{ paddingLeft: '25px' }}>
      <InputIndicationDialog
        visibleDialog={visibleDialogIndication}
        setVisibleDialog={setVisibleDialogIndication}
      />
      <InputPaidMeterReadingsDialog
        visibleDialog={visibleDialogInputPaidMeterReadings}
        setVisibleDialog={setVisibleDialogInputPaidMeterReadings}
      />
      <Container
        sx={{
          right: 1000,
        }}
        maxWidth="sm"
        fixed
      >
        <Typography variant="h5" component="h2">
          Выбор периода
        </Typography>

        <Divider sx={{ paddingTop: '15px' }} light={false} />
      </Container>

      <Divider sx={{ paddingTop: '20px' }} />
      <MeterReadingsTable />
      <Button onClick={OpenDialogIndication}>
        {' '}
        Открыть диалог для ввода показаний{' '}
      </Button>
      <Button onClick={OpenDialogInputPaidMeterReadings}>
        Открыть диалог для ввода оплаченных показаний
      </Button>
      <PaymentCalculationTable />
      <Typography variant="h5" component="h2">
        Таблица показаний для оплаты{' '}
        {/* {context.months[Number(context.month) - 1].title}{' '}
          {context.years[Number(context.year) - 1].title} года */}
      </Typography>

      <PaymentTable />
    </Container>
  );
};
