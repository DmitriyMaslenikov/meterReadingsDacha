import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnergysModule } from './energy /energys.module';
import { Energy } from './energy /energy.entity';
import { EnergyMetersReadingsModule } from './energyMetersReadings/energyMetersReadings.module';
import { EnergyMetersReadings } from './energyMetersReadings/energyMetersReadings.entity';
import { Year } from './years/year.entity';
import { YearsModule } from './years/years.module';
import { DataSource } from 'typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MqttRequestModule } from './mqttRequest/mqttRequest.module';
import { InputCircuitBreakerEnergysModule } from './inputCircuitBreakerEnergy/inputCircuitBreakerEnergys.module';
import { InputCircuitBreakerEnergy } from './inputCircuitBreakerEnergy/inputCircuitBreakerEnergy.entity';
import { PaidMetersReadings } from './paidMeterReadings/paidMeterReadings.entity';
import { PaidMetersReadingsModule } from './paidMeterReadings/paidMeterReadings.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    EnergysModule,
    EnergyMetersReadingsModule,
    InputCircuitBreakerEnergysModule,
    YearsModule,
    MqttRequestModule,
    PaidMetersReadingsModule,
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

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER_NAME,
      password: process.env.DB_USER_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        Energy,
        EnergyMetersReadings,
        PaidMetersReadings,
        InputCircuitBreakerEnergy,
        Year,
      ],
      synchronize: true,
      logging: true,
    }),
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
