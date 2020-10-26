import { Injectable } from '@angular/core';
import { GlobalMessageService, RoutingService } from '@spartacus/core';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CurrentUserService } from '../services/current-user.service';
import { ROUTE_PARAMS } from '../../constants';
import { ActiveOrganizationItemGuard } from '../../shared/active-organization-item.guard';

@Injectable({
  providedIn: 'root',
})
export class ActiveUserGuard extends ActiveOrganizationItemGuard {
  constructor(
    protected routingService: RoutingService,
    protected globalMessageService: GlobalMessageService,
    protected currentUserService: CurrentUserService
  ) {
    super(routingService, globalMessageService);
  }

  readonly userCode = ROUTE_PARAMS.userCode;

  canActivate() {
    return this.currentUserService.item$.pipe(
      map((item) => {
        if (!this.isValid(item)) {
          this.redirect(item.customerId, 'userDetails', this.userCode);
          this.showErrorMessage('User');
        }
      }),
      catchError(() => {
        return of();
      })
    );
  }
}
