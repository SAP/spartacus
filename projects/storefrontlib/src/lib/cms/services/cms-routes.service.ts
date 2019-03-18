import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { CmsRoute, CmsService, PageContext, PageType } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PageLayoutComponent } from '../page-layout/page-layout.component';
import { CmsMappingService } from './cms-mapping.service';

@Injectable({
  providedIn: 'root'
})
export class CmsRoutesService {
  constructor(
    private router: Router,
    private cmsService: CmsService,
    private cmsMapping: CmsMappingService
  ) {}

  cmsRouteExist(url: string): boolean {
    const isCmsDrivenRoute = url.startsWith('/');

    if (!isCmsDrivenRoute) {
      return false;
    }

    const routePath = url.substr(1);

    return (
      isCmsDrivenRoute &&
      !!this.router.config.find(
        (route: CmsRoute) =>
          route.data && route.data.cxCmsRouteContext && route.path === routePath
      )
    );
  }

  /**
   * Contains Cms driven routing logic intended for use use in guards, especially in canActivate method.
   *
   * Observable<boolean> will emit true, when logic wont have to modify routing (so canActivate could be easily resolved to true)
   * or will emit false, when routing configuration was updated and redirection to newly generated route was initiated.
   *
   * @param pageContext
   * @param currentUrl
   */
  handleCmsRoutesInGuard(
    pageContext: PageContext,
    currentUrl: string
  ): Observable<boolean> {
    return this.cmsService.getPageState(pageContext).pipe(
      map(pageData => {
        const componentRoutes = this.cmsMapping.getRoutesFromPage(pageData);
        if (componentRoutes.length) {
          if (this.updateRouting(pageContext, componentRoutes)) {
            this.router.navigateByUrl(currentUrl);
            return false;
          }
        }
        return true;
      })
    );
  }

  private updateRouting(pageContext: PageContext, routes: Route[]): boolean {
    if (
      pageContext.type === PageType.CONTENT_PAGE &&
      pageContext.id.startsWith('/') &&
      pageContext.id.length > 1
    ) {
      const newRoute: CmsRoute = {
        path: pageContext.id.substr(1),
        component: PageLayoutComponent,
        children: routes,
        data: {
          cxCmsRouteContext: pageContext
        }
      };

      this.router.resetConfig([newRoute, ...this.router.config]);
      return true;
    }

    return false;
  }
}
