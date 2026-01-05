/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { GuardResult, Router } from '@angular/router';
import {
  FeatureConfigService,
  SemanticPathService,
  WindowRef,
} from '@spartacus/core';
import { IS_GUEST_USER_CHECKOUT_KEY } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginAsGuestGuard {
  private featureConfigService = inject(FeatureConfigService);
  protected windowRef = inject(WindowRef);
  protected router = inject(Router);
  protected semanticPathService = inject(SemanticPathService);

  protected getPath(): string | undefined {
    return this.semanticPathService.get('loginForm');
  }

  canActivate(): Observable<GuardResult> {
    if (
      this.featureConfigService.isEnabled('authorizationCodeFlowByDefault') &&
      this.windowRef.localStorage?.getItem(IS_GUEST_USER_CHECKOUT_KEY) ===
        'true'
    ) {
      this.windowRef.localStorage.removeItem(IS_GUEST_USER_CHECKOUT_KEY);
      return of(
        this.router.createUrlTree([this.getPath()], {
          queryParams: { forced: true },
        })
      );
    }

    return of(true);
  }
}
