import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CostCenterService, RoutingService, CostCenter } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class ActiveCostCenterGuard implements CanActivate {
  constructor(
    protected costCenterService$: CostCenterService,
    protected routingService: RoutingService,
  ) {}

  canActivate(activatedRoute: ActivatedRouteSnapshot): Observable<boolean> {
    const code = activatedRoute.params['code'];
    return this.costCenterService$.get(code).pipe(
      map((costCenter) => {
        if (costCenter && this.isActive(costCenter)) {
          return true;
        }

        this.routingService.go({ cxRoute: 'costCenter' });
        return false;
      })
    );
  }

  protected isActive(costCenter: CostCenter): boolean {
    return costCenter.active;
  }
}
