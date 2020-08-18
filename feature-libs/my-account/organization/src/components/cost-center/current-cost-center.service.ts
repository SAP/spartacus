import { Injectable } from '@angular/core';
import {
  Budget,
  CostCenter,
  CostCenterService,
  RoutingService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { ROUTE_PARAMS } from '../constants';
import { CurrentOrganizationService } from '../shared/base-current.service';

@Injectable({
  providedIn: 'root',
})
export class CurrentCostCenterService extends CurrentOrganizationService<
  CostCenter
> {
  constructor(
    protected routingService: RoutingService,
    protected costCenterService: CostCenterService
  ) {
    super(routingService);
  }

  protected getParam() {
    return ROUTE_PARAMS.costCenterCode;
  }

  protected getModel(code: string): Observable<Budget> {
    return this.costCenterService.get(code);
  }
}
