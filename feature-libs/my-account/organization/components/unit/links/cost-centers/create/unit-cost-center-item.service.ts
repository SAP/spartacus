import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CostCenter, RoutingService } from '@spartacus/core';
import { CostCenterService } from '@spartacus/my-account/organization/core';
import { CurrentCostCenterService } from 'feature-libs/my-account/organization/components/cost-center/services/current-cost-center.service';
import { CostCenterFormService } from '../../../../cost-center/form/cost-center-form.service';
import { CostCenterItemService } from '../../../../cost-center/services/cost-center-item.service';

@Injectable({
  providedIn: 'root',
})
export class UnitCostCenterItemService extends CostCenterItemService {
  constructor(
    protected currentItemService: CurrentCostCenterService,
    protected routingService: RoutingService,
    protected formService: CostCenterFormService,
    protected costCenterService: CostCenterService
  ) {
    super(currentItemService, routingService, formService, costCenterService);
  }

  save(form: FormGroup, key?: string) {
    // we enable the unit so that the underlying
    // save method can read the complete form.value.
    form.get('unit').enable();
    super.save(form, key);
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
