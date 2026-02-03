/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { GuardResult, Router } from '@angular/router';
import {
  AuthGuard,
  AuthRedirectService,
  SemanticPathService,
} from '@spartacus/core';
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
  constructor(
    protected asmAuthService: AsmAuthService,
    protected override authRedirectService: AuthRedirectService,
    protected override router: Router,
    protected override semanticPathService: SemanticPathService
  ) {
    super(
      asmAuthService,
      authRedirectService,
      router,
      semanticPathService
    );
  }

  override canActivate(): Observable<GuardResult> {
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
