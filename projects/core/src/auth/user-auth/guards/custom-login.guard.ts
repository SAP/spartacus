/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { CanActivate, GuardResult, Router } from '@angular/router';
import { catchError, map, Observable, of, tap } from 'rxjs';
import {
  GlobalMessageService,
  GlobalMessageType,
} from '../../../global-message';
import { SemanticPathService } from '../../../routing/configurable-routes/url-translation/semantic-path.service';
import { StorageSyncType } from '../../../state/config/state-config';
import {
  getStorage,
  persistToStorage,
  readFromStorage,
} from '../../../state/utils/browser-storage';
import { WindowRef } from '../../../window/window-ref';
import { AuthService } from '../facade/auth.service';
import { CsrfStateService } from '../facade/csrf-state.service';

const MISSING_JSESSIONID_CODE = 403;
const STORAGE_KEY = 'login_redirect_count';
const timeout = 15_000;
const totalRetries = 2;

interface CustomLoginGuardMetadata {
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
  router = inject(Router);
  semanticPathService = inject(SemanticPathService);
  windowRef = inject(WindowRef);
  storage = getStorage(StorageSyncType.LOCAL_STORAGE, this.windowRef);
  globalMessageService = inject(GlobalMessageService);
  csrfStateService = inject(CsrfStateService);

  canActivate(): Observable<GuardResult> {
    return this.authService.getCsrfToken().pipe(
      tap((token) => {
        this.csrfStateService.set(token);
        this.clearRedirectCount();
      }),
      map(() => true),
      catchError((error) => {
        const currentCount = this.getRedirectCount();
        if (currentCount >= totalRetries) {
          // retry limit met, go to homepage with message
          this.clearRedirectCount();
          this.globalMessageService.add(
            { key: 'authMessages.unrecoverableError' },
            GlobalMessageType.MSG_TYPE_ERROR
          );
          return of(this.createRoute('home'));
        }
        this.setRedirectCount(currentCount + 1);

        switch (error.status) {
          case MISSING_JSESSIONID_CODE: {
            // Session is expired or missing, go to auth server for new session
            return of(this.createRoute('login'));
          }
          default: {
            // Unknown error, retry until limit met
            return of(this.createRoute('login'));
          }
        }
      })
    );
  }

  getRedirectCount() {
    const countMeta = readFromStorage<CustomLoginGuardMetadata>(
      this.storage as Storage,
      STORAGE_KEY
    );
    if (countMeta) {
      if (Date.now() - countMeta.t < timeout) {
        return countMeta.c;
      }
    }
    return 0;
  }

  setRedirectCount(count: number) {
    return persistToStorage(
      STORAGE_KEY,
      { t: Date.now(), c: count } satisfies CustomLoginGuardMetadata,
      this.storage as Storage
    );
  }

  clearRedirectCount() {
    persistToStorage(
      STORAGE_KEY,
      { t: Date.now(), c: 0 } satisfies CustomLoginGuardMetadata,
      this.storage as Storage
    );
  }

  createRoute(cxRoute: string) {
    const redirect = this.router.parseUrl(
      this.semanticPathService.get(cxRoute) ?? ''
    );
    return redirect;
  }
}
