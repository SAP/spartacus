import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import {
  CmsActivatedRouteSnapshot,
  CmsService,
  PageContext,
  PageType,
  ProtectedRoutesGuard,
  RoutingService,
  SemanticPathService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { filter, first, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { CmsPageGuardService } from './cms-page-guard.service';

@Injectable({
  providedIn: 'root',
})
export class CmsPageGuard implements CanActivate {
  static guardName = 'CmsPageGuard';

  constructor(
    protected routingService: RoutingService,
    protected cmsService: CmsService,
    protected semanticPathService: SemanticPathService,
    protected protectedRoutesGuard: ProtectedRoutesGuard,
    protected service: CmsPageGuardService
  ) {}

  canActivate(
    route: CmsActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.protectedRoutesGuard
      .canActivate(route)
      .pipe(
        switchMap(result =>
          result ? this.getCmsPage(route, state) : of(result)
        )
      );
  }

  protected getCmsPage(
    route: CmsActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.routingService.getNextPageContext().pipe(
      switchMap(pageContext =>
        this.cmsService
          .getPage(pageContext, true)
          .pipe(first(), withLatestFrom(of(pageContext)))
      ),
      switchMap(([pageData, pageContext]) =>
        pageData
          ? this.service.handlePage(pageContext, pageData, route, state)
          : this.handleNotFoundPage(pageContext, route, state)
      )
    );
  }

  protected handleNotFoundPage(
    pageContext: PageContext,
    route: CmsActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    const notFoundCmsPageContext: PageContext = {
      type: PageType.CONTENT_PAGE,
      id: this.semanticPathService.get('notFound'),
    };
    return this.cmsService.getPage(notFoundCmsPageContext).pipe(
      switchMap(notFoundPage => {
        if (notFoundPage) {
          return this.cmsService.getPageIndex(notFoundCmsPageContext).pipe(
            tap(notFoundIndex => {
              this.cmsService.setPageFailIndex(pageContext, notFoundIndex);
            }),
            switchMap(notFoundIndex =>
              this.cmsService.getPageIndex(pageContext).pipe(
                // we have to wait for page index update
                filter(index => index === notFoundIndex)
              )
            ),
            switchMap(() =>
              this.service.handlePage(pageContext, notFoundPage, route, state)
            )
          );
        }
        return of(false);
      })
    );
  }
}
