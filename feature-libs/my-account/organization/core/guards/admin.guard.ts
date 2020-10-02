import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import {
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
  UserService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import { UserRole } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    protected userService: UserService,
    protected routingService: RoutingService,
    protected globalMessageService: GlobalMessageService
  ) {}

  canActivate(): Observable<boolean> {
    return this.userService.get().pipe(
      pluck('roles'),
      map((roles: string[]) => {
        const hasRole = Array.isArray(roles) && roles.includes(UserRole.ADMIN);

        if (!hasRole) {
          // routing as temporary solution until /organization won't
          // have set up proper permission on backend
          this.routingService.go({ cxRoute: 'organization' });

          this.globalMessageService.add(
            { key: 'organization.notification.noSufficientPermissions' },
            GlobalMessageType.MSG_TYPE_WARNING
          );
        }

        return hasRole;
      })
    );
  }
}
