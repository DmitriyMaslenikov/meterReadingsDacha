import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import {
  MessagePattern,
  EventPattern,
  Payload,
  Ctx,
  MqttContext,
  ClientProxy,
} from '@nestjs/microservices';
import { Observable } from 'rxjs/internal/Observable';
import { LastRequestedDeviceService } from '../mqttResponse/lastRequestedDevice.service';

@Injectable()
export class MqttRequestService {
  constructor(
    // private readonly EnergysMqttService: EnergysMqttService,
    @Inject('MQTT_SERVICE') private client: ClientProxy,
    private readonly lastRequestedDevice: LastRequestedDeviceService,
  ) {}

  async publish(data) {
    console.log('data', data);

    let payload: string = '';
    switch (data.topic) {
      case '/energy/dayAndTime':
        payload = `{"date":"${data.date}", "time":"${data.time}", "device": "dinSmartRelay"}`;
        break;

      case '/energy/dayAndTimeAll':
        payload = `{"date":"${data.date}", "time":"${data.time}"}`;
        break;

      case '/energy/days':
        payload = `{ "startDay":"${data.dateStart}", "endDay":"${data.dateAnd}", "device": "${data.device}" , "time": "${data.time}"}`;
        this.lastRequestedDevice.set(data.device);
        break;
    }
    const pattern = data.topic;

    this.client.emit<number>(pattern, payload);
  }

  async getData() {
    // console.log('data', data);
    const data = {
      topic: '/energy/dayAndTime',
      date: '2024-06-27',
      time: '12:00',
      device: 'dinSmartRelay',
    };

    await this.publish(data);

    return 'Hello';
  }
}
