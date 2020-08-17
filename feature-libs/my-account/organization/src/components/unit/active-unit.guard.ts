import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { OrgUnitService, RoutingService, B2BUnit } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class ActiveUnitGuard implements CanActivate {
  constructor(
    protected unitService: OrgUnitService,
    protected routingService: RoutingService
  ) {}

  canActivate(activatedRoute: ActivatedRouteSnapshot): Observable<boolean> {
    const code = activatedRoute.params['code'];
    return this.unitService.get(code).pipe(
      map((unit) => {
        if (unit && this.isActive(unit)) {
          return true;
        }

        this.routingService.go({ cxRoute: 'orgUnits' });
        return false;
      })
    );
  }

  protected isActive(unit: B2BUnit): boolean {
    return unit.active;
  }
}
