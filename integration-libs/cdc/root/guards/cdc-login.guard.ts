/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
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
  protected override authService = inject(AuthService);
  protected override authConfigService = inject(AuthConfigService);
  protected override cmsPageGuard = inject(CmsPageGuard);

  protected shouldRenderCMSPage(): Observable<boolean> {
    return of(true); // always load CMS Login Page
  }
}
