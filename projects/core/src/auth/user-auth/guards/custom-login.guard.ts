/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { CanActivate, GuardResult, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { FederatedLoginService } from '../../../federated-login/services/federated-login.service';
import {
  GlobalMessageService,
  GlobalMessageType,
} from '../../../global-message';
import { type Translatable } from '../../../i18n/translatable';
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
import { AuthConfigService } from '../services/auth-config.service';

const STORAGE_KEY = 'login_redirect_count';
const timeout = 15_000;
export const totalRetries = 1;

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
  protected authService = inject(AuthService);
  protected authConfigService = inject(AuthConfigService);
  protected router = inject(Router);
  protected semanticPathService = inject(SemanticPathService);
  protected windowRef = inject(WindowRef);
  protected storage = getStorage(StorageSyncType.LOCAL_STORAGE, this.windowRef);
  protected globalMessageService = inject(GlobalMessageService);
  protected csrfStateService = inject(CsrfStateService);
  protected federatedLoginService = inject(FederatedLoginService);

  canActivate(): Observable<GuardResult> {
    if (
      !this.authConfigService.customLoginEnabled() ||
      !this.windowRef.isBrowser()
    ) {
      // disable guard when custom login page is not enabled or when the application is running in SSR mode.
      return of(true);
    }

    return this.authService.getCsrfToken().pipe(
      tap((token) => {
        this.csrfStateService.set(token);
        this.clearRedirectCount();
      }),
      map(() => true),
      catchError(() => {
        const currentCount = this.getRedirectCount();
        // check if retry limit is met
        if (currentCount >= totalRetries) {
          // go to homepage with message
          this.clearRedirectCount();
          this.showErrorMessage({ key: 'authMessages.unrecoverableError' });
          return this.createRoute('home');
        }

        // retry until limit met
        this.setRedirectCount(currentCount + 1);
        if (
          this.federatedLoginService.isLoginDomain &&
          this.federatedLoginService.origin
        ) {
          // redirect to the origin site login so that PKCE is available to the origin
          const originLoginUrl =
            this.federatedLoginService.origin +
            (this.semanticPathService.get('login') ?? '');
          this.windowRef.location.href = originLoginUrl;
          // stop navigation
          return of(false);
        }

        return this.createRoute('login');
      })
    );
  }

  protected getRedirectCount() {
    const countMeta = readFromStorage<CustomLoginGuardMetadata>(
      this.storage as Storage,
      STORAGE_KEY
    );
    if (countMeta && Date.now() - countMeta.t < timeout) {
      return countMeta.c;
    }
    return 0;
  }

  protected setRedirectCount(count: number) {
    persistToStorage(
      STORAGE_KEY,
      { t: Date.now(), c: count } satisfies CustomLoginGuardMetadata,
      this.storage as Storage
    );
  }

  protected clearRedirectCount() {
    this.setRedirectCount(0);
  }

  protected createRoute(cxRoute: string) {
    return of(
      this.router.parseUrl(this.semanticPathService.get(cxRoute) ?? '')
    );
  }

  protected showErrorMessage(message: Translatable) {
    this.globalMessageService.add(message, GlobalMessageType.MSG_TYPE_ERROR);
  }
}
