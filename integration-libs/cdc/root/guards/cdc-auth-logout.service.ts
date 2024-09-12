/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { AuthService, WindowRef } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class CdcAuthLogOutService {
  protected winRef = inject(WindowRef);
  protected auth = inject(AuthService);

  /**
   * Logout user from CDC
   */
  protected cdcLogout(): void {
    (this.winRef.nativeWindow as { [key: string]: any })?.[
      'gigya'
    ]?.accounts?.logout();
  }

  public logout(): Promise<any> {
    return Promise.all([this.auth.coreLogout(), this.cdcLogout()]);
  }
}
