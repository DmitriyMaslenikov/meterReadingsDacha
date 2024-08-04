import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

import { MqttClient } from './function/mqttClient';
import { GetInterval } from './function/getInterval';

// MqttClient();

// MqttClient().publish(
//   '/energy/days',

//   '{"startDay":"2024-04-06", "endDay":"2024-04-19"}',
//   { qos: 0, retain: false },
//   (error) => {
//     if (error) {
//       console.error(error);
//     }
//   },
// );

// const aas = MqttClient().on('message', (topicResponse, payload) => {
//   console.log('Received Message:', topicResponse, payload.toString());
// });

// GetInterval();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const microservice = await app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.MQTT,
    options: {
      url: process.env.MQTT_URL,
      connectTimeout: 4000,
      username: process.env.MQTT_USER_NAME,
      password: process.env.MQTT_PASSWORD,
      reconnectPeriod: 1000,
    },
  });
  app.enableCors();
  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
