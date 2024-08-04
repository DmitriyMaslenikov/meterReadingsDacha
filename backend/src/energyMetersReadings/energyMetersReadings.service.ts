import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { EnergyMetersReadings } from './energyMetersReadings.entity';

@Injectable()
export class EnergyMetersReadingsService extends TypeOrmCrudService<EnergyMetersReadings> {
  constructor(@InjectRepository(EnergyMetersReadings) repo) {
    super(repo);
  }
}
