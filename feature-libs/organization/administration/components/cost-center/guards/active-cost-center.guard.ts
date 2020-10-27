import { Injectable } from '@angular/core';
import { GlobalMessageService, RoutingService } from '@spartacus/core';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CurrentCostCenterService } from '../services/current-cost-center.service';
import { ROUTE_PARAMS } from '../../constants';
import { ActiveOrganizationItemGuard } from '../../shared/active-organization-item.guard';

@Injectable({
  providedIn: 'root',
})
export class ActiveCostCenterGuard extends ActiveOrganizationItemGuard {
  constructor(
    protected routingService: RoutingService,
    protected globalMessageService: GlobalMessageService,
    protected currentCostCenterService: CurrentCostCenterService
  ) {
    super(routingService, globalMessageService);
  }

  readonly costCenterCode = ROUTE_PARAMS.costCenterCode;

  canActivate() {
    return this.currentCostCenterService.item$.pipe(
      map((item) => {
        if (!this.isValid(item)) {
          this.redirect(item.code, 'costCenterDetails', this.costCenterCode);
          this.showErrorMessage('CostCenter');
        }
      }),
      catchError(() => {
        return of();
      })
    );
  }
}
