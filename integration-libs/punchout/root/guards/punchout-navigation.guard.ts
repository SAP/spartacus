/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { GuardResult, Router, RouterStateSnapshot } from '@angular/router';
import {
  AuthService,
  CmsActivatedRouteSnapshot,
  GlobalMessageService,
  GlobalMessageType,
  RoutingConfigService,
  RoutingService,
} from '@spartacus/core';
import { catchError, map, Observable, of, switchMap, take } from 'rxjs';
import { PunchoutNavigationGuardConfig } from '../config';
import { PunchoutFacade } from '../facade';
import { PunchOutOperation, PunchoutSession, PunchoutState } from '../model';
import { PunchoutStoreService } from '../services';

@Injectable({
  providedIn: 'root',
})
export class PunchoutNavigationGuard {
  protected router = inject(Router);
  protected punchoutStoreService = inject(PunchoutStoreService);
  protected authService = inject(AuthService);
  protected routingService = inject(RoutingService);
  protected globalMessageService = inject(GlobalMessageService);
  protected punchoutFacade = inject(PunchoutFacade);
  protected config = inject(PunchoutNavigationGuardConfig);
  protected routingConfigService = inject(RoutingConfigService);

  canActivate(
    route: CmsActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<GuardResult> {
    const relativeUrl = `${route.url.map((u) => u.path).join('/')}`;
    const cxRoute =
      route?.data?.cxRoute ??
      this.routingConfigService.getRouteName(relativeUrl);
    return this.getPunchoutOperation(cxRoute).pipe(
      map((punchoutOperation: PunchOutOperation | undefined) => {
        if (
          punchoutOperation &&
          !this.isAllowedCxRoute(cxRoute, punchoutOperation) &&
          !this.isAllowedUrls(route, punchoutOperation, relativeUrl)
        ) {
          this.handleWarning();
          this.routingService.go(
            this.config.punchoutNavigation?.[punchoutOperation]?.redirectPage
          );
          return false;
        }

        return true;
      })
    );
  }

  protected isAllowedUrls(
    route: CmsActivatedRouteSnapshot,
    punchoutOperation: PunchOutOperation,
    relativeUrl: string
  ): boolean {
    let isHomePageAllowed = false;
    const urls =
      this.config.punchoutNavigation?.[punchoutOperation]?.allowedUrls;
    if (!urls) {
      return false;
    }
    if (urls.includes('/')) {
      isHomePageAllowed = route?.url?.length === 0;
    }
    return (
      urls
        .filter((url) => url !== '/')
        .some((url) => relativeUrl.includes(url)) || isHomePageAllowed
    );
  }

  protected isAllowedCxRoute(
    cxRoute: string,
    punchoutOperation: PunchOutOperation
  ) {
    const cxRoutes =
      this.config.punchoutNavigation?.[punchoutOperation]?.allowedCxRoutes;
    if (!cxRoutes) {
      return false;
    }
    return !!cxRoute && cxRoutes.includes(cxRoute);
  }

  protected getPunchoutOperation(
    cxRoute: string
  ): Observable<PunchOutOperation | undefined> {
    return this.authService.isUserLoggedIn().pipe(
      take(1),
      switchMap((isLoggedIn) => {
        if (isLoggedIn) {
          return this.punchoutStoreService.getPunchoutState();
        }
        return of(undefined);
      }),
      take(1),
      switchMap((punchoutState: PunchoutState | undefined) => {
        if (punchoutState?.punchoutSessionId) {
          //handle race condition with logout guard, it needs to be assessed before punchout session is requested
          if (cxRoute === 'logout') {
            this.handleWarning();
          }
          return punchoutState?.punchoutSession?.punchOutOperation
            ? of(punchoutState.punchoutSession)
            : this.punchoutFacade.requestPunchoutSession(
                punchoutState.punchoutSessionId
              );
        }

        return of(undefined);
      }),
      map((punchoutSession: PunchoutSession | undefined) => {
        if (punchoutSession?.punchOutOperation) {
          return punchoutSession?.punchOutOperation;
        }
        return undefined;
      }),
      catchError(() => of(undefined))
    );
  }

  protected handleWarning() {
    this.globalMessageService.add(
      {
        key: 'punchout.noSufficientPermissions',
      },
      GlobalMessageType.MSG_TYPE_WARNING
    );
  }
}
