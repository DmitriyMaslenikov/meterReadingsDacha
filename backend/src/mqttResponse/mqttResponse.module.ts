import { Global, Module } from '@nestjs/common';
import { MqttResponseService } from './mqttResponse.service';
import { MqttResponseController } from './mqttResponse.controller';

@Global()
@Module({
  providers: [MqttResponseService],
  controllers: [MqttResponseController],
  exports: [MqttResponseService],
})
export class MqttResponseModule {}
