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

@Injectable()
export class MqttRequestService {
  constructor(
    // private readonly EnergysMqttService: EnergysMqttService,
    @Inject('MQTT_SERVICE') private client: ClientProxy,
  ) {}

  async publish(data) {
    console.log('data', data);

    let payload: string = '';
    switch (data.topic) {
      case '/energy/dayAndTime':
        payload = `{"date":"${data.date}", "time":"${data.time}", "device": "dinSmartRelay"}`;
        break;

      case '/energy/days':
        payload = `{ "startDay":"${data.dateStart}", "endDay":"${data.dateAnd}", "device": "${data.device}" , "time": "${data.time}"}`;
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
