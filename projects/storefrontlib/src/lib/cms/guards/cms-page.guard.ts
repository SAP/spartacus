import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot } from '@angular/router';

import {
  RoutingService,
  CmsService,
  CmsActivatedRouteSnapshot
} from '@spartacus/core';

import { combineLatest, Observable, of } from 'rxjs';
import { switchMap, tap, map } from 'rxjs/operators';
import { CmsRoutesService } from '../services/cms-routes.service';
import { CmsI18nService } from '../services/cms-i18n.service';

@Injectable()
export class CmsPageGuard implements CanActivate {
  static guardName = 'CmsPageGuard';

  constructor(
    private routingService: RoutingService,
    private cmsService: CmsService,
    private cmsRoutes: CmsRoutesService,
    private cmsI18n: CmsI18nService
  ) {}

  canActivate(
    route: CmsActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.routingService.getPageContext().pipe(
      switchMap(pageContext =>
        combineLatest(this.cmsService.hasPage(pageContext), of(pageContext))
      ),
      switchMap(([hasPage, pageContext]) => {
        if (hasPage) {
          return this.cmsService.getPageComponentTypes(pageContext).pipe(
            tap(componentTypes =>
              this.cmsI18n.loadNamespacesForComponents(componentTypes)
            ),
            map(componentTypes => {
              if (
                !route.data.cxCmsRouteContext &&
                !this.cmsRoutes.cmsRouteExist(pageContext.id)
              ) {
                return this.cmsRoutes.handleCmsRoutesInGuard(
                  pageContext,
                  componentTypes,
                  state.url
                );
              }
              return true;
            })
          );
        } else {
          if (pageContext.id !== '/notFound') {
            this.routingService.go(['notFound']);
          }
          return of(false);
        }
      })
    );
  }
}
