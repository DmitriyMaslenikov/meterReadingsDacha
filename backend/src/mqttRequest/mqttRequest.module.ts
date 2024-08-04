import { Module } from '@nestjs/common';
import { MqttRequestController } from './mqttRequest.controller';
//import { CatsService } from './cats.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MqttRequestService } from './mqttRequest.service';

@Module({
  imports: [
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
  controllers: [MqttRequestController],
  providers: [MqttRequestService],
  exports: [MqttRequestService],
})
export class MqttRequestModule {}
