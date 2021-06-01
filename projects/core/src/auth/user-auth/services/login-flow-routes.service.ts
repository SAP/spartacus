import { Injectable } from '@angular/core';
import { RoutingConfig } from '../../../routing/configurable-routes/config/routing-config';
import { UrlParsingService } from '../../../routing/configurable-routes/url-translation/url-parsing.service';

/**
 * Responsible for saving last accessed page (or attempted) before login and for redirecting to that page after login.
 */
@Injectable({
  providedIn: 'root',
})
export class LoginFlowRoutesService {
  constructor(
    protected config: RoutingConfig,
    protected urlParsingService: UrlParsingService
  ) {}

  protected _loginFlowPaths: string[];

  /**
   * List of paths that are part user journey when logging in.
   */
  protected get loginFlowPaths(): string[] {
    return (
      this._loginFlowPaths ??
      (this._loginFlowPaths = Object.values(
        this.config?.routing?.routes || {}
      ).reduce(
        (acc, routeConfig) =>
          routeConfig.loginFlow === true && routeConfig.paths?.length
            ? acc.concat(routeConfig?.paths)
            : acc,
        [] as string[]
      ))
    );
  }

  isLoginFlow(url: string) {
    return this.loginFlowPaths.some((path) =>
      this.urlParsingService.matchPath(url, path)
    );
  }
}
