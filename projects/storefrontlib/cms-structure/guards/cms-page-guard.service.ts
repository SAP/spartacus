import { Injectable } from '@angular/core';
import { RouterStateSnapshot, UrlTree } from '@angular/router';
import {
  CmsActivatedRouteSnapshot,
  CmsService,
  Page,
  PageContext,
  PageType,
  SemanticPathService,
  RoutingService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import {
  filter,
  map,
  switchMap,
  take,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { CmsComponentsService } from '../services/cms-components.service';
import { CmsGuardsService } from '../services/cms-guards.service';
import { CmsI18nService } from '../services/cms-i18n.service';
import { CmsRoutesService } from '../services/cms-routes.service';

/**
 * Helper service for `CmsPageGuard`
 */
@Injectable({
  providedIn: 'root',
})
export class CmsPageGuardService {
  constructor(
    protected semanticPathService: SemanticPathService,
    protected cmsService: CmsService,
    protected cmsRoutes: CmsRoutesService,
    protected cmsI18n: CmsI18nService,
    protected cmsGuards: CmsGuardsService,
    protected cmsComponentsService: CmsComponentsService,
    protected routing: RoutingService
  ) {}

  /**
   * Takes CMS components types in the current CMS page, triggers (configurable) side effects and returns a boolean - whether the route can be activated.
   *
   * Based on `cmsComponents` config for the components in the page:
   * - Evaluates components' guards; if one of them emits false or UrlTree - the route cannot be activated or redirects to the given UrlTree, respectively.
   * - If all components' guards emitted true, then the route can be activated
   * - Then we trigger loading of configured i18n chunks in parallel
   * - And we register the configured children routes of cms components
   *
   * @param pageContext current cms page context
   * @param pageData cms page data
   * @param route activated route snapshot
   * @param state router state snapshot
   *
   * @returns boolean observable - whether the route can be activated
   */
  canActivatePage(
    pageContext: PageContext,
    pageData: Page,
    route: CmsActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.cmsService.getPageComponentTypes(pageContext).pipe(
      take(1),
      switchMap((componentTypes) =>
        this.cmsComponentsService.determineMappings(componentTypes)
      ),
      switchMap((componentTypes) =>
        this.cmsGuards
          .cmsPageCanActivate(componentTypes, route, state)
          .pipe(withLatestFrom(of(componentTypes)))
      ),
      tap(([canActivate, componentTypes]) => {
        if (canActivate === true) {
          this.cmsI18n.loadForComponents(componentTypes);
        }
      }),
      map(([canActivate, componentTypes]) => {
        const pageLabel = pageData.label || pageContext.id; // for content pages the page label returned from backend can be different than ID initially assumed from route
        if (canActivate === true && !route?.data?.cxCmsRouteContext) {
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

  /**
   * Activates the "NOT FOUND" cms page.
   *
   * It loads cms page data for the "NOT FOUND" page and puts it in the state of the the requested page label.
   * Then it processes its CMS components with the method `canActivatePage()` of this service. For more, see its docs.
   */
  canActivateNotFoundPage(
    pageContext: PageContext,
    route: CmsActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    const notFoundCmsPageContext: PageContext = {
      type: PageType.CONTENT_PAGE,
      id: this.semanticPathService.get('notFound'),
    };

    return this.cmsService.getPage(notFoundCmsPageContext).pipe(
      switchMap((notFoundPage) => {
        if (notFoundPage) {
          return this.cmsService.getPageIndex(notFoundCmsPageContext).pipe(
            tap((notFoundIndex) => {
              this.cmsService.setPageFailIndex(pageContext, notFoundIndex);
              this.routing.changeNextPageContext(notFoundCmsPageContext);
            }),
            switchMap((notFoundIndex) =>
              this.cmsService.getPageIndex(pageContext).pipe(
                // we have to wait for page index update
                filter((index) => index === notFoundIndex)
              )
            ),
            switchMap(() =>
              this.canActivatePage(pageContext, notFoundPage, route, state)
            )
          );
        }
        return of(false);
      })
    );
  }
}
