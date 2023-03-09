/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import {
  CmsComponentChildRoutesConfig,
  CmsRoute,
  deepMerge,
  PageContext,
  PageType,
} from '@spartacus/core';
import { PageLayoutComponent } from '../page/page-layout/page-layout.component';
import { CmsComponentsService } from './cms-components.service';
import { resolveCmsGuard } from './cms-guards.service';

// This service should be exposed in public API only after the refactor planned in https://github.com/SAP/spartacus/issues/7070
@Injectable({ providedIn: 'root' })
export class CmsRoutesImplService {
  constructor(
    private router: Router,
    private cmsComponentsService: CmsComponentsService
  ) {}

  private cmsRouteExists(url: string): boolean {
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
    if (this.cmsRouteExists(currentPageLabel)) {
      return true;
    }

    const childRoutesConfig =
      this.cmsComponentsService.getChildRoutes(componentTypes);

    if (childRoutesConfig?.children?.length) {
      if (
        this.updateRouting(pageContext, currentPageLabel, childRoutesConfig)
      ) {
        this.router.navigateByUrl(currentUrl);
        return false;
      }
    }
    return true;
  }

  /**
   * Wraps guards of each Route with the `resolveCmsGuard()` function.
   *
   * It allows for resolving those guards by the Angular Router,
   * even if those guards are not provided in the root injector,
   * but provided in a child injector of a lazy-loaded module.
   */
  private resolveCmsGuards(routes: Route[]): Route[] {
    return routes.map((route) => {
      if (route.children) {
        route.children = this.resolveCmsGuards(route.children);
      }

      if (route?.canActivate?.length) {
        route.canActivate = route.canActivate.map((guard) =>
          resolveCmsGuard(guard)
        );
      }

      return route;
    });
  }

  private updateRouting(
    pageContext: PageContext,
    pageLabel: string,
    childRoutesConfig: CmsComponentChildRoutesConfig
  ): boolean {
    if (
      pageContext.type === PageType.CONTENT_PAGE &&
      pageLabel.startsWith('/') &&
      pageLabel.length > 1
    ) {
      const children = this.resolveCmsGuards(childRoutesConfig.children);

      const newRoute: CmsRoute = {
        path: pageLabel.substr(1),
        component: PageLayoutComponent,
        children,
        data: deepMerge({}, childRoutesConfig?.parent?.data ?? {}, {
          cxCmsRouteContext: {
            type: pageContext.type,
            id: pageLabel,
          },
        }),
      };

      this.router.resetConfig([newRoute, ...this.router.config]);
      return true;
    }

    return false;
  }
}
