/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  AuthService,
  CmsService,
  ProtectedRoutesService,
  SemanticPathService,
  WindowRef,
} from '@spartacus/core';
import { LogoutGuard } from '@spartacus/storefront';

/**
 * @override
 *
 * CDC version of logout guard. In addition to token revocation we invoke logout method from CDC JS lib.
 */
@Injectable({
  providedIn: 'root',
})
export class CdcLogoutGuard extends LogoutGuard {
  protected override auth = inject(AuthService);
  protected override cms = inject(CmsService, { optional: true });
  protected override semanticPathService = inject(SemanticPathService);
  protected override protectedRoutes = inject(ProtectedRoutesService);
  protected override router = inject(Router);
  protected winRef = inject(WindowRef);

  /**
   * Logout user from CDC
   */
  protected logoutFromCdc(): void {
    (this.winRef.nativeWindow as { [key: string]: any })?.[
      'gigya'
    ]?.accounts?.logout();
  }

  /**
   * @override
   * @returns promise to resolve after complete logout
   */
  protected logout(): Promise<any> {
    return Promise.all([super.logout(), Promise.resolve(this.logoutFromCdc())]);
  }
}
