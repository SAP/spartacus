import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import {
  CmsActivatedRouteSnapshot,
  CmsService,
  Page,
  PageContext,
  PageType,
  RoutingService,
  SemanticPathService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import {
  filter,
  first,
  map,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { CmsGuardsService } from '../services/cms-guards.service';
import { CmsI18nService } from '../services/cms-i18n.service';
import { CmsRoutesService } from '../services/cms-routes.service';

@Injectable({
  providedIn: 'root',
})
export class CmsPageGuard implements CanActivate {
  static guardName = 'CmsPageGuard';

  constructor(
    private routingService: RoutingService,
    private cmsService: CmsService,
    private cmsRoutes: CmsRoutesService,
    private cmsI18n: CmsI18nService,
    private cmsGuards: CmsGuardsService,
    private semanticPathService: SemanticPathService
  ) {}

  canActivate(
    route: CmsActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.routingService.getNextPageContext().pipe(
      switchMap(pageContext =>
        this.cmsService.getPage(pageContext, true).pipe(
          first(),
          withLatestFrom(of(pageContext))
        )
      ),
      switchMap(([pageData, pageContext]) =>
        pageData
          ? this.resolveCmsPageLogic(pageContext, pageData, route, state)
          : this.handleNotFoundPage(pageContext, route, state)
      )
    );
  }

  private resolveCmsPageLogic(
    pageContext: PageContext,
    pageData: Page,
    route: CmsActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.cmsService.getPageComponentTypes(pageContext).pipe(
      switchMap(componentTypes =>
        this.cmsGuards
          .cmsPageCanActivate(componentTypes, route, state)
          .pipe(withLatestFrom(of(componentTypes)))
      ),
      tap(([canActivate, componentTypes]) => {
        if (canActivate === true) {
          this.cmsI18n.loadChunksForComponents(componentTypes);
        }
      }),
      map(([canActivate, componentTypes]) => {
        const pageLabel = pageData.label || pageContext.id; // for content pages the page label returned from backend can be different than ID initially assumed from route
        if (
          canActivate === true &&
          !route.data.cxCmsRouteContext &&
          !this.cmsRoutes.cmsRouteExist(pageLabel)
        ) {
          return this.cmsRoutes.handleCmsRoutesInGuard(
            pageContext,
            componentTypes,
            state.url,
            pageLabel
          );
        }
        return canActivate;
      })
    );
  }

  private handleNotFoundPage(
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
              this.resolveCmsPageLogic(pageContext, notFoundPage, route, state)
            )
          );
        }
        return of(false);
      })
    );
  }
}
