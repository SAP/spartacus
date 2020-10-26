import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  B2BUser,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
} from '@spartacus/core';
import { B2BUserService } from '@spartacus/organization/administration/core';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ROUTE_PARAMS } from '../../constants';
import { OrganizationItemService } from '../../shared/organization-item.service';
import { CurrentUserService } from '../services/current-user.service';

@Injectable({
  providedIn: 'root',
})
export class ExistUserGuard {
  protected code = ROUTE_PARAMS.userCode;
  protected params;

  constructor(
    protected userService: B2BUserService,
    protected router: Router,
    protected globalMessageService: GlobalMessageService,
    protected route: ActivatedRoute,
    protected routingService: RoutingService,
    protected currentItemService: CurrentUserService,
    protected itemService: OrganizationItemService<B2BUser>
  ) {}

  canActivate() {
    return this.currentItemService.key$.pipe(
      switchMap((code) => this.userService.getErrorState(code)),
      map((error) => {
        if (error) {
          this.redirect();
          this.showErrorMessage();
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        return of();
      })
    );
  }

  protected isValid(state): boolean {
    return state.success;
  }

  protected redirect() {
    this.routingService.go({
      cxRoute: `users`,
    });
  }

  protected showErrorMessage() {
    this.globalMessageService.add(
      {
        key: 'organization.notification.notExist',
        params: { item: 'User' },
      },
      GlobalMessageType.MSG_TYPE_WARNING
    );
  }
}
