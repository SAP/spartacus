/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
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
  constructor(
    protected auth: AuthService,
    protected cms: CmsService,
    protected semanticPathService: SemanticPathService,
    protected protectedRoutes: ProtectedRoutesService,
    protected router: Router,
    protected winRef: WindowRef
  ) {
    super(auth, cms, semanticPathService, protectedRoutes, router);
  }

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
    return Promise.all([super.logout(), this.logoutFromCdc()]);
  }
}
