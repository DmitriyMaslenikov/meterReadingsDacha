import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';

import { InputCircuitBreakerEnergy } from './inputCircuitBreakerEnergy.entity';
import { InputCircuitBreakerEnergysService } from './inputCircuitBreakerEnergys.service';

@Crud({
  model: {
    type: InputCircuitBreakerEnergy,
  },
  params: {
    id: {
      field: 'id',
      type: 'number',
      primary: true,
    },
  },
})
@Controller('inputCircuitBreakerEnergy')
export class InputCircuitBreakerEnergysController
  implements CrudController<InputCircuitBreakerEnergy>
{
  constructor(public service: InputCircuitBreakerEnergysService) {}
}
