import { Injectable } from '@angular/core';
import { GlobalMessageService, RoutingService } from '@spartacus/core';
import { UserGroupService } from '@spartacus/organization/administration/core';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ExistOrganizationItemGuard } from '../../shared/exist-organization-item.guard';
import { CurrentUserGroupService } from '../services/current-user-group.service';

@Injectable({
  providedIn: 'root',
})
export class ExistUserGroupGuard extends ExistOrganizationItemGuard {
  constructor(
    protected userGroupService: UserGroupService,
    protected globalMessageService: GlobalMessageService,
    protected routingService: RoutingService,
    protected currentUserGroupService: CurrentUserGroupService
  ) {
    super(routingService, globalMessageService);
  }
  canActivate() {
    return this.currentUserGroupService.key$.pipe(
      switchMap((code) => this.userGroupService.getErrorState(code)),
      map((error) => {
        if (error) {
          this.redirect('userGroup');
          this.showErrorMessage('User Group');
        }
      }),
      catchError(() => {
        return of();
      })
    );
  }
}
