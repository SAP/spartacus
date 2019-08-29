import { Injectable, Injector, isDevMode } from '@angular/core';
import { Router, Routes, UrlMatcher } from '@angular/router';
import { UrlMatcherFactoryService } from '../services/url-matcher-factory.service';
import { RoutingMigrationConfig } from './routing-migration-config';
import { RoutingMigrationGuard } from './routing-migration.guard';

/**
 * Service that helps redirecting to different storefront systems for specific paths
 */
@Injectable()
export class RoutingMigrationService {
  constructor(
    protected config: RoutingMigrationConfig,
    protected matcherFactory: UrlMatcherFactoryService,
    protected injector: Injector
  ) {}

  protected get internalUrlPatterns(): RoutingMigrationConfig['routing']['internal'] {
    return (
      (this.config && this.config.routing && this.config.routing.internal) || []
    );
  }

  /**
   * Prepends routes responsible for redirecting to a different storefront system
   */
  addMigrationRoutes(): void {
    const router: Router = this.injector.get(Router);
    const migrationRoutes = this.getMigrationRoutes();
    if (migrationRoutes.length) {
      router.resetConfig([...migrationRoutes, ...router.config]);
    }
  }

  /**
   * Returns routes that are responsible for redirection to different storefront systems
   */
  protected getMigrationRoutes(): Routes {
    if (!this.isConfigValid()) {
      return [];
    }
    const routes: Routes = [];

    routes.push({
      pathMatch: 'full',
      matcher: this.getUrlMatcher(),
      canActivate: [RoutingMigrationGuard],
      component: {} as any,
    });

    return routes;
  }

  /**
   * Returns the URL matcher for the migration route
   */
  protected getUrlMatcher(): UrlMatcher {
    const matcher = this.matcherFactory.getGlobUrlMatcher(
      this.internalUrlPatterns
    );
    return this.matcherFactory.getOppositeUrlMatcher(matcher); // the migration route should be activated only when it's NOT an internal route
  }

  protected isConfigValid(): boolean {
    //spike todo improve:
    if (!this.internalUrlPatterns.length) {
      if (isDevMode()) {
        console.warn(
          `Please specify the list of glob-like patterns for internal urls config: 'routing.internal'`
        );
      }
      return false;
    }

    return true;
  }
}
