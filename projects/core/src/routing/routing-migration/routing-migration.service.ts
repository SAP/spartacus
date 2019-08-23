import { Injectable, Injector, isDevMode } from '@angular/core';
import { Routes, UrlMatcher } from '@angular/router';
import { UrlMatcherFactoryService } from '../services/url-matcher-factory.service';
import {
  RoutingMigrationConfig,
  RoutingMigrationConfigType,
} from './routing-migration-config';
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
   * Returns routes that are responsible for redirection to different storefront systems
   */
  getMigrationRoutes(): Routes {
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
        component: {} as any,
      });
    }

    const paths = this.filterNonEmpty(this.migrationConfig.paths);
    if (paths.length) {
      routes.push({
        pathMatch: 'full',
        matcher: this.getUrlMatcher(paths),
        canActivate: [RoutingMigrationGuard],
        component: {} as any,
      });
    }

    return routes;
  }

  /**
   * Returns the URL matcher for the migration route
   */
  protected getUrlMatcher(paths: string[]): UrlMatcher {
    let matcher = this.matcherFactory.getMultiplePathsUrlMatcher(paths);

    // When configured EXTERNAL paths and URL matches one of them, we activate the redirect route
    // When configured INTERNAL paths and URL matches one of them, we pass on control (return null), otherwise we activate the redirect route
    matcher =
      this.migrationConfig.type === RoutingMigrationConfigType.EXTERNAL
        ? matcher
        : this.matcherFactory.getOppositeUrlMatcher(matcher);

    (matcher as any).paths = paths; // property added for easier debugging of routes

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
