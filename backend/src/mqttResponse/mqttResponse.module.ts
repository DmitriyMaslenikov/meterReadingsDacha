import { Global, Module } from '@nestjs/common';
import { MqttResponseService } from './mqttResponse.service';
import { MqttResponseController } from './mqttResponse.controller';
import { PendingDeviceRequestService } from './pendingDeviceRequest.service';

@Global()
@Module({
  providers: [MqttResponseService, PendingDeviceRequestService],
  controllers: [MqttResponseController],
  exports: [MqttResponseService, PendingDeviceRequestService],
})
export class MqttResponseModule {}
