import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {
  MessagePattern,
  Payload,
  Ctx,
  MqttContext,
} from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @MessagePattern({ cmd: '/energy/response' })
  // accumulate(data: number[]): number {
  //   console.log('rrrrrr', data);
  //   return (data || []).reduce((a, b) => a + b);
  // }
  @MessagePattern('/energy/response')
  getNotifications(@Payload() data: number[], @Ctx() context: MqttContext) {
    console.log(`Topic: ${context.getTopic()}`);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
