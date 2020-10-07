import { Injectable } from '@angular/core';
import { B2BUnit, RoutingService } from '@spartacus/core';
import {
  OrganizationItemStatus,
  OrgUnitService,
} from '@spartacus/my-account/organization/core';
import { UnitFormService } from '../../../form/unit-form.service';
import { UnitItemService } from '../../../services/unit-item.service';
import { CurrentChildUnitService } from './current-child-unit.service';
import { Observable } from 'rxjs';

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
