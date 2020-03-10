import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import {
  CmsActivatedRouteSnapshot,
  CmsService,
  Page,
  PageContext,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { map, switchMap, take, tap, withLatestFrom } from 'rxjs/operators';
import { CmsGuardsService } from '../services/cms-guards.service';
import { CmsI18nService } from '../services/cms-i18n.service';
import { CmsRoutesService } from '../services/cms-routes.service';

/**
 * Logic for guarding given angular route an cms page
 */
@Injectable({
  providedIn: 'root',
})
export class CmsPageGuardService implements CanActivate {
  constructor(
    private cmsService: CmsService,
    private cmsRoutes: CmsRoutesService,
    private cmsI18n: CmsI18nService,
    private cmsGuards: CmsGuardsService
  ) {}

  /**
   * Takes CMS components types on current CMS page, triggers side effects and returns a boolean - whether the route can be activated.
   * Based on cms mapping config for CMS components:
   * - evaluates their guards; if one of them returns false or UrlTree - it's returned by this method
   * - loads i18n chunks
   * - registers children routes
   *
   * @param pageContext current cms page context
   * @param pageData cms page data
   * @param route activated route snapshot
   * @param state router state snapshot
   *
   * @returns boolean observable - whether the route can be activated
   */
  handlePage(
    pageContext: PageContext,
    pageData: Page,
    route: CmsActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.cmsService.getPageComponentTypes(pageContext).pipe(
      take(1),
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
}
