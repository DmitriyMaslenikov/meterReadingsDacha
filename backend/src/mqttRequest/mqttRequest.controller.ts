import { Controller, Post, Get, Inject, Body } from '@nestjs/common';
import {
  MessagePattern,
  EventPattern,
  Payload,
  Ctx,
  MqttContext,
  ClientProxy,
} from '@nestjs/microservices';
import { Observable } from 'rxjs/internal/Observable';
import { MqttRequestService } from './mqttRequest.service';

@Controller('mqttRequest')
export class MqttRequestController {
  constructor(
    private readonly MqttRequestService: MqttRequestService,
    @Inject('MQTT_SERVICE') private client: ClientProxy,
  ) {}

  @Post()
  async publish(@Body() data: string) {
    this.MqttRequestService.publish(data);
  }

  @Get()
  async getDat() {
    this.MqttRequestService.getData();

    // return 'YYYYYYY';
  }
}
