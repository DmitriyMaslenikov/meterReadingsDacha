import { Controller, Get } from '@nestjs/common';
import { MqttResponseService } from './mqttResponse.service';

@Controller('mqttResponse')
export class MqttResponseController {
  constructor(private readonly mqttResponseService: MqttResponseService) {}

  @Get('dayAndTimeAll')
  getDayAndTimeAll() {
    return this.mqttResponseService.get('/energy/responseDayAndTimeAll');
  }
}
