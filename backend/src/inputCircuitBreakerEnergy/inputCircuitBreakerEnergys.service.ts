import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { InputCircuitBreakerEnergy } from './inputCircuitBreakerEnergy.entity';

@Injectable()
export class InputCircuitBreakerEnergysService extends TypeOrmCrudService<InputCircuitBreakerEnergy> {
  constructor(@InjectRepository(InputCircuitBreakerEnergy) repo) {
    super(repo);
  }
}
