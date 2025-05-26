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
  SemanticPathService,
} from '@spartacus/core';
import { catchError, map, Observable, of, switchMap, take } from 'rxjs';
import { PunchoutFacade } from '../facade';
import {
  PunchoutNavigationGuardConfig,
  PunchOutOperation,
  PunchoutSession,
  PunchoutState,
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
  protected punchoutFacade = inject(PunchoutFacade);
  protected semanticPathService = inject(SemanticPathService);

  protected readonly allowedUrlsForAll: string[] = [
    this.semanticPathService.get('punchoutSession') as string,
    this.semanticPathService.get('punchoutRequisition') as string,
  ];
  protected readonly allowedCxRoutesForEdit: string[] = [
    'category',
    'brand',
    'quickOrder',
    'product',
    'cart',
    'search',
    'punchoutError',
  ];
  protected readonly allowedUrlsForInspect: string[] = [
    this.semanticPathService.get('punchoutInspect') as string,
  ];
  protected readonly HOME_PAGE_URL = '/';

  protected readonly punchoutNavigationGuardConfig: PunchoutNavigationGuardConfig =
    {
      [PunchOutOperation.INSPECT]: {
        allowedUrls: [...this.allowedUrlsForAll, ...this.allowedUrlsForInspect],
        redirectPage: this.semanticPathService.get('punchoutInspect') as string,
      },
      [PunchOutOperation.EDIT]: {
        allowedUrls: [...this.allowedUrlsForAll, this.HOME_PAGE_URL],
        allowedCxRoutes: [...this.allowedCxRoutesForEdit],
        redirectPage: this.HOME_PAGE_URL,
      },
      [PunchOutOperation.CREATE]: {
        allowedUrls: [...this.allowedUrlsForAll, this.HOME_PAGE_URL],
        allowedCxRoutes: [...this.allowedCxRoutesForEdit],
        redirectPage: this.HOME_PAGE_URL,
      },
    };

  canActivate(
    route: CmsActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<GuardResult> {
    const cxRoute = route.data.cxRoute;
    return this.getPunchoutOperation(cxRoute).pipe(
      map((punchoutOperation: PunchOutOperation | undefined) => {
        const canActivate =
          !punchoutOperation ||
          this.isAllowedCxRoute(route, punchoutOperation) ||
          this.isAllowedUrls(route, punchoutOperation);
        if (!canActivate) {
          this.handleWarning();
          this.routingService.goByUrl(
            this.punchoutNavigationGuardConfig[punchoutOperation].redirectPage
          );
        }
        return canActivate;
      })
    );
  }

  protected isAllowedUrls(
    route: CmsActivatedRouteSnapshot,
    punchoutOperation: PunchOutOperation
  ): boolean {
    let isHomePageAllowed = false;
    const urls =
      this.punchoutNavigationGuardConfig?.[punchoutOperation]?.allowedUrls;
    if (!urls) {
      return false;
    }
    if (urls.includes(this.HOME_PAGE_URL)) {
      isHomePageAllowed = route?.url?.length === 0;
    }
    const relativeUrl = `/${route.url.map((u) => u.path).join('/')}`;
    return (
      urls
        .filter((url) => url !== this.HOME_PAGE_URL)
        .some((url) => relativeUrl.includes(url)) || isHomePageAllowed
    );
  }

  protected isAllowedCxRoute(
    route: CmsActivatedRouteSnapshot,
    punchoutOperation: PunchOutOperation
  ) {
    const cxRoutes =
      this.punchoutNavigationGuardConfig?.[punchoutOperation]?.allowedCxRoutes;
    if (!cxRoutes) {
      return false;
    }
    return !!route.data['cxRoute'] && cxRoutes.includes(route.data['cxRoute']);
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
          if (cxRoute === this.semanticPathService.get('logout')) {
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
        key: 'organization.notification.noSufficientPermissions',
      },
      GlobalMessageType.MSG_TYPE_WARNING
    );
  }
}
