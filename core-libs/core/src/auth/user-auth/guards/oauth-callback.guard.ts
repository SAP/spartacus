/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { inject, Injectable } from '@angular/core';
import { GuardResult, Router } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { SemanticPathService } from '../../../routing/configurable-routes';
import { WindowRef } from '../../../window';
import { AuthService } from '../facade';
import { AuthRedirectService } from '../services';

/**
 * Guard for the oauth callback page.
 *
 * In SSR, allows the page to be rendered.
 *
 * In a browser, send the user to the URL stored in AuthRedirectService
 * when the user is already authenticated, or the login page when anonymous.
 */
@Injectable({
  providedIn: 'root',
})
export class OAuthCallbackGuard {
  authService = inject(AuthService);
  authRedirectService = inject(AuthRedirectService);
  router = inject(Router);
  semanticPathService = inject(SemanticPathService);
  windowRef = inject(WindowRef);

  canActivate(): Observable<GuardResult> {
    if (!this.windowRef.isBrowser()) {
      // always render oauth callback page in SSR.
      return of(true);
    }

    return this.authService.isUserLoggedIn().pipe(
      map((isLoggedIn) => {
        if (isLoggedIn) {
          // issue route to saved page
          this.authRedirectService.redirect();
          return true;
        } else {
          // redirect to login page
          return this.router.parseUrl(
            this.semanticPathService.get('login') ?? ''
          );
        }
      })
    );
  }
}
