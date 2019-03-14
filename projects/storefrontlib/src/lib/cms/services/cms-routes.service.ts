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

  contentRouteExist(url: string): boolean {
    const isCmsDrivenRoute = url.startsWith('/');

    if (!isCmsDrivenRoute) {
      return false;
    }

    const routePath = url.substr(1);

    return (
      isCmsDrivenRoute &&
      !!this.router.config.find(
        (route: CmsRoute) =>
          route.data && route.data.cxCmsContext && route.path === routePath
      )
    );
  }

  handleContentRoutes(
    pageContext: PageContext,
    currentUrl: string
  ): Observable<boolean> {
    return this.cmsService.getPageState(pageContext).pipe(
      map(pageData => {
        const componentRoutes = this.cmsMapping.getRoutesFromPageData(pageData);
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
          cxCmsContext: pageContext
        }
      };

      this.router.resetConfig([newRoute, ...this.router.config]);
      return true;
    }

    return false;
  }
}
