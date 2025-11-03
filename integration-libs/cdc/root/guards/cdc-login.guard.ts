/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { AuthService, AuthConfigService } from '@spartacus/core';
import { CmsPageGuard, LoginGuard } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';

/**
 * @override
 *
 * CDC version of login guard.
 */
@Injectable({
  providedIn: 'root',
})
export class CdcLoginGuard extends LoginGuard {
  protected authService: AuthService;
  protected authConfigService: AuthConfigService;
  protected cmsPageGuard: CmsPageGuard;

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {
    const authService = inject(AuthService);
    const authConfigService = inject(AuthConfigService);
    const cmsPageGuard = inject(CmsPageGuard);

    super(authService, authConfigService, cmsPageGuard);
  
    this.authService = authService;
    this.authConfigService = authConfigService;
    this.cmsPageGuard = cmsPageGuard;
  }

  protected shouldRenderCMSPage(): Observable<boolean> {
    return of(true); // always load CMS Login Page
  }
}
