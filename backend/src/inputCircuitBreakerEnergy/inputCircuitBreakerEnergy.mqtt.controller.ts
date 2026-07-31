import { Controller, Get, Inject } from '@nestjs/common';
import { InputCircuitBreakerEnergysMqttService } from './inputCircuitBreakerEnergy.mqtt.service';
import {
  MessagePattern,
  EventPattern,
  Payload,
  Ctx,
  MqttContext,
  ClientProxy,
} from '@nestjs/microservices';

@Controller()
export class InputCircuitBreakerEnergyMqttController {
  constructor(
    private readonly InputCircuitBreakerEnergysMqttService: InputCircuitBreakerEnergysMqttService,
    @Inject('MQTT_SERVICE') private client: ClientProxy,
  ) {}

  @MessagePattern('/energy/response')
  getNotifications(@Payload() data: any, @Ctx() context: MqttContext) {
    console.log(`Topic: ${context.getTopic()}`, data);

    this.InputCircuitBreakerEnergysMqttService.insert(data);
  }
}
