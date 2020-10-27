import { Injectable } from '@angular/core';
import { GlobalMessageService, RoutingService } from '@spartacus/core';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CurrentPermissionService } from '../services/current-permission.service';
import { ROUTE_PARAMS } from '../../constants';
import { ActiveOrganizationItemGuard } from '../../shared/active-organization-item.guard';

@Injectable({
  providedIn: 'root',
})
export class ActivePermissionGuard extends ActiveOrganizationItemGuard {
  constructor(
    protected routingService: RoutingService,
    protected globalMessageService: GlobalMessageService,
    protected currentPermissionService: CurrentPermissionService
  ) {
    super(routingService, globalMessageService);
  }

  readonly permissionCode = ROUTE_PARAMS.permissionCode;

  canActivate() {
    return this.currentPermissionService.item$.pipe(
      map((item) => {
        if (!this.isValid(item)) {
          this.redirect(item.code, 'permissionDetails', this.permissionCode);
          this.showErrorMessage('Permission');
        }
      }),
      catchError(() => {
        return of();
      })
    );
  }
}
