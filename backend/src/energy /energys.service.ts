import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { Energy } from './energy.entity';

@Injectable()
export class EnergysService extends TypeOrmCrudService<Energy> {
  constructor(@InjectRepository(Energy) repo) {
    super(repo);
  }
}
