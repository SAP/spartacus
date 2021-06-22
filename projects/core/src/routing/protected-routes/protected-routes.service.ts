import { Injectable } from '@angular/core';
import { RoutingConfig } from '../configurable-routes/config/routing-config';
import { UrlParsingService } from '../configurable-routes/url-translation/url-parsing.service';

@Injectable({ providedIn: 'root' })
export class ProtectedRoutesService {
  private nonProtectedPaths: string[][] = []; // arrays of paths' segments list

  protected get routingConfig(): RoutingConfig['routing'] {
    return this.config && this.config.routing;
  }

  /**
   * Returns 'protected' property (boolean) from routing config
   *
   * @returns boolean
   */
  public get shouldProtect(): boolean {
    return !!this.routingConfig?.protected;
  }

  constructor(
    protected config: RoutingConfig,
    protected urlParsingService: UrlParsingService
  ) {
    if (this.shouldProtect) {
      // pre-process config for performance:
      this.nonProtectedPaths = this.getNonProtectedPaths().map((path) =>
        this.getSegments(path)
      );
    }
  }

  /**
   * Tells if the url is protected
   */
  isUrlProtected(urlSegments: string[]): boolean {
    return (
      this.shouldProtect &&
      !this.matchAnyPath(urlSegments, this.nonProtectedPaths)
    );
  }

  /**
   * Tells whether the url matches at least one of the paths
   */
  protected matchAnyPath(
    urlSegments: string[],
    pathsSegments: string[][]
  ): boolean {
    return pathsSegments.some((pathSegments) =>
      this.matchPath(urlSegments, pathSegments)
    );
  }

  /**
   * Tells whether the url matches the path
   */
  protected matchPath(urlSegments: string[], pathSegments: string[]): boolean {
    return this.urlParsingService.matchPath(urlSegments, pathSegments);
  }

  /**
   * Returns a list of paths that are not protected
   */
  protected getNonProtectedPaths(): string[] {
    return Object.values(this.routingConfig?.routes ?? {}).reduce<string[]>(
      (acc, routeConfig) =>
        routeConfig.protected === false && // must be explicitly false, ignore undefined
        routeConfig.paths &&
        routeConfig.paths.length
          ? acc.concat(routeConfig?.paths ?? [])
          : acc,
      []
    );
  }

  /**
   * Splits the url by slashes
   */
  protected getSegments(url: string): string[] {
    return (url || '').split('/');
  }
}
