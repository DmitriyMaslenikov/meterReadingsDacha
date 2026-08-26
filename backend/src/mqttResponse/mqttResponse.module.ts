import { Global, Module } from '@nestjs/common';
import { MqttResponseService } from './mqttResponse.service';
import { MqttResponseController } from './mqttResponse.controller';
import { LastRequestedDeviceService } from './lastRequestedDevice.service';

@Global()
@Module({
  providers: [MqttResponseService, LastRequestedDeviceService],
  controllers: [MqttResponseController],
  exports: [MqttResponseService, LastRequestedDeviceService],
})
export class MqttResponseModule {}
