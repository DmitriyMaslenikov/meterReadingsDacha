import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { PaidMetersReadings } from './paidMeterReadings.entity';

@Injectable()
export class PaidMetersReadingsService extends TypeOrmCrudService<PaidMetersReadings> {
  constructor(@InjectRepository(PaidMetersReadings) repo) {
    super(repo);
  }
}
