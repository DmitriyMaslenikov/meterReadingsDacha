import {
  Box,
  Button,
  Container,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { MeterReadingsTable } from '../meterReadingTable/meterReadingTable';
import { InputIndicationDialog } from '../dialog/inputIndicationDialog';
import { InputPaidMeterReadingsDialog } from '../dialog/inputPaidMeterReadingsDialog';
import { PaymentCalculationTable } from '../meterReadingTable/paymentCalculationTable';
import { PaymentTable } from '../meterReadingTable/paymentТable';
import { InputConsumptionСalculationDialog } from '../dialog/inputConsumptionСalculation';
import { GettingReadingsForDateAndTimeDialog } from '../dialog/gettingReadingsForDateAndTimeDialog';
import { SectionCard } from '../ui/sectionCard';
import { ConsumptionCalendar } from '../calendar/consumptionCalendar';
import { Summary } from './summary';
import { DevicePage } from '../device/devicePage';
import { useMainPage } from './mainPageContext';

const BoltIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M13 2 4.5 13.5H11l-1 8.5 8.5-11.5H12l1-8.5Z" fill="currentColor" />
  </svg>
);

export const Page = () => {
  const context = useMainPage();

  const [tab, setTab] = useState(0);
  const [visibleDialogIndication, setVisibleDialogIndication] = useState(false);
  const [
    visibleDialogInputPaidMeterReadings,
    setVisibleDialogInputPaidMeterReadings,
  ] = useState(false);
  const [
    visibleDialogInputConsumptionСalculation,
    setVisibleDialogInputConsumptionСalculation,
  ] = useState(false);
  const [
    visibleDialogGettingReadingsForDateAndTime,
    setVisibleDialogGettingReadingsForDateAndTime,
  ] = useState(false);

  const OpenDialogIndication = () => {
    setVisibleDialogIndication(true);
  };
  const OpenDialogInputPaidMeterReadings = () => {
    setVisibleDialogInputPaidMeterReadings(true);
  };
  const OpenDialogInputConsumptionСalculation = () => {
    setVisibleDialogInputConsumptionСalculation(true);
  };
  const OpenDialogGettingReadingsForDateAndTime = () => {
    setVisibleDialogGettingReadingsForDateAndTime(true);
  };

  return (
    <Box sx={{ minHeight: '100vh', pb: 8 }}>
      <InputIndicationDialog
        visibleDialog={visibleDialogIndication}
        setVisibleDialog={setVisibleDialogIndication}
      />
      <InputPaidMeterReadingsDialog
        visibleDialog={visibleDialogInputPaidMeterReadings}
        setVisibleDialog={setVisibleDialogInputPaidMeterReadings}
      />
      <InputConsumptionСalculationDialog
        visibleDialog={visibleDialogInputConsumptionСalculation}
        setVisibleDialog={setVisibleDialogInputConsumptionСalculation}
      />
      <GettingReadingsForDateAndTimeDialog
        visibleDialog={visibleDialogGettingReadingsForDateAndTime}
        setVisibleDialog={setVisibleDialogGettingReadingsForDateAndTime}
      />

      <Box
        component="header"
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          borderBottom: 1,
          borderColor: 'divider',
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255, 255, 255, 0.75)',
          '@media print': { display: 'none' },
        }}
      >
        <Container maxWidth="lg">
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            sx={{ py: 1.75 }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2.5,
                display: 'grid',
                placeItems: 'center',
                color: '#fff',
                background:
                  'linear-gradient(135deg, #2563EB 0%, #6366F1 60%, #0EA5E9 100%)',
                boxShadow: '0 10px 20px -10px rgba(37, 99, 235, 0.8)',
              }}
            >
              <BoltIcon />
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" component="h1" sx={{ lineHeight: 1.2 }}>
                Учёт электроэнергии
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Показания счётчика и расчёт оплаты
              </Typography>
            </Box>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              Обновлено: {context.indication.date} {context.indication.time}
            </Typography>
          </Stack>
          <Tabs
            value={tab}
            onChange={(_, value) => setTab(value)}
            sx={{ minHeight: 40, '& .MuiTab-root': { minHeight: 40 } }}
          >
            <Tab label="Главная" />
            <Tab label="Баня" />
            <Tab label="Розетка 1" />
            <Tab label="Розетка 2" />
            <Tab label="Розетка 3" />
          </Tabs>
        </Container>
      </Box>

      {tab === 1 && (
        <DevicePage
          device="dinSmartRelay"
          channel="energy2"
          meterTitle="Счётчик бани"
          meterLabel="Автомат Баня"
          calendarTitle="Календарь потребления бани"
        />
      )}

      {tab === 2 && (
        <DevicePage
          device="smartPlug1Energy"
          channel="energy3"
          meterTitle="Счётчик розетки 1"
          meterLabel="Розетка1"
          calendarTitle="Календарь потребления розетки 1"
        />
      )}

      {tab === 3 && (
        <DevicePage
          device="smartPlug2Energy"
          channel="energy4"
          meterTitle="Счётчик розетки 2"
          meterLabel="Розетка2"
          calendarTitle="Календарь потребления розетки 2"
          factor={0.001}
        />
      )}

      {tab === 4 && (
        <DevicePage
          device="smartPlug3Energy"
          channel="energy5"
          meterTitle="Счётчик розетки 3"
          meterLabel="Розетка 3"
          calendarTitle="Календарь потребления розетки 3"
          factor={0.001}
        />
      )}

      <Container
        maxWidth="lg"
        sx={{ pt: 4, display: tab === 0 ? 'block' : 'none' }}
      >
        <Stack spacing={3.5}>
          <Summary />

          <SectionCard
            title="Показания счётчика"
            subtitle="Последние, расчётные и оплаченные показания"
            actions={
              <>
                <Button variant="contained" onClick={OpenDialogIndication}>
                  Ввести показания
                </Button>
                <Button
                  variant="outlined"
                  onClick={OpenDialogInputPaidMeterReadings}
                >
                  Оплаченные показания
                </Button>
                <Button
                  variant="text"
                  onClick={OpenDialogGettingReadingsForDateAndTime}
                >
                  На дату и время
                </Button>
              </>
            }
          >
            <MeterReadingsTable />
          </SectionCard>

          <ConsumptionCalendar />

          <SectionCard
            title="Расчёт оплаты"
            subtitle="Тарифы, расчётная и предполагаемая сумма"
            actions={
              <Button
                variant="outlined"
                onClick={OpenDialogInputConsumptionСalculation}
              >
                Расход за период
              </Button>
            }
          >
            <PaymentCalculationTable />
          </SectionCard>

          <SectionCard
            title="Показания для оплаты"
            subtitle="Готовая таблица для печати и передачи"
          >
            <PaymentTable />
          </SectionCard>
        </Stack>
      </Container>
    </Box>
  );
};
