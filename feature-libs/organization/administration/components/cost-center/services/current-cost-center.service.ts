import { Injectable } from '@angular/core';
import { CostCenter, RoutingService } from '@spartacus/core';
import { CostCenterService } from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { ROUTE_PARAMS } from '../../constants';
import { CurrentOrganizationItemService } from '../../shared/current-organization-item.service';

@Injectable({
  providedIn: 'root',
})
export class CurrentCostCenterService extends CurrentOrganizationItemService<
  CostCenter
> {
  constructor(
    protected routingService: RoutingService,
    protected costCenterService: CostCenterService
  ) {
    super(routingService);
  }

  protected getParamKey() {
    return ROUTE_PARAMS.costCenterCode;
  }

  protected getItem(code: string): Observable<CostCenter> {
    return this.costCenterService.get(code);
  }

  hasError(code: string): Observable<boolean> {
    return this.costCenterService.getErrorState(code);
  }
}
