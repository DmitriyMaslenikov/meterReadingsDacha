import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';

import { Energy } from './energy.entity';
import { EnergysService } from './energys.service';

@Crud({
  model: {
    type: Energy,
  },
  params: {
    id: {
      field: 'id',
      type: 'number',
      primary: true,
    },
  },
})
@Controller('energys')
export class EnergysController implements CrudController<Energy> {
  constructor(public service: EnergysService) {}
}
