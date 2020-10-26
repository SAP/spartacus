import { Injectable } from '@angular/core';
import { GlobalMessageService, RoutingService } from '@spartacus/core';
import { B2BUserService } from '@spartacus/organization/administration/core';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ExistOrganizationItemGuard } from '../../shared/exist-organization-item.guard';
import { CurrentUserService } from '../services/current-user.service';

@Injectable({
  providedIn: 'root',
})
export class ExistUserGuard extends ExistOrganizationItemGuard {
  constructor(
    protected userService: B2BUserService,
    protected globalMessageService: GlobalMessageService,
    protected routingService: RoutingService,
    protected currentUserService: CurrentUserService
  ) {
    super(routingService, globalMessageService);
  }

  canActivate() {
    return this.currentUserService.key$.pipe(
      switchMap((code) => this.userService.getErrorState(code)),
      map((error) => {
        if (error) {
          this.redirect('users');
          this.showErrorMessage('User');
        }
      }),
      catchError(() => {
        return of();
      })
    );
  }
}
