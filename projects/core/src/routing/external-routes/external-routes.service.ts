import { Injectable, Injector } from '@angular/core';
import { Router, Routes, UrlMatcher } from '@angular/router';
import { UrlMatcherFactoryService } from '../services/url-matcher-factory.service';
import { ExternalRoutesConfig } from './external-routes-config';
import { ExternalRoutesGuard } from './external-routes.guard';

/**
 * Service that helps redirecting to different storefront systems for configured URLs
 */
@Injectable()
export class ExternalRoutesService {
  constructor(
    protected config: ExternalRoutesConfig,
    protected matcherFactory: UrlMatcherFactoryService,
    protected injector: Injector
  ) {}

  protected get internalUrlPatterns(): ExternalRoutesConfig['routing']['internal'] {
    return (
      (this.config && this.config.routing && this.config.routing.internal) || []
    );
  }

  /**
   * Prepends routes (to the Router.config) that are responsible for redirecting to a different storefront system
   */
  addRoutes(): void {
    const router: Router = this.injector.get(Router);
    const newRoutes = this.getRoutes();
    if (newRoutes.length) {
      router.resetConfig([...newRoutes, ...router.config]);
    }
  }

  /**
   * Returns routes that are responsible for redirection to different storefront systems
   */
  protected getRoutes(): Routes {
    if (!this.internalUrlPatterns.length) {
      return [];
    }
    const routes: Routes = [];

    routes.push({
      pathMatch: 'full',
      matcher: this.getUrlMatcher(),
      canActivate: [ExternalRoutesGuard],
      component: {} as any,
    });

    return routes;
  }

  /**
   * Returns the URL matcher for the external route
   */
  protected getUrlMatcher(): UrlMatcher {
    const matcher = this.matcherFactory.getGlobUrlMatcher(
      this.internalUrlPatterns
    );
    return this.matcherFactory.getOppositeUrlMatcher(matcher); // the external route should be activated only when it's NOT an internal route
  }
}
