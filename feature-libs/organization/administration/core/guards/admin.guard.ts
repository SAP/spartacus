/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';

import {
  B2BUserRole,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
} from '@spartacus/core';
import { User, UserAccountFacade } from '@spartacus/user/account/root';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable()
export class AdminGuard {
  protected userAccountFacade = inject(UserAccountFacade);
  protected routingService = inject(RoutingService);
  protected globalMessageService = inject(GlobalMessageService);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  canActivate(): Observable<boolean> {
    return this.userAccountFacade.get().pipe(
      filter((user): user is User => !!user && Object.keys(user).length > 0),
      map((user) => (user as User & { roles?: string[] })?.roles),
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
