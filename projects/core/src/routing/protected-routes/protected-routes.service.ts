import { Injectable } from '@angular/core';
import { RoutingConfig } from '../configurable-routes/config/routing-config';

@Injectable({ providedIn: 'root' })
export class ProtectedRoutesService {
  private nonProtectedPaths: string[][] = []; // arrays of paths' segments list

  protected get routingConfig(): RoutingConfig['routing'] {
    return this.config && this.config.routing;
  }

  protected get shouldProtect(): boolean {
    return this.routingConfig.protected;
  }

  constructor(protected config: RoutingConfig) {
    if (this.shouldProtect) {
      // pre-process config for performance:
      this.nonProtectedPaths = this.getNonProtectedPaths().map(path =>
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
    return pathsSegments.some(pathSegments =>
      this.matchPath(urlSegments, pathSegments)
    );
  }

  /**
   * Tells whether the url matches the path
   */
  protected matchPath(urlSegments: string[], pathSegments: string[]): boolean {
    if (urlSegments.length !== pathSegments.length) {
      return false;
    }

    for (let i = 0; i < pathSegments.length; i++) {
      const pathSeg = pathSegments[i];
      const urlSeg = urlSegments[i];

      // compare only static segments:
      if (!pathSeg.startsWith(':') && pathSeg !== urlSeg) {
        return false;
      }
    }
    return true;
  }

  /**
   * Returns a list of paths that are not protected
   */
  protected getNonProtectedPaths(): string[] {
    return Object.values(this.routingConfig.routes).reduce(
      (acc, routeConfig) =>
        routeConfig.protected === false && // must be explicitly false, ignore undefined
        routeConfig.paths &&
        routeConfig.paths.length
          ? acc.concat(routeConfig.paths)
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
