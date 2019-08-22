import { Injectable, Injector, isDevMode } from '@angular/core';
import { Router, Routes, UrlMatcher } from '@angular/router';
import { UrlMatcherFactoryService } from '@spartacus/core';
import { RoutingMigrationConfig } from './routing-migration-config';
import { RoutingMigrationComponent } from './routing-migration.component';
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

  addMigrationRoutes(): void {
    const router: Router = this.injector.get(Router);
    const migrationRoutes = this.getMigrationRoutes();
    router.resetConfig([].concat(migrationRoutes, router.config));
  }

  /**
   * Returns routes that are responsible for redirection to different storefront systems
   */
  protected getMigrationRoutes(): Routes {
    if (!this.isConfigValid()) {
      return [];
    }
    const routes: Routes = [];

    if (this.containsEmpty(this.migrationConfig.paths)) {
      // the empty path '' cannot be handled by multiplePathsUrlMatcher, so needs a separate route
      routes.push({
        pathMatch: 'full',
        path: '',
        canActivate: [RoutingMigrationGuard],
        component: RoutingMigrationComponent,
      });
    }

    const paths = this.filterNonEmpty(this.migrationConfig.paths);
    if (paths.length) {
      routes.push({
        pathMatch: 'full',
        matcher: this.getUrlMatcher(paths),
        canActivate: [RoutingMigrationGuard],
        component: RoutingMigrationComponent,
      });
    }

    return routes;
  }

  /**
   * Returns the URL matcher for the migration route
   */
  protected getUrlMatcher(paths: string[]): UrlMatcher {
    let matcher = this.matcherFactory.getMultiplePathsUrlMatcher(paths);

    // When configured external paths: in case of match, perform redirect (activate guard), otherwise return null (pass on control)
    // When configured internal paths: in case of match, pass on control (return null), otherwise perform redirect (activate guard)
    matcher =
      this.migrationConfig.type === 'external'
        ? matcher
        : this.matcherFactory.getOppositeUrlMatcher(matcher);

    // for easier debugging:
    (matcher as any).paths = paths;

    return matcher;
  }

  protected isConfigValid(): boolean {
    if (
      !this.migrationConfig.type ||
      !this.migrationConfig.paths ||
      !this.migrationConfig.paths.length
    ) {
      if (isDevMode()) {
        console.warn(
          `Please specify properties 'paths' and 'type' for the config 'routing.migration'.`
        );
      }
      return false;
    }

    return true;
  }

  protected containsEmpty(array: string[]): boolean {
    return array.findIndex(path => !path) !== -1;
  }

  protected filterNonEmpty(array: string[]): string[] {
    return array.filter(path => Boolean(path));
  }
}
