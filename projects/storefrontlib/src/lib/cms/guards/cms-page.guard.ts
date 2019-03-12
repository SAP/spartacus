import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot } from '@angular/router';

import {
  RoutingService,
  CmsService,
  CmsActivatedRouteSnapshot
} from '@spartacus/core';

import { combineLatest, Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { CmsRoutesService } from '../services/cms-routes.service';

@Injectable()
export class CmsPageGuards implements CanActivate {
  static guardName = 'CmsPageGuards';

  constructor(
    private routingService: RoutingService,
    private cmsService: CmsService,
    private cmsRoutes: CmsRoutesService
  ) {}

  canActivate(
    route: CmsActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.routingService.getPageContext().pipe(
      switchMap(pageContext =>
        combineLatest(this.cmsService.hasPage(pageContext), of(pageContext))
      ),
      tap(([hasPage, pageContext]) => {
        if (!hasPage && pageContext.id !== '/notFound') {
          this.routingService.go(['notFound']);
        }
      }),
      switchMap(([hasPage, pageContext]) => {
        if (
          hasPage &&
          !route.data.cxCmsContext &&
          !this.cmsRoutes.contentRouteExist(pageContext.id)
        ) {
          return this.cmsRoutes.handleContentRoutes(pageContext, state.url);
        } else {
          return of(hasPage);
        }
      })
    );
  }
}
