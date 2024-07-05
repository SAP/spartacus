/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { GigyaRaasComponentData } from '@spartacus/cdc/core';
import {
  AuthRedirectService,
  AuthService,
  CmsService,
  PageContext,
  RoutingService,
  SemanticPathService,
  isNotUndefined,
} from '@spartacus/core';
import { Observable, catchError, filter, map, of, switchMap, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GigyaRaasGuard {
  protected routingService = inject(RoutingService);
  protected cmsService = inject(CmsService);
  protected authService = inject(AuthService);
  protected authRedirectService = inject(AuthRedirectService);
  protected router = inject(Router);
  protected semanticPathService = inject(SemanticPathService);

  canActivate(): Observable<boolean | UrlTree> {
    return this.routingService.getNextPageContext().pipe(
      filter(isNotUndefined),
      take(1),
      switchMap((pageContext) =>
        this.getComponentsByType(pageContext, 'GigyaRaasComponent')
      ),
      switchMap((components) => this.getComponentData(components)),
      switchMap((componentData) => this.redirectionCheck(componentData)),
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
        const componentUids = Object.values(page.slots)
          .flatMap((slot) => slot.components)
          .filter((component) => component?.typeCode === componentType)
          .map((component) => component?.uid);
        return of(componentUids);
      }),
      catchError(() => of([]))
    );
  }

  private getComponentData(
    components: (string | undefined)[]
  ): Observable<GigyaRaasComponentData> {
    if (components.length === 1 && components[0]) {
      return this.cmsService.getComponentData<GigyaRaasComponentData>(
        components[0]
      );
    }
    return of({} as GigyaRaasComponentData);
  }

  private redirectionCheck(
    data: GigyaRaasComponentData
  ): Observable<boolean | UrlTree> {
    if (Object.keys(data).length === 0) {
      return of(false);
    }
    return this.authService.isUserLoggedIn().pipe(
      map((isLoggedIn) => {
        if (
          !isLoggedIn &&
          data.showAnonymous === 'false' &&
          data.profileEdit === 'false'
        ) {
          this.authRedirectService.saveCurrentNavigationUrl();
          return this.router.parseUrl(
            this.semanticPathService.get('login') ?? ''
          );
        }
        if (
          isLoggedIn &&
          data.showLoggedIn === 'false' &&
          data.profileEdit === 'false'
        ) {
          return this.router.parseUrl(
            this.semanticPathService.get('home') ?? ''
          );
        }
        return true;
      })
    );
  }
}
