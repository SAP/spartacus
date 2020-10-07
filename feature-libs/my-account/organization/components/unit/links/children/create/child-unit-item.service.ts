import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { B2BUnit, RoutingService } from '@spartacus/core';
import { OrgUnitService } from '@spartacus/my-account/organization/core';
import { UnitFormService } from '../../../form/unit-form.service';
import { UnitItemService } from '../../../services/unit-item.service';
import { CurrentChildUnitService } from './current-child-unit.service';

@Injectable({
  providedIn: 'root',
})
export class ChildUnitItemService extends UnitItemService {
  constructor(
    protected currentItemService: CurrentChildUnitService,
    protected routingService: RoutingService,
    protected formService: UnitFormService,
    protected unitService: OrgUnitService
  ) {
    super(currentItemService, routingService, formService, unitService);
  }

  save(form: FormGroup, key?: string) {
    form.get('parentOrgUnit').enable();
    super.save(form, key);
  }

  /**
   * @override
   * Returns 'unitDetails'
   */
  protected getDetailsRoute(): string {
    return 'orgUnitChildren';
  }

  protected getRouteParams(item: B2BUnit) {
    return { uid: item.parentOrgUnit.uid };
  }
}
