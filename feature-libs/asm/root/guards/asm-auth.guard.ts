/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { AuthGuard } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AsmAuthService } from '../services/asm-auth.service';

/**
 * Extends `AuthGuard` to allow CS Agent access to protected routes
 * even when not emulating a customer.
 *
 * Overrides `AuthGuard` when ASM module is enabled.
 */
@Injectable({ providedIn: 'root' })
export class AsmAuthGuard extends AuthGuard {
  protected asmAuthService = inject(AsmAuthService);

  override canActivate(): Observable<boolean | import('@angular/router').UrlTree> {
    return this.asmAuthService.isUserOrCSAgentLoggedIn().pipe(
      map((isLoggedIn) => {
        if (!isLoggedIn) {
          this.authRedirectService.saveCurrentNavigationUrl();
          return this.router.parseUrl(
            this.semanticPathService.get('login') ?? ''
          );
        }
        return isLoggedIn;
      })
    );
  }
}
