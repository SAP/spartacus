/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { CanActivate, GuardResult, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { FeatureToggles } from '../../../features-config';
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
import { appendAuthReqId } from '../utils/url-with-auth-req-id';

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
  private featureToggles = inject(FeatureToggles);

  canActivate(): Observable<GuardResult> {
    if (
      !this.authConfigService.customLoginEnabled() ||
      !this.windowRef.isBrowser()
    ) {
      // disable guard when custom login page is not enabled or when the application is running in SSR mode.
      return of(true);
    }

    // Read the flag once so all branches within this activation see a
    // consistent value. Reading it three separate times would leave a window
    // in async tests (MockFeatureTogglesController mid-activation) where
    // authReqId is computed with one value while the CSRF branch and the tap
    // see different ones, producing an inconsistent state.
    const concurrent = this.featureToggles.concurrentLoginPagesSupport;
    const authReqId = concurrent ? this.getAuthReqId() : undefined;

    // Only bypass the shareReplay cache (refreshCsrfToken) when an authReqId
    // is actually present. Without an authReqId the concurrent-login path adds
    // no value over the cached observable, and calling refreshCsrfToken(undefined)
    // would fire a fresh HTTP request on every /login visit even for ordinary
    // (non-concurrent) flows, doubling CSRF traffic.
    const csrfToken$ =
      concurrent && authReqId
        ? this.authService.refreshCsrfToken(authReqId)
        : this.authService.getCsrfToken();

    return csrfToken$.pipe(
      tap((token) => {
        // Only the CSRF token is written to the shared service — not authReqId.
        //
        // Writing authReqId here would introduce a shared-mutable-state race:
        // two concurrent canActivate() activations (e.g. two browser tabs in the
        // same SPA session, or a retry redirect that fires a new activation
        // before the first observable has completed) would interleave at the
        // HTTP async boundary and clobber each other's setAuthReqId() writes.
        //
        // This is safe to omit because LoginFormComponentService resolves
        // auth_req_id URL-first from ActivatedRoute.snapshot.queryParams, which
        // is per-activation and immune to writes from any other activation.
        // The retry redirect path (createRetryLoginRoute) appends auth_req_id
        // back onto the URL, so the URL param is always present on the next
        // activation after a retry — making a service-based fallback unnecessary.
        this.csrfStateService.set(token);
        this.clearRedirectCount();
      }),
      map(() => true),
      catchError(() => {
        // No setAuthReqId(undefined) cleanup needed here: the guard never writes
        // authReqId to the service (see tap comment above), so there is nothing
        // to clear. Removing that write eliminates the only shared-mutable-state
        // race that canActivate() introduces under concurrent activations.
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
          const originLoginPath = this.semanticPathService.get('login') ?? '';
          const originBase = this.federatedLoginService.origin;

          if (concurrent && authReqId) {
            // appendAuthReqId resolves path against base and appends the param.
            // It returns null when base is malformed, in which case we fall back
            // to the Angular router retry route rather than setting location.href
            // to a broken URL. See appendAuthReqId JSDoc for the full rationale
            // behind the try/catch it encapsulates.
            const targetHref = appendAuthReqId(
              originLoginPath,
              originBase,
              authReqId
            );
            if (targetHref === null) {
              return this.createRetryLoginRoute(authReqId);
            }
            this.windowRef.location.href = targetHref;
          } else {
            // Non-concurrent path: preserve the original string-concatenation
            // behaviour to avoid any trailing-slash regression.
            this.windowRef.location.href = originBase + originLoginPath;
          }
          // stop navigation
          return of(false);
        }

        return this.createRetryLoginRoute(authReqId);
      })
    );
  }

  protected getAuthReqId(): string | undefined {
    return (
      new URLSearchParams(this.windowRef.location.search ?? '').get(
        'auth_req_id'
      ) ?? undefined
    );
  }

  protected createRetryLoginRoute(
    authReqId: string | undefined
  ): Observable<GuardResult> {
    const loginPath = this.semanticPathService.get('login') ?? '';
    if (authReqId) {
      const params = new URLSearchParams({ auth_req_id: authReqId });
      return of(this.router.parseUrl(`${loginPath}?${params.toString()}`));
    }
    return of(this.router.parseUrl(loginPath));
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
