import { Injectable } from '@angular/core';
import { CostCenter, RoutingService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CostCenterService } from '../../core/services/cost-center.service';
import { ROUTE_PARAMS } from '../constants';
import { CurrentItemService } from '../shared/current-item.service';

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
}
