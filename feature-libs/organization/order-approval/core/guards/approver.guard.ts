import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import {
  B2BUserRole,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
  User,
  UserService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter, map, pluck } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApproverGuard implements CanActivate {
  constructor(
    protected userService: UserService,
    protected routingService: RoutingService,
    protected globalMessageService: GlobalMessageService
  ) {}

  canActivate(): Observable<boolean> {
    return this.userService.get().pipe(
      filter((user: User) => user && Object.keys(user).length > 0),
      pluck('roles'),
      map((roles: string[]) => {
        const hasRole =
          Array.isArray(roles) &&
          (roles.includes(B2BUserRole.APPROVER) ||
            roles.includes(B2BUserRole.ADMIN));

        if (!hasRole) {
          this.routingService.go({ cxRoute: 'home' });

          this.globalMessageService.add(
            {
              key: 'orderApprovalGlobal.notification.noSufficientPermissions',
            },
            GlobalMessageType.MSG_TYPE_WARNING
          );
        }

        return hasRole;
      })
    );
  }
}
