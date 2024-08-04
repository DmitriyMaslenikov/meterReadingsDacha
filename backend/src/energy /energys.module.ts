import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Energy } from './energy.entity';
import { EnergysService } from './energys.service';
import { EnergysController } from './energys.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Energy])],
  providers: [EnergysService],
  exports: [EnergysService],
  controllers: [EnergysController],
})
export class EnergysModule {}
