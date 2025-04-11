/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
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
  RoutingService,
} from '@spartacus/core';
import { combineLatest, filter, map, Observable, tap } from 'rxjs';
import {
  PUNCHOUT_ERROR_PAGE_URL,
  PUNCHOUT_INSPECT_PAGE_URL,
  PUNCHOUT_REQUISITION_PAGE_URL,
  PUNCHOUT_SESSION_PAGE_URL,
  PunchoutNavigationGuardConfig,
  PunchOutOperation,
} from '../model';
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

  protected readonly allowedUrlsForAll: string[] = [
    PUNCHOUT_SESSION_PAGE_URL,
    PUNCHOUT_REQUISITION_PAGE_URL,
    PUNCHOUT_ERROR_PAGE_URL,
  ];
  protected readonly allowedCxRoutesForEdit: string[] = [
    'category',
    'quickOrder',
    'product',
    'cart',
  ];
  protected readonly allowedUrlsForInspect: string[] = [
    PUNCHOUT_INSPECT_PAGE_URL,
  ];
  protected readonly HOME_PAGE_URL = '/';

  protected readonly punchoutNavigationGuardConfig: PunchoutNavigationGuardConfig =
    {
      [PunchOutOperation.INSPECT]: {
        allowedUrls: [...this.allowedUrlsForAll, ...this.allowedUrlsForInspect],
        redirectPage: PUNCHOUT_INSPECT_PAGE_URL,
      },
      [PunchOutOperation.EDIT]: {
        allowedUrls: [
          ...this.allowedUrlsForAll,
          ...this.allowedCxRoutesForEdit,
        ],
        allowedCxRoutes: [...this.allowedCxRoutesForEdit],
        allowHomePage: true,
        redirectPage: this.HOME_PAGE_URL,
      },
      [PunchOutOperation.CREATE]: {
        allowedUrls: [
          ...this.allowedUrlsForAll,
          ...this.allowedCxRoutesForEdit,
        ],
        allowedCxRoutes: [...this.allowedCxRoutesForEdit],
        allowHomePage: true,
        redirectPage: this.HOME_PAGE_URL,
      },
    };

  canActivate(
    route: CmsActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<GuardResult> {
    console.log('flo route', route);
    return this.getPunchoutOperation().pipe(
      map((punchoutOperation: PunchOutOperation | undefined) => {
        console.log('punchoutOperation', punchoutOperation);
        const canActivate =
          !punchoutOperation ||
          this.findByCxRoute(
            route,
            this.punchoutNavigationGuardConfig[punchoutOperation]
              .allowedCxRoutes
          ) ||
          this.findByUrls(
            route,
            this.punchoutNavigationGuardConfig[punchoutOperation].allowedUrls
          ) ||
          (!!this.punchoutNavigationGuardConfig[punchoutOperation]
            ?.allowHomePage &&
            this.findHomePage(route));
        if (!canActivate) {
          this.globalMessageService.add(
            {
              key: 'organization.notification.noSufficientPermissions',
            },
            GlobalMessageType.MSG_TYPE_WARNING
          );
          this.routingService.goByUrl(
            this.punchoutNavigationGuardConfig[punchoutOperation].redirectPage
          );
        }
        return canActivate;
      }),
      tap((res) => console.log('flo res', res))
    );
  }

  protected findHomePage(route: CmsActivatedRouteSnapshot): boolean {
    return route?.url?.length === 0;
  }

  protected findByUrls(
    route: CmsActivatedRouteSnapshot,
    urls?: string[]
  ): boolean {
    if (!urls) {
      return false;
    }
    const relativeUrl = `/${route.url.map((u) => u.path).join('/')}`;
    return urls.some((url) => relativeUrl.includes(url));
  }

  protected findByCxRoute(
    route: CmsActivatedRouteSnapshot,
    cxRoutes?: string[]
  ) {
    if (!cxRoutes) {
      return false;
    }
    return !!route.data['cxRoute'] && cxRoutes.includes(route.data['cxRoute']);
  }

  protected getPunchoutOperation(): Observable<PunchOutOperation | undefined> {
    let isFullState = false;
    console.log('flo0');
    return combineLatest([
      this.authService.isUserLoggedIn(),
      this.punchoutStoreService.getPunchoutState().pipe(
        filter((punchoutState) => {
          // SessionId alone is the first 'partial' state set after reading local storage.
          // Skipping as we need to wait for the server response to fill the rest of state.
          if (
            punchoutState.punchoutSessionId &&
            !punchoutState.punchoutSession?.punchOutOperation
          ) {
            console.log('flo1');
            isFullState = true;
            return false;
          }
          // ignore INITIAL_STATE coming after partial state when storage has been read
          if (
            isFullState &&
            !punchoutState.punchoutSessionId &&
            !punchoutState.punchoutSession?.punchOutOperation
          ) {
            console.log('flo2');
            isFullState = false;
            return false;
          }
          return true;
        })
      ),
    ]).pipe(
      map(([isLoggedIn, punchoutState]) => {
        console.log('isLoggedIn', isLoggedIn);
        console.log('punchoutState', punchoutState);
        return isLoggedIn && punchoutState?.punchoutSession?.punchOutOperation
          ? punchoutState.punchoutSession.punchOutOperation
          : undefined;
      })
    );
  }
}
