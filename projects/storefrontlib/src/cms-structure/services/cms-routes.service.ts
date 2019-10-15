import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { CmsRoute, PageContext, PageType } from '@spartacus/core';
import { PageLayoutComponent } from '../page/page-layout/page-layout.component';
import { CmsMappingService } from './cms-mapping.service';

/**
 * Please don't put that service in public API.
 * */
@Injectable({
  providedIn: 'root',
})
export class CmsRoutesService {
  constructor(private router: Router, private cmsMapping: CmsMappingService) {}

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
   * Will return true, when logic wont have to modify routing (so canActivate could be easily resolved to true)
   * or will return false, when routing configuration was updated and redirection to newly generated route was initiated.
   *
   * @param pageContext
   * @param currentUrl
   */
  handleCmsRoutesInGuard(
    pageContext: PageContext,
    componentTypes: string[],
    currentUrl: string,
    currentPageLabel: string
  ): boolean {
    const componentRoutes = this.cmsMapping.getRoutesForComponents(
      componentTypes
    );
    if (componentRoutes.length) {
      if (this.updateRouting(pageContext, currentPageLabel, componentRoutes)) {
        this.router.navigateByUrl(currentUrl);
        return false;
      }
    }
    return true;
  }

  private updateRouting(
    pageContext: PageContext,
    pageLabel: string,
    routes: Route[]
  ): boolean {
    if (
      pageContext.type === PageType.CONTENT_PAGE &&
      pageLabel.startsWith('/') &&
      pageLabel.length > 1
    ) {
      const newRoute: CmsRoute = {
        path: pageLabel.substr(1),
        component: PageLayoutComponent,
        children: routes,
        data: {
          cxCmsRouteContext: {
            type: pageContext.type,
            id: pageLabel,
          },
        },
      };

      this.router.resetConfig([newRoute, ...this.router.config]);
      return true;
    }

    return false;
  }
}
