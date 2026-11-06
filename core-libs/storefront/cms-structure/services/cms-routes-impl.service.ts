/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable, InjectionToken } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  DeprecatedGuard,
  GuardResult,
  Route,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import {
  CmsComponentChildRoutesConfig,
  CmsRoute,
  deepMerge,
  getLastValueSync,
  PageContext,
  PageType,
  UnifiedInjector,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { PageLayoutComponent } from '../page/page-layout/page-layout.component';
import { CmsComponentsService } from './cms-components.service';
import { CanActivate, GuardsComposer } from './guards-composer';

// This service should be exposed in public API only after the refactor planned in https://github.com/SAP/spartacus/issues/7070
@Injectable({ providedIn: 'root' })
export class CmsRoutesImplService {
  protected guardsComposer = inject(GuardsComposer);
  protected unifiedInjector = inject(UnifiedInjector);

  constructor(
    private router: Router,
    private cmsComponentsService: CmsComponentsService
  ) {}

  private cmsRouteExists(url: string): boolean {
    const isCmsDrivenRoute = url.startsWith('/');

    if (!isCmsDrivenRoute) {
      return false;
    }

    const routePath = url.substring(1);

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
      const children = this.wrapCmsGuardsRecursively(
        childRoutesConfig.children ?? []
      );

      const newRoute: CmsRoute = {
        path: pageLabel.substring(1),
        component: PageLayoutComponent,
        children: children,
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

  /**
   * Traverses recursively the given Routes and wraps each `canActivate`
   * guard of each Route with a special `CanActivateFn` function.
   *
   * This special wrapper function allows for resolving
   * those guards by the Angular Router using the `UnifiedInjector`
   * instead of only root injector.
   *
   * This allows Angular Router to inject the guards (and their dependencies)
   * even when they are provided only in a child injector of a lazy-loaded module.
   */
  private wrapCmsGuardsRecursively(routes: Route[]): Route[] {
    return routes.map((route) => {
      if (route.children) {
        route.children = this.wrapCmsGuardsRecursively(route.children);
      }

      if (route?.canActivate?.length) {
        const canActivate = route.canActivate.map((guard) =>
          this.wrapCmsGuard(guard)
        );
        return {
          ...route,
          canActivate,
        };
      }

      return route;
    });
  }

  /**
   * Returns a wrapper function `CanActivateFn` (https://angular.io/api/router/CanActivateFn)
   * that injects the given guard instance and runs its method `.canActivate()`.
   *
   * It allows to inject the guard's instance (and it's dependencies)
   * even if it's 'provided only in a child injector of a lazy-loaded module.
   */
  private wrapCmsGuard(
    guard: CanActivateFn | DeprecatedGuard
  ): (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => Observable<GuardResult> {
    return (
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): Observable<GuardResult> => {
      const classGuard = getLastValueSync(
        this.unifiedInjector.get<CanActivate>(
          guard as InjectionToken<CanActivate>
        )
      );
      const canActivate = classGuard ?? { canActivate: guard as CanActivateFn };
      return this.guardsComposer.canActivate([canActivate], route, state);
    };
  }
}
