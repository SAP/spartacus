/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { GigyaRaasComponentData } from '@spartacus/cdc/core';
import {
  AuthGuard,
  CmsService,
  NotAuthGuard,
  PageContext,
  RoutingService,
  isNotUndefined,
} from '@spartacus/core';
import { Observable, catchError, filter, of, switchMap, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GigyaRaasGuard implements CanActivate {
  protected routingService = inject(RoutingService);
  protected cmsService = inject(CmsService);
  protected authGuard = inject(AuthGuard);
  protected notAuthGuard = inject(NotAuthGuard);

  canActivate(): Observable<boolean | UrlTree> {
    return this.getComponentData().pipe(
      switchMap((componentData) => {
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
      }),
      catchError(() => of(false))
    );
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

  private getComponentData(): Observable<GigyaRaasComponentData> {
    return this.routingService.getNextPageContext().pipe(
      filter(isNotUndefined),
      take(1),
      switchMap((pageContext) =>
        this.getComponentsByType(pageContext, 'GigyaRaasComponent')
      ),
      switchMap((components) => {
        if (components.length === 1 && components[0]) {
          return this.cmsService.getComponentData<GigyaRaasComponentData>(
            components[0]
          );
        }
        return of({} as GigyaRaasComponentData);
      })
    );
  }
}
