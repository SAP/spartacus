/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { GuardResult, Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { SemanticPathService } from '../../../routing/configurable-routes/url-translation/semantic-path.service';
import { RoutingService } from '../../../routing/facade/routing.service';
import { AuthService } from '../facade/auth.service';
import { AuthRedirectService } from '../services/auth-redirect.service';

const MISSING_JSESSIONID_CODE = 403;

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
export class CustomLoginGuard {
  routingService = inject(RoutingService);
  authService = inject(AuthService);
  authRedirectService = inject(AuthRedirectService);
  router = inject(Router);
  semanticPathService = inject(SemanticPathService);

  canActivate(): Observable<GuardResult> {
    return this.authService.getCsrfToken().pipe(
      map(() => true),
      catchError((error) => {
        console.log('error', error);

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
}
