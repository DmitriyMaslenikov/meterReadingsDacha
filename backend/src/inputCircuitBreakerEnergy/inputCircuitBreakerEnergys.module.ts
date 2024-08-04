import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InputCircuitBreakerEnergy } from './inputCircuitBreakerEnergy.entity';
import { InputCircuitBreakerEnergysService } from './inputCircuitBreakerEnergys.service';
import { InputCircuitBreakerEnergysController } from './inputCircuitBreakerEnergys.controller';
import { InputCircuitBreakerEnergysMqttService } from './inputCircuitBreakerEnergy.mqtt.service';
import { InputCircuitBreakerEnergyMqttController } from './inputCircuitBreakerEnergy.mqtt.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([InputCircuitBreakerEnergy]),
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
  providers: [
    InputCircuitBreakerEnergysService,
    InputCircuitBreakerEnergysMqttService,
  ],
  exports: [
    InputCircuitBreakerEnergysService,
    InputCircuitBreakerEnergysMqttService,
  ],
  controllers: [
    InputCircuitBreakerEnergysController,
    InputCircuitBreakerEnergyMqttController,
  ],
})
export class InputCircuitBreakerEnergysModule {}
