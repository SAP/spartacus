import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';

import {
  CmsActivatedRouteSnapshot,
  CmsService,
  RoutingService,
} from '@spartacus/core';

import { Observable, of } from 'rxjs';
import { first, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import { CmsGuardsService } from '../services/cms-guards.service';
import { CmsI18nService } from '../services/cms-i18n.service';
import { CmsRoutesService } from '../services/cms-routes.service';

@Injectable()
export class CmsPageGuard implements CanActivate {
  static guardName = 'CmsPageGuard';

  constructor(
    private routingService: RoutingService,
    private cmsService: CmsService,
    private cmsRoutes: CmsRoutesService,
    private cmsI18n: CmsI18nService,
    private cmsGuards: CmsGuardsService
  ) {}

  canActivate(
    route: CmsActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.routingService.getPageContext().pipe(
      switchMap(pageContext =>
        this.cmsService.hasPage(pageContext).pipe(
          first(),
          withLatestFrom(of(pageContext))
        )
      ),
      switchMap(([hasPage, pageContext]) => {
        if (hasPage) {
          return this.cmsService.getPageComponentTypes(pageContext).pipe(
            switchMap(componentTypes =>
              this.cmsGuards
                .cmsPageCanActivate(componentTypes, route, state)
                .pipe(withLatestFrom(of(componentTypes)))
            ),
            tap(([canActivate, componentTypes]) => {
              if (canActivate === true) {
                this.cmsI18n.loadNamespacesForComponents(componentTypes);
              }
            }),
            map(([canActivate, componentTypes]) => {
              if (
                canActivate === true &&
                !route.data.cxCmsRouteContext &&
                !this.cmsRoutes.cmsRouteExist(pageContext.id)
              ) {
                return this.cmsRoutes.handleCmsRoutesInGuard(
                  pageContext,
                  componentTypes,
                  state.url
                );
              }
              return canActivate;
            })
          );
        } else {
          if (pageContext.id !== '/not-found') {
            this.routingService.go(['/not-found']);
          }
          return of(false);
        }
      })
    );
  }
}
