import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PaidMetersReadings } from './paidMeterReadings.entity';
import { PaidMetersReadingsService } from './paidMeterReadings.service';
import { PaidMetersReadingsController } from './paidMeterReadings.controller';

import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([PaidMetersReadings]),
    ClientsModule.register([
      {
        name: 'MQTT_SERVICE',
        transport: Transport.MQTT,
        options: {
          url: 'mqtt://192.168.1.60:1883',
          clean: true,
          connectTimeout: 4000,
          username: 'dmitriy',
          password: '626920847',
          reconnectPeriod: 1000,
        },
      },
    ]),
  ],
  providers: [PaidMetersReadingsService],
  exports: [PaidMetersReadingsService],
  controllers: [PaidMetersReadingsController],
})
export class PaidMetersReadingsModule {}
