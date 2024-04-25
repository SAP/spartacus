/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject, isDevMode } from '@angular/core';
import { RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import {
  AuthRedirectService,
  AuthService,
  CmsActivatedRouteSnapshot,
  LoggerService,
  SemanticPathService,
} from '@spartacus/core';
import { Observable, of, switchMap, take } from 'rxjs';
import { OppsConfig } from '../config/opps-config';

@Injectable({
  providedIn: 'root',
})
export class OppsLoginRequiredGuard {
  protected router = inject(Router);
  protected semanticPathService = inject(SemanticPathService);
  protected authRedirectService = inject(AuthRedirectService);
  protected authService = inject(AuthService);
  protected logger = inject(LoggerService);
  protected config = inject(OppsConfig);
  canActivate(
    route: CmsActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    const navigation = this.router.getCurrentNavigation();
    return this.authService.isUserLoggedIn().pipe(
      take(1),
      switchMap((isUserLoggedIn) => {
        if (!isUserLoggedIn) {
          if (!this.config.opps?.loginRequired?.urlParameter && isDevMode()) {
            this.logger.warn(
              `There is no url query parameter configured for OPPS login-required feature`
            );
          }
          const urlParameter =
            this.config.opps?.loginRequired?.urlParameter ?? '';
          if (
            route.queryParams[urlParameter] === 'true' &&
            navigation?.finalUrl
          ) {
            const url = this.router.serializeUrl(navigation.finalUrl);
            this.authRedirectService.setRedirectUrl(url);
            return of(
              this.router.parseUrl(this.semanticPathService.get('login') ?? '')
            );
          }
          return of(true);
        } else {
          return of(true);
        }
      })
    );
  }
}
