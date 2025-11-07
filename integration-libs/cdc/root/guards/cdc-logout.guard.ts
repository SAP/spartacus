/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
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
  protected auth: AuthService;
  protected cms: CmsService;
  protected semanticPathService: SemanticPathService;
  protected protectedRoutes: ProtectedRoutesService;
  protected router: Router;
  protected winRef = inject(WindowRef);

  constructor() {
    const auth = inject(AuthService);
    const cms = inject(CmsService);
    const semanticPathService = inject(SemanticPathService);
    const protectedRoutes = inject(ProtectedRoutesService);
    const router = inject(Router);

    super(auth, cms, semanticPathService, protectedRoutes, router);
  
    this.auth = auth;
    this.cms = cms;
    this.semanticPathService = semanticPathService;
    this.protectedRoutes = protectedRoutes;
    this.router = router;
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
