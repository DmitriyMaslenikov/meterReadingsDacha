import { Typography, Container, Button } from '@mui/material';
import { useState } from 'react';
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
      <MeterReadingsTable />
      <Button
        onClick={OpenDialogIndication}
        sx={{
          border: 3,
          backgroundColor: 'rgb(242, 248, 246)',
          marginLeft: 5,
        }}
      >
        {' '}
        Открыть диалог для ввода показаний{' '}
      </Button>
      <Button
        onClick={OpenDialogInputPaidMeterReadings}
        sx={{
          border: 3,
          backgroundColor: 'rgb(242, 248, 246)',
          marginLeft: 15,
          marginRight: 5,
        }}
      >
        Открыть диалог для ввода оплаченных показаний
      </Button>{' '}
      <PaymentCalculationTable />
      <Typography variant="h5" component="h2">
        Таблица показаний для оплаты{' '}
      </Typography>
      <PaymentTable />
    </Container>
  );
};
