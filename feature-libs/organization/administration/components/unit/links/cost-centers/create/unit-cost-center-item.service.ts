import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CostCenter } from '@spartacus/core';
import { CostCenterItemService } from '../../../../cost-center/services/cost-center-item.service';

@Injectable({
  providedIn: 'root',
})
export class UnitCostCenterItemService extends CostCenterItemService {
  save(form: FormGroup, key?: string) {
    // we enable the unit so that the underlying
    // save method can read the complete form.value.
    form.get('unit').enable();
    return super.save(form, key);
  }

  /**
   * @override
   * Returns 'orgUnitCostCenters'
   */
  protected getDetailsRoute(): string {
    return 'orgUnitCostCenters';
  }

  protected getRouteParams(item: CostCenter) {
    return { uid: item.unit.uid };
  }
}
