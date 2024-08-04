import { Controller, Get, Inject } from '@nestjs/common';
import { EnergysMqttService } from './energys.mqtt.service';
import {
  MessagePattern,
  EventPattern,
  Payload,
  Ctx,
  MqttContext,
  ClientProxy,
} from '@nestjs/microservices';

@Controller()
export class EnergysMqttController {
  constructor(
    private readonly EnergysMqttService: EnergysMqttService,
    @Inject('MQTT_SERVICE') private client: ClientProxy,
  ) {}

  @MessagePattern('/energy/responseDayAndTime')
  getNotifications(@Payload() data: any, @Ctx() context: MqttContext) {
    //console.log(`Topic: ${context.getTopic()}`, data.energy);
    const energysDayAndTime = this.EnergysMqttService.findWhere(
      data.date,
      data.time,
    );
    energysDayAndTime.then((value) => {
      if (value.length !== 0) {
        value.forEach((elem) => {
          const indication = {
            id: elem.id,

            inputCircuitBreakerEnergy: data.energy,
          };

          this.EnergysMqttService.insertIndication(indication);
        });
      }
    });
  }
}
