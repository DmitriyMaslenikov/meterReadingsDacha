import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EnergyMetersReadings } from './energyMetersReadings.entity';
import { EnergyMetersReadingsService } from './energyMetersReadings.service';
import { EnergyMetersReadingsController } from './energyMetersReadings.controller';
import { EnergysMqttService } from './energys.mqtt.service';
import { EnergysMqttController } from './energy.mqtt.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([EnergyMetersReadings]),
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
  providers: [EnergyMetersReadingsService, EnergysMqttService],
  exports: [EnergyMetersReadingsService, EnergysMqttService],
  controllers: [EnergyMetersReadingsController, EnergysMqttController],
})
export class EnergyMetersReadingsModule {}
