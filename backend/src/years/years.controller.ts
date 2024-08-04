import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';

import { Year } from './year.entity';
import { YearsService } from './years.service';

@Crud({
  model: {
    type: Year,
  },
  params: {
    id: {
      field: 'id',
      type: 'number',
      primary: true,
    },
  },
})
@Controller('years')
export class YearsController implements CrudController<Year> {
  constructor(public service: YearsService) {}
}
