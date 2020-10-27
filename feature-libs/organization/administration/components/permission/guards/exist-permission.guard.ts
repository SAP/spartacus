import { Injectable } from '@angular/core';
import { GlobalMessageService, RoutingService } from '@spartacus/core';
import { PermissionService } from '@spartacus/organization/administration/core';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ExistOrganizationItemGuard } from '../../shared/exist-organization-item.guard';
import { CurrentPermissionService } from '../services/current-permission.service';

@Injectable({
  providedIn: 'root',
})
export class ExistPermissionGuard extends ExistOrganizationItemGuard {
  constructor(
    protected permissionService: PermissionService,
    protected globalMessageService: GlobalMessageService,
    protected routingService: RoutingService,
    protected currentPermissionService: CurrentPermissionService
  ) {
    super(routingService, globalMessageService);
  }

  canActivate() {
    return this.currentPermissionService.key$.pipe(
      switchMap((code) => this.permissionService.getErrorState(code)),
      map((error) => {
        if (error) {
          this.redirect('permission');
          this.showErrorMessage('Purchase limit');
        }
      }),
      catchError(() => {
        return of();
      })
    );
  }
}
