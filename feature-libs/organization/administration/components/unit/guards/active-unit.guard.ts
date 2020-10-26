import { Injectable } from '@angular/core';
import { GlobalMessageService, RoutingService } from '@spartacus/core';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CurrentUnitService } from '../services/current-unit.service';
import { ROUTE_PARAMS } from '../../constants';
import { ActiveOrganizationItemGuard } from '../../shared/active-organization-item.guard';

@Injectable({
  providedIn: 'root',
})
export class ActiveUnitGuard extends ActiveOrganizationItemGuard {
  constructor(
    protected routingService: RoutingService,
    protected globalMessageService: GlobalMessageService,
    protected currentUnitService: CurrentUnitService
  ) {
    super(routingService, globalMessageService);
  }

  readonly unitCode = ROUTE_PARAMS.unitCode;

  canActivate() {
    return this.currentUnitService.item$.pipe(
      map((item) => {
        if (!this.isValid(item)) {
          this.redirect(item.uid, 'unitDetails', this.unitCode);
          this.showErrorMessage('Unit');
        }
      }),
      catchError(() => {
        return of();
      })
    );
  }
}
