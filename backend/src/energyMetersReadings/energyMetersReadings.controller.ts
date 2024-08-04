import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';

import { EnergyMetersReadings } from './energyMetersReadings.entity';
import { EnergyMetersReadingsService } from './energyMetersReadings.service';

@Crud({
  model: {
    type: EnergyMetersReadings,
  },
  params: {
    id: {
      field: 'id',
      type: 'number',
      primary: true,
    },
  },
})
@Controller('energyMetersReadings')
export class EnergyMetersReadingsController
  implements CrudController<EnergyMetersReadings>
{
  constructor(public service: EnergyMetersReadingsService) {}
}
