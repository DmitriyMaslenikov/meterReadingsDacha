import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getMqtt } from './function/mqtt';

console.log('FFFFFFF', getMqtt());

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
