import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';

import { PaidMetersReadings } from './paidMeterReadings.entity';
import { PaidMetersReadingsService } from './paidMeterReadings.service';

@Crud({
  model: {
    type: PaidMetersReadings,
  },
  params: {
    id: {
      field: 'id',
      type: 'number',
      primary: true,
    },
  },
})
@Controller('paidMetersReadings')
export class PaidMetersReadingsController
  implements CrudController<PaidMetersReadings>
{
  constructor(public service: PaidMetersReadingsService) {}
}
