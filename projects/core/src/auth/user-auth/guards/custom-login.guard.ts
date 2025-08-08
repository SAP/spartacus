/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { CanActivate, GuardResult, Router } from '@angular/router';
import {
  GlobalMessageService,
  GlobalMessageType,
  StatePersistenceService,
} from '@spartacus/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { SemanticPathService } from '../../../routing/configurable-routes/url-translation/semantic-path.service';
import { AuthService } from '../facade/auth.service';
import { AuthRedirectService } from '../services/auth-redirect.service';
const MISSING_JSESSIONID_CODE = 403;
const STORAGE_KEY = 'login_redirect_count';
const timeout = 15_000;
const totalRetries = 2;
interface FlagMeta {
  /** Add timeout to recover from stale/interrupted state */
  t: number;
  /** Redirect count */
  c: number;
}

/**
 * This guard requests the CSRF token required for the custom login form as a way
 * to check for a valid Authorization Server session.
 *
 * It will redirect the user to restart the auth flow on failed requests, keeping
 * track of the redirects to avoid creating an infinite loop of redirects.
 */
@Injectable({
  providedIn: 'root',
})
export class CustomLoginGuard implements CanActivate {
  authService = inject(AuthService);
  authRedirectService = inject(AuthRedirectService);
  router = inject(Router);
  semanticPathService = inject(SemanticPathService);
  statePersistenceService = inject(StatePersistenceService);
  globalMessageService = inject(GlobalMessageService);

  canActivate(): Observable<GuardResult> {
    return this.authService.getCsrfToken().pipe(
      tap(() => this.clearRedirectCount()),
      map(() => true),
      catchError((error) => {
        const currentCount = this.getRedirectCount();
        if (currentCount > totalRetries) {
          this.clearRedirectCount();
          this.globalMessageService.add(
            'Login config error', // TODO: replace with translation key
            GlobalMessageType.MSG_TYPE_ERROR
          );

          const redirect = this.router.parseUrl(
            this.semanticPathService.get('home') ?? ''
          );
          return of(redirect);
        }
        this.setRedirectCount(currentCount + 1);

        switch (error.status) {
          case MISSING_JSESSIONID_CODE: {
            console.log('MISSING_JSESSIONID_CODE');
            // Redirect to restart the flow if an attempt was made to manually obtain a custom form
            const redirect = this.router.parseUrl(
              this.semanticPathService.get('login') ?? ''
            );
            return of(redirect);
          }
          default: {
            console.log('DEFAULT');
            const redirect = this.router.parseUrl(
              this.semanticPathService.get('login') ?? ''
            );
            return of(redirect);
          }
        }
      })
    );
  }

  getRedirectCount() {
    const countMeta = this.statePersistenceService.readStateFromStorage({
      key: STORAGE_KEY,
    }) as FlagMeta | undefined;
    if (countMeta) {
      if (Date.now() - countMeta.t < timeout) {
        return countMeta.c;
      }
    }
    return 1;
  }

  setRedirectCount(count: number) {
    this.statePersistenceService.syncWithStorage({
      key: STORAGE_KEY,
      state$: of({ t: Date.now(), c: count }),
    });
  }

  clearRedirectCount() {
    this.setRedirectCount(1);
  }
}
