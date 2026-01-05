/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { CanActivate, GuardResult } from '@angular/router';
import { GigyaRaasComponentData } from '@spartacus/cdc/core';
import {
  AuthGuard,
  CmsService,
  NotAuthGuard,
  PageContext,
  RoutingService,
  isNotUndefined,
} from '@spartacus/core';
import {
  Observable,
  catchError,
  combineLatest,
  filter,
  map,
  of,
  switchMap,
  take,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GigyaRaasGuard implements CanActivate {
  protected routingService = inject(RoutingService);
  protected cmsService = inject(CmsService);
  protected authGuard = inject(AuthGuard);
  protected notAuthGuard = inject(NotAuthGuard);

  canActivate(): Observable<GuardResult> {
    return this.getComponentData().pipe(
      switchMap((componentData) => {
        if (!componentData.length) {
          return of(false);
        }
        // Run guard checks for each component
        const guardResults$ = componentData.map((data) =>
          this.checksToProcess(data)
        );

        // Allow activation only if all checks pass, else return first non-true value
        return combineLatest(guardResults$).pipe(
          map((results) => {
            const firstNonTrue = results.find(
              (result: GuardResult) => result !== true
            );
            return firstNonTrue ?? true;
          })
        );
      }),
      catchError(() => of(false))
    );
  }

  private checksToProcess(
    componentData: GigyaRaasComponentData
  ): Observable<GuardResult> {
    if (Object.keys(componentData).length === 0) {
      return of(false);
    }

    if (componentData.showAnonymous === 'false') {
      return this.authGuard.canActivate();
    }

    if (componentData.showLoggedIn === 'false') {
      return this.notAuthGuard.canActivate();
    }
    return of(true);
  }

  private getComponentsByType(
    pageContext: PageContext,
    componentType: string
  ): Observable<(string | undefined)[]> {
    return this.cmsService.getPage(pageContext).pipe(
      switchMap((page): Observable<(string | undefined)[]> => {
        if (!page) {
          return of([]);
        }
        const componentUids = Object.values(page.slots || {})
          .flatMap((slot) => slot.components)
          .filter((component) => component?.typeCode === componentType)
          .map((component) => component?.uid);
        return of(componentUids);
      }),
      catchError(() => of([]))
    );
  }

  private getComponentData(): Observable<GigyaRaasComponentData[]> {
    return this.routingService.getNextPageContext().pipe(
      filter(isNotUndefined),
      take(1),
      switchMap((pageContext) =>
        this.getComponentsByType(pageContext, 'GigyaRaasComponent')
      ),
      switchMap((componentUids) => {
        if (!componentUids.length) {
          return of([]);
        }

        const componentData$ = componentUids
          .filter((uid): uid is string => Boolean(uid))
          .map((uid) =>
            this.cmsService
              .getComponentData<GigyaRaasComponentData>(uid)
              .pipe(catchError(() => of({} as GigyaRaasComponentData)))
          );

        return combineLatest(componentData$);
      })
    );
  }
}
