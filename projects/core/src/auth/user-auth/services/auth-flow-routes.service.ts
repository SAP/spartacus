import { Injectable } from '@angular/core';
import { RoutingConfig } from '../../../routing/configurable-routes/config/routing-config';
import { UrlParsingService } from '../../../routing/configurable-routes/url-translation/url-parsing.service';

@Injectable({ providedIn: 'root' })
export class AuthFlowRoutesService {
  constructor(
    protected config: RoutingConfig,
    protected urlParsingService: UrlParsingService
  ) {}

  protected _authFlowPaths: string[];

  /**
   * List of paths that are part user auth flow
   */
  protected get authFlowPaths(): string[] {
    if (!this._authFlowPaths) {
      // extract from the routing config the paths that are part of the user auth flow
      this._authFlowPaths = Object.values(
        this.config?.routing?.routes || {}
      ).reduce(
        (acc, routeConfig) =>
          routeConfig.authFlow === true && routeConfig.paths?.length
            ? acc.concat(routeConfig?.paths)
            : acc,
        [] as string[]
      );
    }
    return this._authFlowPaths;
  }

  /**
   * Tells whether the given URL is a part of the user auth flow
   */
  isAuthFlow(url: string) {
    return this.authFlowPaths.some((path) =>
      this.urlParsingService.matchPath(url, path)
    );
  }
}
