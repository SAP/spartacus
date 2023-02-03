/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { CanActivate, CanMatch } from '@angular/router';
import {
  B2BUserRole,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
} from '@spartacus/core';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { Observable } from 'rxjs';
import { filter, map, pluck } from 'rxjs/operators';
import { B2BUserService } from '../services';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate, CanMatch {
  constructor(
    protected userAccountFacade: UserAccountFacade,
    protected routingService: RoutingService,
    protected globalMessageService: GlobalMessageService,
    protected b2bUserService: B2BUserService,
    protected location: Location
  ) {}

  canMatch(): boolean {
    const promise = this.b2bUserService.isUpdatingUserAllowed();
    if (!promise) {
      this.routingService.go({ cxRoute: 'organization' });
      this.globalMessageService.add(
        { key: 'organization.notification.notExist' },
        GlobalMessageType.MSG_TYPE_WARNING
      );
    }
    return promise;
  }

  canActivate(): Observable<boolean> {
    return this.userAccountFacade.get().pipe(
      filter((user) => !!user && Object.keys(user).length > 0),
      pluck('roles'),
      map((roles) => {
        const hasRole =
          Array.isArray(roles) && roles.includes(B2BUserRole.ADMIN);

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
