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

  protected get migrationConfig(): RoutingMigrationConfig['routing']['migration'] {
    return (
      (this.config && this.config.routing && this.config.routing.migration) ||
      {}
    );
  }

  /**
   * Prepends routes responsible for redirecting to a different storefront system
   */
  addMigrationRoutes(): void {
    const router: Router = this.injector.get(Router);
    const migrationRoutes = this.getMigrationRoutes();
    if (migrationRoutes.length) {
      router.resetConfig([].concat(migrationRoutes, router.config));
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
    const internalUrls = this.migrationConfig.internalUrls;
    const matcher = this.matcherFactory.getGlobUrlMatcher(internalUrls);
    return this.matcherFactory.getOppositeUrlMatcher(matcher); // the migration route should be activated only when it's NOT an internal route
  }

  protected isConfigValid(): boolean {
    //spike todo improve:
    if (
      !this.migrationConfig.internalUrls ||
      !this.migrationConfig.internalUrls.length
    ) {
      if (isDevMode()) {
        console.warn(
          `Please specify internalUrls for the config 'routing.migration'.`
        );
      }
      return false;
    }

    return true;
  }
}
