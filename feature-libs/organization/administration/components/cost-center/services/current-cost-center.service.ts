import { Injectable } from '@angular/core';
import { CostCenter, RoutingService } from '@spartacus/core';
import { CostCenterService } from '@spartacus/organization/administration/core';
import { ROUTE_PARAMS } from '@spartacus/organization/administration/root';
import { Observable } from 'rxjs';
import { CurrentItemService } from '../../shared/current-item.service';

@Injectable({
  providedIn: 'root',
})
export class CurrentCostCenterService extends CurrentItemService<CostCenter> {
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

  getError(code: string): Observable<boolean> {
    return this.costCenterService.getErrorState(code);
  }
}
