/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { GuardResult, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService, CmsActivatedRouteSnapshot } from '@spartacus/core';
import { combineLatest, map, Observable, tap } from 'rxjs';
import {
  PUNCHOUT_ERROR_PAGE_URL,
  PUNCHOUT_INSPECT_PAGE_URL,
  PUNCHOUT_REQUISITION_PAGE_URL,
  PUNCHOUT_SESSION_PAGE_URL,
  PunchoutNavigationGuardConfig,
  PunchOutOperation,
} from '../root/model';
import { PunchoutStoreService } from '../root/services';

@Injectable({
  providedIn: 'root',
})
export class PunchoutNavigationGuard {
  protected router = inject(Router);
  protected punchoutStoreService = inject(PunchoutStoreService);
  protected authService = inject(AuthService);

  protected readonly allowedUrlsForAll: string[] = [
    PUNCHOUT_SESSION_PAGE_URL,
    PUNCHOUT_REQUISITION_PAGE_URL,
    PUNCHOUT_ERROR_PAGE_URL,
  ];
  protected readonly allowCxRoutesForEdit: string[] = [
    'category',
    'quickOrder',
    'product',
    'cart',
  ];
  protected readonly allowedUrlsForInspect: string[] = [
    PUNCHOUT_INSPECT_PAGE_URL,
  ];

  protected readonly punchoutNavigationGuardConfig: PunchoutNavigationGuardConfig =
    {
      [PunchOutOperation.INSPECT]: {
        urls: [...this.allowedUrlsForAll, ...this.allowedUrlsForInspect],
      },
      [PunchOutOperation.EDIT]: {
        urls: [...this.allowedUrlsForAll, ...this.allowCxRoutesForEdit],
        cxRoutes: [...this.allowCxRoutesForEdit],
        homePage: true,
      },
      [PunchOutOperation.CREATE]: {
        urls: [...this.allowedUrlsForAll, ...this.allowCxRoutesForEdit],
        cxRoutes: [...this.allowCxRoutesForEdit],
        homePage: true,
      },
    };

  canActivate(
    route: CmsActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<GuardResult> {
    console.log('flo route', route);
    return this.isPunchoutSessionActive().pipe(
      map((punchoutOperation: PunchOutOperation | undefined) => {
        console.log('punchoutOperation', punchoutOperation);
        return (
          !punchoutOperation ||
          this.findByCxRoute(
            route,
            this.punchoutNavigationGuardConfig[punchoutOperation].cxRoutes
          ) ||
          this.findByUrls(
            route,
            this.punchoutNavigationGuardConfig[punchoutOperation].urls
          ) ||
          (!!this.punchoutNavigationGuardConfig[punchoutOperation]?.homePage &&
            this.isHomePage(route))
        );
      }),
      tap((res) => console.log('flo res', res))
    );
  }

  protected isHomePage(route: CmsActivatedRouteSnapshot): boolean {
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

  protected isPunchoutSessionActive(): Observable<
    PunchOutOperation | undefined
  > {
    return combineLatest([
      this.authService.isUserLoggedIn(),
      this.punchoutStoreService.getPunchoutState(),
    ]).pipe(
      map(([isLoggedIn, punchoutState]) => {
        return isLoggedIn && punchoutState?.punchoutSession?.punchOutOperation
          ? punchoutState.punchoutSession.punchOutOperation
          : undefined;
      })
    );
  }
}
