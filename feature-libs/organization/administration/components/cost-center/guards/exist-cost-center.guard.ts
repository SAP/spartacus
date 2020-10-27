import { Injectable } from '@angular/core';
import { GlobalMessageService, RoutingService } from '@spartacus/core';
import { CostCenterService } from '@spartacus/organization/administration/core';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ExistOrganizationItemGuard } from '../../shared/exist-organization-item.guard';
import { CurrentCostCenterService } from '../services/current-cost-center.service';

@Injectable({
  providedIn: 'root',
})
export class ExistCostCenterGuard extends ExistOrganizationItemGuard {
  constructor(
    protected costCenterService: CostCenterService,
    protected globalMessageService: GlobalMessageService,
    protected routingService: RoutingService,
    protected currentCostCenterService: CurrentCostCenterService
  ) {
    super(routingService, globalMessageService);
  }

  canActivate() {
    return this.currentCostCenterService.key$.pipe(
      switchMap((code) => this.costCenterService.getErrorState(code)),
      map((error) => {
        if (error) {
          this.redirect('costCenters');
          this.showErrorMessage('CostCenter');
        }
      }),
      catchError(() => {
        return of();
      })
    );
  }
}
