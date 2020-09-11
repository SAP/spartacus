import { Injectable } from '@angular/core';
import { B2BUnit, RoutingService } from '@spartacus/core';
import { OrgUnitService } from '@spartacus/my-account/organization/core';
import { Observable } from 'rxjs';
import { ROUTE_PARAMS } from '../constants';
import { CurrentOrganizationItemService } from '../shared/current-organization-item.service';

@Injectable({
  providedIn: 'root',
})
export class CurrentUnitService extends CurrentOrganizationItemService<
  B2BUnit
> {
  constructor(
    protected routingService: RoutingService,
    protected orgUnitService: OrgUnitService
  ) {
    super(routingService);
  }

  protected getParamKey() {
    return ROUTE_PARAMS.unitCode;
  }

  protected getItem(code: string): Observable<B2BUnit> {
    return this.orgUnitService.get(code);
  }
}
