import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CostCenterItemService } from '../../../../cost-center/services/cost-center-item.service';
import { UnitCostCenterItemService } from './unit-cost-center-item.service';

@Component({
  templateUrl: './unit-cost-center-create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    // we provide a specific version of the `CostCenterItemService` to
    // let the form component work with unit cost centers.
    {
      provide: CostCenterItemService,
      useExisting: UnitCostCenterItemService,
    },
  ],
})
export class UnitCostCenterCreateComponent {}
