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
import { map, Observable, of, switchMap, take, tap } from 'rxjs';
import { PunchoutFacade } from '../facade';
import {
  PUNCHOUT_ERROR_PAGE_URL,
  PUNCHOUT_INSPECT_PAGE_URL,
  PUNCHOUT_REQUISITION_PAGE_URL,
  PUNCHOUT_SESSION_PAGE_URL,
  PunchoutNavigationGuardConfig,
  PunchOutOperation,
  PunchoutSession,
  PunchoutState,
} from '../model';
import {
  PunchoutStatePersistanceService,
  PunchoutStoreService,
} from '../services';

@Injectable({
  providedIn: 'root',
})
export class PunchoutNavigationGuard {
  protected router = inject(Router);
  protected punchoutStoreService = inject(PunchoutStoreService);
  protected punchoutStatePersistanceService = inject(
    PunchoutStatePersistanceService
  );
  protected authService = inject(AuthService);
  protected routingService = inject(RoutingService);
  protected globalMessageService = inject(GlobalMessageService);
  protected punchoutFacade = inject(PunchoutFacade);
  protected loadedPunchoutSessionId?: string;

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
    // let isFullState = false;
    //let localSessionId: string = '';
    console.log('flo0');
    return this.authService.isUserLoggedIn().pipe(
      take(1),
      switchMap((isLoggedIn) => {
        if (isLoggedIn) {
          return this.punchoutStoreService.getPunchoutState().pipe(take(1));
        }
        return of(undefined);
      }),
      // switchMap((sessionId: string | undefined) => {
      //   console.log('flo1', sessionId);
      //   //   localSessionId = sessionId ?? '';
      //   if (sessionId) {
      //     return this.punchoutStoreService.getPunchoutState().pipe(
      //       tap((ps) => console.log('before skip', ps))
      //       // skip(1),
      //       // tap((ps) => console.log('after skip', ps))
      //     );
      //     // .pipe(
      //     //   filter((state) => {
      //     //     if (!state?.punchoutSessionId && localSessionId) {
      //     //       return false;
      //     //     }
      //     //     return true;
      //     //   })
      //     // );
      //   }
      //   return of(undefined);
      // }),
      // filter((state) => {
      //   if (!state?.punchoutSessionId && localSessionId) {
      //     return false;
      //   }
      //   return true;
      // }),
      // map((punchoutState: PunchoutState | undefined) => {
      //   console.log('flo state', punchoutState);
      //   if (punchoutState?.punchoutSession?.punchOutOperation) {
      //     return punchoutState.punchoutSession.punchOutOperation;
      //   }
      //   return undefined;
      // })
      switchMap((punchoutState: PunchoutState | undefined) => {
        //  console.log('isLoggedIn', isLoggedIn);
        console.log('punchoutState1', punchoutState);
        if (
          punchoutState?.punchoutSessionId &&
          !punchoutState.punchoutSession?.punchOutOperation
        ) {
          console.log('IN CONDITION', punchoutState);
          return this.punchoutFacade.requestPunchoutSession(
            punchoutState.punchoutSessionId
          );
        }
        if (
          punchoutState?.punchoutSessionId &&
          punchoutState?.punchoutSession?.punchOutOperation
        ) {
          return of(punchoutState.punchoutSession);
        }
        return of(undefined);
      }),
      map((punchoutSession: PunchoutSession | undefined) => {
        console.log('IN CONDITION2', punchoutSession);
        if (punchoutSession?.punchOutOperation) {
          return punchoutSession?.punchOutOperation;
        }
        return undefined;
      })
    );
  }
}
