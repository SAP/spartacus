import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CostCenterItemService } from '../../../../cost-center/services/cost-center-item.service';
import { CurrentUnitService } from '../../../services/current-unit.service';
import { UnitCostCenterItemService } from './unit-cost-center-item.service';

@Component({
  selector: 'cx-org-unit-cost-center-create',
  templateUrl: './unit-cost-center-create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'content-wrapper' },
  providers: [
    // we provide a specific version of the `CostCenterItemService` to
    // let the form component work with unit cost centers.
    {
      provide: CostCenterItemService,
      useExisting: UnitCostCenterItemService,
    },
  ],
})
export class UnitCostCenterCreateComponent {
  unitKey$: Observable<string> = this.unitService.key$;
  constructor(protected unitService: CurrentUnitService) {}
}
