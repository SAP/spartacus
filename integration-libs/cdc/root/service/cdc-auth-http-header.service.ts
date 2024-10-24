/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { AuthHttpHeaderService, GlobalMessageType } from '@spartacus/core';
import { CdcAuthLogOutService } from './cdc-auth-logout.service';

@Injectable({
  providedIn: 'root',
})
export class CdcAuthHttpHeaderService extends AuthHttpHeaderService {
  protected cdcAuthLogOutService = inject(CdcAuthLogOutService);
  /**
   * override handleExpiredRefreshToken() method
   */
  public handleExpiredRefreshToken(): void {
    this.authRedirectService.saveCurrentNavigationUrl();
    this.cdcAuthLogOutService.logout().finally(() => {
      this.routingService.go({ cxRoute: 'login' });

      this.globalMessageService.add(
        {
          key: 'httpHandlers.sessionExpired',
        },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    });
  }
}
